using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public sealed class Customer : IdentityUser { public string FullName { get; set; } = ""; }
public sealed class StoreDb(DbContextOptions<StoreDb> options) : IdentityDbContext<Customer>(options)
{
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<OrderRow>().Property(o => o.UserId).HasMaxLength(450);
        builder.Entity<OrderRow>().Property(o => o.Total).HasPrecision(18, 2);
        builder.Entity<OrderRow>().HasIndex(o => new { o.UserId, o.RequestKey }).IsUnique();
    }
    public DbSet<ProductRow> Products => Set<ProductRow>();
    public DbSet<AddressRow> Addresses => Set<AddressRow>();
    public DbSet<OrderRow> Orders => Set<OrderRow>();
}
public sealed class ProductRow
{
    [Key] public string Id { get; set; } = "";
    public string Json { get; set; } = "";
    public int StockQuantity { get; set; }
    public bool IsActive { get; set; }
}
public sealed class AddressRow
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string UserId { get; set; } = "";
    public string Json { get; set; } = "";
}
public sealed class OrderRow
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string UserId { get; set; } = "";
    public string CustomerEmail { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string Status { get; set; } = "Pending";
    public decimal Total { get; set; }
    public string AddressJson { get; set; } = "";
    public string ItemsJson { get; set; } = "";
    [MaxLength(80)] public string RequestKey { get; set; } = "";
}
public record RegisterRequest(string FullName, string Email, string Password);
public record LoginRequest(string Email, string Password);
public record Variant(string Weight, decimal Price);
public record NutritionItem(string Name, decimal Value, string Unit);
public record Nutrition(string ServingSize, List<NutritionItem> Items);
public record StoreProduct(string Id, string Name, int CategoryId, string Image, List<string>? Images,
    string Tagline, decimal Price, string Weight, List<Variant>? Variants, string Description,
    List<string> Benefits, Nutrition Nutrition, List<string> Storage, List<string> Delivery,
    decimal Rating, int Reviews, string? Badge, int StockQuantity = 100, bool IsActive = true);
public record AddressInput(string FullName, string Phone, string Line1, string Line2, string City, string State, string PostalCode);
public record OrderItemInput(string ProductId, string Weight, int Quantity);
public record OrderInput(Guid AddressId, List<OrderItemInput> Items, string RequestKey);
public record OrderLine(string ProductId, string Name, string Image, string Weight, int Quantity, decimal UnitPrice);
public record OrderStatusInput(string Status);
