using System.Security.Claims;
using System.Text.Json;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);
builder.ConfigureStoreDeployment();
builder.WebHost.ConfigureKestrel(o => o.Limits.MaxRequestBodySize = 6 * 1024 * 1024);
builder.Services.AddDbContext<StoreDb>(o => {
    var connection = builder.Configuration.GetConnectionString("Store");
    if (builder.Configuration["DatabaseProvider"] == "SqlServer") o.UseSqlServer(connection);
    else o.UseSqlite(connection);
});
builder.Services.AddIdentity<Customer, IdentityRole>(o => {
    o.User.RequireUniqueEmail = true;
    o.Password.RequiredLength = 10;
    o.Lockout.MaxFailedAccessAttempts = 5;
}).AddEntityFrameworkStores<StoreDb>().AddDefaultTokenProviders();
builder.Services.ConfigureApplicationCookie(o => {
    o.Cookie.Name = "sadhya.session";
    o.Cookie.HttpOnly = true;
    o.Cookie.SameSite = SameSiteMode.Strict;
    o.Cookie.SecurePolicy = builder.Environment.IsDevelopment() ? CookieSecurePolicy.SameAsRequest : CookieSecurePolicy.Always;
    o.ExpireTimeSpan = TimeSpan.FromHours(8);
    o.SlidingExpiration = true;
    o.Events.OnRedirectToLogin = c => { c.Response.StatusCode = 401; return Task.CompletedTask; };
    o.Events.OnRedirectToAccessDenied = c => { c.Response.StatusCode = 403; return Task.CompletedTask; };
});
builder.Services.AddAuthorization(o => o.AddPolicy("Admin", p => p.RequireRole("Admin")));
builder.Services.AddAntiforgery(o => {
    o.HeaderName = "X-CSRF-TOKEN";
    o.Cookie.SecurePolicy = builder.Environment.IsDevelopment() ? CookieSecurePolicy.SameAsRequest : CookieSecurePolicy.Always;
    o.Cookie.SameSite = SameSiteMode.Strict;
});
builder.Services.AddRateLimiter(o => {
    o.RejectionStatusCode = 429;
    o.AddPolicy("auth", context => RateLimitPartition.GetFixedWindowLimiter(
        context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
        _ => new FixedWindowRateLimiterOptions { PermitLimit = 15, Window = TimeSpan.FromMinutes(1), QueueLimit = 0 }));
});
var app = builder.Build();
var json = new JsonSerializerOptions(JsonSerializerDefaults.Web);
using (var scope = app.Services.CreateScope()) {
    var db = scope.ServiceProvider.GetRequiredService<StoreDb>();
    // Create a new schema, then apply the versioned additive catalog upgrade to existing stores.
    await db.Database.EnsureCreatedAsync();
    await CatalogUpgrade.Run(db, json);
    await OrderNotesUpgrade.Run(db);
    await PhoneAccounts.Upgrade(db);
    var email = builder.Configuration["BootstrapAdmin:Email"];
    var password = builder.Configuration["BootstrapAdmin:Password"];
    if (!string.IsNullOrWhiteSpace(email) && !string.IsNullOrWhiteSpace(password)) {
        var roles = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        if (!await roles.RoleExistsAsync("Admin")) await roles.CreateAsync(new IdentityRole("Admin"));
        var users = scope.ServiceProvider.GetRequiredService<UserManager<Customer>>();
        var admin = await users.FindByEmailAsync(email);
        if (admin is null) {
            admin = new Customer { UserName = email, Email = email, FullName = "Store administrator" };
            var result = await users.CreateAsync(admin, password);
            if (!result.Succeeded) throw new InvalidOperationException("Admin setup failed: " + string.Join("; ", result.Errors.Select(e => e.Description)));
        }
        await users.AddToRoleAsync(admin, "Admin");
    }
}
app.UseExceptionHandler(handler => handler.Run(async context => {
    context.Response.StatusCode = 500;
    await context.Response.WriteAsJsonAsync(new { message = "The request could not be completed. Please try again." });
}));
app.UseStoreGateway();
app.UseAuthentication();
app.UseAuthorization();
app.UseRateLimiter();
app.Use(async (context, next) => {
    if (context.Request.Path.StartsWithSegments("/api") && !HttpMethods.IsGet(context.Request.Method) && !HttpMethods.IsHead(context.Request.Method)) {
        try { await context.RequestServices.GetRequiredService<IAntiforgery>().ValidateRequestAsync(context); }
        catch (AntiforgeryValidationException) { context.Response.StatusCode = 400; await context.Response.WriteAsJsonAsync(new { message = "Session verification failed. Refresh and try again." }); return; }
    }
    await next();
});
var api = app.MapGroup("/api");
api.MapGet("/health", () => Results.Ok(new { status = "ok" }));
api.MapGet("/auth/csrf", (HttpContext ctx, IAntiforgery anti) => {
    ctx.Response.Headers.CacheControl = "no-store";
    return Results.Ok(new { token = anti.GetAndStoreTokens(ctx).RequestToken });
});
api.MapPost("/auth/register", async (RegisterRequest input, UserManager<Customer> users, StoreDb db) => {
    if (string.IsNullOrWhiteSpace(input.FullName) || input.FullName.Length > 100 || !new System.ComponentModel.DataAnnotations.EmailAddressAttribute().IsValid(input.Email)) return Results.BadRequest(new { message = "Enter a name and valid email address." });
    var phone = PhoneAccounts.Normalize(input.PhoneNumber);
    if (phone is null) return Results.BadRequest(new { message = "Enter a valid 10-digit Indian mobile number." });
    await using var transaction = await db.Database.BeginTransactionAsync(System.Data.IsolationLevel.Serializable);
    if (await db.LoginPhones.AnyAsync(p => p.PhoneNumber == phone)) return Results.Conflict(new { message = "This mobile number is already registered." });
    var user = new Customer { UserName = input.Email.Trim(), Email = input.Email.Trim(), FullName = input.FullName.Trim(), PhoneNumber = phone };
    var result = await users.CreateAsync(user, input.Password);
    if (!result.Succeeded) return Results.BadRequest(new { message = string.Join(" ", result.Errors.Select(e => e.Description)) });
    db.LoginPhones.Add(new LoginPhone { PhoneNumber = phone, UserId = user.Id });
    try { await db.SaveChangesAsync(); await transaction.CommitAsync(); }
    catch (DbUpdateException) { return Results.Conflict(new { message = "This mobile number is already registered." }); }
    return Results.Ok(new { message = "Account created. Please log in." });
}).RequireRateLimiting("auth");
api.MapPost("/auth/login", async (LoginRequest input, UserManager<Customer> users, SignInManager<Customer> signin, StoreDb db) => {
    var identifier = (input.Identifier ?? input.Email ?? "").Trim();
    Customer? user = null;
    if (identifier.Contains('@')) user = await users.FindByEmailAsync(identifier);
    else {
        var phone = PhoneAccounts.Normalize(identifier);
        if (phone is not null) {
            var loginPhone = await db.LoginPhones.AsNoTracking().SingleOrDefaultAsync(p => p.PhoneNumber == phone);
            if (loginPhone is not null) user = await users.FindByIdAsync(loginPhone.UserId);
        }
    }
    if (user is null) return Results.Json(new { message = "Invalid email/mobile number or password." }, statusCode: 401);
    var result = await signin.PasswordSignInAsync(user, input.Password, false, true);
    return result.Succeeded ? Results.Ok(new { message = "Logged in." }) : Results.Json(new { message = "Unable to log in. Check your credentials or try again later." }, statusCode: 401);
}).RequireRateLimiting("auth");
api.MapPost("/auth/phone", async (PhoneInput input, ClaimsPrincipal principal, UserManager<Customer> users, SignInManager<Customer> signin, StoreDb db) => {
    var user = await users.GetUserAsync(principal);
    if (user is null) return Results.Unauthorized();
    if (!await users.CheckPasswordAsync(user, input.Password)) return Results.BadRequest(new { message = "Enter your current account password." });
    var phone = PhoneAccounts.Normalize(input.PhoneNumber);
    if (phone is null) return Results.BadRequest(new { message = "Enter a valid Indian mobile number." });
    await using var transaction = await db.Database.BeginTransactionAsync(System.Data.IsolationLevel.Serializable);
    var existing = await db.LoginPhones.FindAsync(phone);
    if (existing is not null && existing.UserId != user.Id) return Results.Conflict(new { message = "This mobile number is already registered." });
    await db.LoginPhones.Where(p => p.UserId == user.Id && p.PhoneNumber != phone).ExecuteDeleteAsync();
    if (existing is null) db.LoginPhones.Add(new LoginPhone { PhoneNumber = phone, UserId = user.Id });
    user.PhoneNumber = phone; user.PhoneNumberConfirmed = false;
    var result = await users.UpdateAsync(user);
    if (!result.Succeeded) return Results.BadRequest(new { message = "Could not update the mobile number." });
    try { await db.SaveChangesAsync(); await transaction.CommitAsync(); }
    catch (DbUpdateException) { return Results.Conflict(new { message = "This mobile number is already registered." }); }
    await signin.RefreshSignInAsync(user); return Results.Ok(new { message = "Mobile number saved." });
}).RequireAuthorization().RequireRateLimiting("auth");
api.MapGoogleAccounts(builder.Configuration);
api.MapGet("/auth/me", async (ClaimsPrincipal principal, UserManager<Customer> users) => {
    var user = await users.GetUserAsync(principal);
    return user is null ? Results.Unauthorized() : Results.Ok(new { user.Id, user.Email, user.FullName, user.PhoneNumber, hasPassword = await users.HasPasswordAsync(user), googleLinked = (await users.GetLoginsAsync(user)).Any(l => l.LoginProvider == "Google"), isAdmin = await users.IsInRoleAsync(user, "Admin") });
}).RequireAuthorization();
api.MapPost("/auth/logout", async (SignInManager<Customer> signin) => { await signin.SignOutAsync(); return Results.NoContent(); }).RequireAuthorization();
api.MapGet("/products", async (StoreDb db) => (await db.Products.AsNoTracking().Where(p => p.IsActive).ToListAsync()).Select(p => JsonSerializer.Deserialize<StoreProduct>(p.Json, json)));
var adminApi = api.MapGroup("/admin").RequireAuthorization("Admin");
api.MapCatalog(adminApi, json);
api.MapSlides(adminApi, json);
adminApi.MapGet("/products", async (StoreDb db) => (await db.Products.AsNoTracking().ToListAsync()).Select(p => JsonSerializer.Deserialize<StoreProduct>(p.Json, json)));
adminApi.MapPut("/products/{id}", async (string id, StoreProduct product, StoreDb db) => {
    var error = ValidateProduct(product);
    if (id != product.Id || error is not null) return Results.BadRequest(new { message = error ?? "Product ID does not match." });
    if (!await db.Categories.AnyAsync(c => c.Id == product.CategoryId)) return Results.BadRequest(new { message = "Choose an existing category." });
    var row = await db.Products.FindAsync(id);
    if (row is null) { row = new ProductRow { Id = id }; db.Products.Add(row); }
    row.Json = JsonSerializer.Serialize(product, json); row.IsActive = product.IsActive; row.StockQuantity = product.StockQuantity;
    await db.SaveChangesAsync(); return Results.Ok(product);
});
adminApi.MapPost("/products/import", async (List<StoreProduct> products, StoreDb db) => {
    if (await db.Products.AnyAsync()) return Results.Conflict(new { message = "Import is only allowed into an empty catalog." });
    if (products.Count == 0 || products.Count > 500 || products.Select(p => p.Id).Distinct().Count() != products.Count || products.Any(p => ValidateProduct(p) is not null)) return Results.BadRequest(new { message = "The catalog contains invalid products." });
    var categoryIds = await db.Categories.Select(c => c.Id).ToListAsync();
    if (products.Any(p => !categoryIds.Contains(p.CategoryId))) return Results.BadRequest(new { message = "One or more product categories no longer exist. Add the categories before importing." });
    db.Products.AddRange(products.Select(p => new ProductRow { Id = p.Id, Json = JsonSerializer.Serialize(p, json), StockQuantity = p.StockQuantity, IsActive = p.IsActive }));
    await db.SaveChangesAsync(); return Results.Ok(new { imported = products.Count });
});
api.MapGet("/addresses", async (ClaimsPrincipal user, StoreDb db) => {
    var id = user.FindFirstValue(ClaimTypes.NameIdentifier)!;
    return (await db.Addresses.AsNoTracking().Where(a => a.UserId == id).ToListAsync()).Select(a => new { a.Id, details = JsonSerializer.Deserialize<AddressInput>(a.Json, json) });
}).RequireAuthorization();
api.MapPost("/addresses", async (AddressInput input, ClaimsPrincipal user, StoreDb db) => {
    if (string.IsNullOrWhiteSpace(input.FullName) || input.FullName.Length > 100 || !Regex.IsMatch(input.Phone ?? "", @"^[6-9]\d{9}$") || string.IsNullOrWhiteSpace(input.Line1) || input.Line1.Length > 200 || (input.Line2?.Length ?? 0) > 200 || string.IsNullOrWhiteSpace(input.City) || input.City.Length > 100 || string.IsNullOrWhiteSpace(input.State) || input.State.Length > 100 || !Regex.IsMatch(input.PostalCode ?? "", @"^[1-9]\d{5}$")) return Results.BadRequest(new { message = "Enter a complete Indian delivery address, 10-digit mobile number and 6-digit PIN code." });
    if (input.Latitude.HasValue != input.Longitude.HasValue || (input.Latitude.HasValue && (!double.IsFinite(input.Latitude.Value) || input.Latitude < -90 || input.Latitude > 90 || !double.IsFinite(input.Longitude!.Value) || input.Longitude < -180 || input.Longitude > 180))) return Results.BadRequest(new { message = "Choose a valid delivery location." });
    var row = new AddressRow { UserId = user.FindFirstValue(ClaimTypes.NameIdentifier)!, Json = JsonSerializer.Serialize(input, json) };
    db.Addresses.Add(row); await db.SaveChangesAsync(); return Results.Ok(new { row.Id, details = input });
}).RequireAuthorization();
api.MapDelete("/addresses/{id:guid}", async (Guid id, ClaimsPrincipal user, StoreDb db) => {
    var row = await db.Addresses.SingleOrDefaultAsync(a => a.Id == id && a.UserId == user.FindFirstValue(ClaimTypes.NameIdentifier));
    if (row is null) return Results.NotFound(); db.Addresses.Remove(row); await db.SaveChangesAsync(); return Results.NoContent();
}).RequireAuthorization();
api.MapPost("/orders", async (OrderInput input, ClaimsPrincipal user, StoreDb db) => {
    var uid = user.FindFirstValue(ClaimTypes.NameIdentifier)!;
    if (!Guid.TryParse(input.RequestKey, out _) || input.Items is null || input.Items.Count is < 1 or > 100 || input.Items.Any(i => i.Quantity is < 1 or > 100)) return Results.BadRequest(new { message = "Invalid order." });
    if ((input.AdditionalDetails?.Length ?? 0) > 1000) return Results.BadRequest(new { message = "Additional order details must be 1000 characters or fewer." });
    // Serializable transaction + conditional stock update prevents concurrent overselling.
    await using var tx = await db.Database.BeginTransactionAsync(System.Data.IsolationLevel.Serializable);
    var previous = await db.Orders.SingleOrDefaultAsync(o => o.UserId == uid && o.RequestKey == input.RequestKey);
    if (previous is not null) return Results.Ok(OrderView(previous));
    var address = await db.Addresses.SingleOrDefaultAsync(a => a.Id == input.AddressId && a.UserId == uid);
    if (address is null) return Results.BadRequest(new { message = "Choose one of your saved addresses." });
    var lines = new List<OrderLine>();
    foreach (var group in input.Items.GroupBy(i => i.ProductId)) {
        var row = await db.Products.AsNoTracking().SingleOrDefaultAsync(p => p.Id == group.Key && p.IsActive);
        if (row is null) return Results.BadRequest(new { message = "A product is no longer available." });
        var p = JsonSerializer.Deserialize<StoreProduct>(row.Json, json)!;
        var quantity = group.Sum(i => i.Quantity);
        if (quantity > row.StockQuantity) return Results.Conflict(new { message = $"Not enough stock for {p.Name}." });
        foreach (var item in group) {
            decimal? price = p.Variants is { Count: > 0 } ? p.Variants.FirstOrDefault(v => v.Weight == item.Weight)?.Price : p.Weight == item.Weight ? p.Price : null;
            if (price is null) return Results.BadRequest(new { message = "A selected pack size is no longer available." });
            lines.Add(new(p.Id, p.Name, p.Image, item.Weight, item.Quantity, price.Value));
        }
        var updated = p with { StockQuantity = row.StockQuantity - quantity };
        var payload = JsonSerializer.Serialize(updated, json);
        var changed = await db.Products.Where(x => x.Id == row.Id && x.StockQuantity >= quantity).ExecuteUpdateAsync(s => s.SetProperty(x => x.StockQuantity, x => x.StockQuantity - quantity).SetProperty(x => x.Json, payload));
        if (changed != 1) return Results.Conflict(new { message = "Stock changed. Please retry." });
    }
    var order = new OrderRow { AdditionalDetails = input.AdditionalDetails?.Trim(), UserId = uid, CustomerEmail = user.Identity?.Name ?? "", AddressJson = address.Json, ItemsJson = JsonSerializer.Serialize(lines, json), Total = lines.Sum(l => l.UnitPrice * l.Quantity), RequestKey = input.RequestKey };
    db.Orders.Add(order); await db.SaveChangesAsync(); await tx.CommitAsync(); return Results.Ok(OrderView(order));
}).RequireAuthorization();
api.MapGet("/orders", async (ClaimsPrincipal user, StoreDb db) => (await db.Orders.AsNoTracking().Where(o => o.UserId == user.FindFirstValue(ClaimTypes.NameIdentifier)).OrderByDescending(o => o.CreatedAt).ToListAsync()).Select(OrderView)).RequireAuthorization();
adminApi.MapGet("/orders", async (StoreDb db) => (await db.Orders.AsNoTracking().OrderByDescending(o => o.CreatedAt).Take(500).ToListAsync()).Select(OrderView));
adminApi.MapPut("/orders/{id:guid}/status", async (Guid id, OrderStatusInput input, StoreDb db) => {
    var row = await db.Orders.FindAsync(id);
    if (row is null) return Results.NotFound();
    var next = row.Status switch { "Pending" => "Confirmed", "Confirmed" => "Shipped", "Shipped" => "Delivered", _ => "" };
    if (input.Status != next) return Results.BadRequest(new { message = "Invalid order status transition." });
    row.Status = next; await db.SaveChangesAsync(); return Results.Ok(OrderView(row));
});
app.Run();

object OrderView(OrderRow o) => new { o.Id, o.CustomerEmail, o.CreatedAt, o.Status, o.Total, o.AdditionalDetails, paymentMethod = "Cash on delivery", address = JsonSerializer.Deserialize<AddressInput>(o.AddressJson, json), items = JsonSerializer.Deserialize<List<OrderLine>>(o.ItemsJson, json) };
static string? ValidateProduct(StoreProduct p) {
    if (!Regex.IsMatch(p.Id ?? "", @"^[a-z0-9][a-z0-9-]{0,79}$") || string.IsNullOrWhiteSpace(p.Name) || p.Name.Length > 150 || p.CategoryId < 1 || p.Price <= 0 || p.Price > 100000 || p.StockQuantity < 0 || p.StockQuantity > 1000000 || string.IsNullOrWhiteSpace(p.Weight) || string.IsNullOrWhiteSpace(p.Description) || p.Benefits is null || p.Storage is null || p.Delivery is null || p.Nutrition is null || p.Nutrition.Items is null || p.Rating < 0 || p.Rating > 5 || p.Reviews < 0) return "Complete all product fields with valid prices and stock.";
    bool ImageValid(string image) => CatalogEndpoints.ImageValid(image);
    if (!ImageValid(p.Image) || (p.Images?.Any(i => !ImageValid(i)) ?? false)) return "Use a relative image path or HTTPS image URL.";
    if (p.Variants is { Count: > 0 } && (p.Variants.Any(v => string.IsNullOrWhiteSpace(v.Weight) || v.Price <= 0 || v.Price > 100000) || p.Variants.Select(v => v.Weight).Distinct().Count() != p.Variants.Count || !p.Variants.Any(v => v.Weight == p.Weight && v.Price == p.Price))) return "Pack sizes must be unique and include the default weight and price.";
    return null;
}
