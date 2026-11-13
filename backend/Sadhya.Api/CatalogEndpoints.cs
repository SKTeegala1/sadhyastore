using System.Text.Json;
using Microsoft.EntityFrameworkCore;

public static class CatalogEndpoints
{
    public static void MapCatalog(this RouteGroupBuilder api, RouteGroupBuilder admin, JsonSerializerOptions json)
    {
        api.MapGet("/categories", async (StoreDb db) => await db.Categories.AsNoTracking().OrderBy(c => c.SortOrder).ThenBy(c => c.Id).ToListAsync());
        admin.MapPost("/categories", async (CategoryInput input, StoreDb db) => {
            if (!ValidCategory(input)) return Results.BadRequest(new { message = "Enter a category name, image, and valid display order." });
            if (await db.Categories.AnyAsync(c => c.Name.ToLower() == input.Name.Trim().ToLower())) return Results.Conflict(new { message = "A category with this name already exists." });
            var category = new StoreCategory { Id = Math.Max(111, await db.Categories.Select(c => (int?)c.Id).MaxAsync() ?? 111) + 1, Name = input.Name.Trim(), Image = input.Image, SortOrder = input.SortOrder };
            db.Categories.Add(category); await db.SaveChangesAsync(); return Results.Ok(category);
        });
        admin.MapPut("/categories/{id:int}", async (int id, CategoryInput input, StoreDb db) => {
            if (!ValidCategory(input)) return Results.BadRequest(new { message = "Enter a category name, image, and valid display order." });
            var category = await db.Categories.FindAsync(id);
            if (category is null) return Results.NotFound();
            if (await db.Categories.AnyAsync(c => c.Id != id && c.Name.ToLower() == input.Name.Trim().ToLower())) return Results.Conflict(new { message = "A category with this name already exists." });
            category.Name = input.Name.Trim(); category.Image = input.Image; category.SortOrder = input.SortOrder;
            await db.SaveChangesAsync(); return Results.Ok(category);
        });
        admin.MapDelete("/categories/{id:int}", async (int id, int? reassignTo, StoreDb db) => {
            await using var transaction = await db.Database.BeginTransactionAsync(System.Data.IsolationLevel.Serializable);
            var category = await db.Categories.FindAsync(id);
            if (category is null) return Results.NotFound();
            if (reassignTo == id || (reassignTo.HasValue && !await db.Categories.AnyAsync(c => c.Id == reassignTo))) return Results.BadRequest(new { message = "Choose a different existing category for the products." });
            var rows = await db.Products.ToListAsync();
            foreach (var row in rows) {
                var p = JsonSerializer.Deserialize<StoreProduct>(row.Json, json)!;
                if (p.CategoryId != id) continue;
                if (!reassignTo.HasValue) return Results.Conflict(new { message = "Move this category’s products to another category before removing it." });
                row.Json = JsonSerializer.Serialize(p with { CategoryId = reassignTo.Value }, json);
            }
            db.Categories.Remove(category); await db.SaveChangesAsync(); await transaction.CommitAsync(); return Results.NoContent();
        });
        admin.MapPost("/media", async (HttpRequest request, StoreDb db) => {
            const int maxBytes = 5 * 1024 * 1024;
            if (!request.HasFormContentType || request.ContentLength > maxBytes + 65536) return Results.BadRequest(new { message = "Upload a JPEG, PNG or WebP image up to 5 MB." });
            var form = await request.ReadFormAsync();
            var file = form.Files.GetFile("file");
            if (file is null || file.Length < 12 || file.Length > maxBytes) return Results.BadRequest(new { message = "Upload a JPEG, PNG or WebP image up to 5 MB." });
            using var buffer = new MemoryStream(); await file.CopyToAsync(buffer);
            var data = buffer.ToArray();
            var type = data.AsSpan().StartsWith(new byte[] { 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a }) ? "image/png"
                : data[0] == 0xff && data[1] == 0xd8 && data[2] == 0xff ? "image/jpeg"
                : data.AsSpan(0, 4).SequenceEqual("RIFF"u8) && data.AsSpan(8, 4).SequenceEqual("WEBP"u8) ? "image/webp" : null;
            if (type is null) return Results.BadRequest(new { message = "The file is not a supported JPEG, PNG or WebP image." });
            var media = new MediaRow { Content = data, ContentType = type };
            db.Media.Add(media); await db.SaveChangesAsync(); return Results.Ok(new { url = $"/api/media/{media.Id}" });
        });
        api.MapGet("/media/{id:guid}", async (Guid id, StoreDb db, HttpResponse response) => {
            var media = await db.Media.AsNoTracking().SingleOrDefaultAsync(m => m.Id == id);
            if (media is null) return Results.NotFound();
            response.Headers["X-Content-Type-Options"] = "nosniff";
            return Results.File(media.Content, media.ContentType);
        });
    }
    private static bool ValidCategory(CategoryInput input) => !string.IsNullOrWhiteSpace(input.Name) && input.Name.Trim().Length <= 80 && ImageValid(input.Image) && input.SortOrder >= 0 && input.SortOrder <= 10000;
    public static bool ImageValid(string? image) => !string.IsNullOrWhiteSpace(image) && ((image.StartsWith("/") && !image.StartsWith("//") && !image.Contains('\\')) || (Uri.TryCreate(image, UriKind.Absolute, out var uri) && uri.Scheme == "https"));
}
