using System.Text.Json;
using Microsoft.EntityFrameworkCore;

// Additive, versioned upgrade for databases created by the first ecommerce release.
// Existing customer/address/order tables and JSON payloads are preserved.
public static class CatalogUpgrade
{
    public static async Task Run(StoreDb db, JsonSerializerOptions json)
    {
        if (db.Database.IsSqlite()) {
            await db.Database.ExecuteSqlRawAsync("CREATE TABLE IF NOT EXISTS Categories (Id INTEGER NOT NULL PRIMARY KEY, Name TEXT NOT NULL, Image TEXT NOT NULL, SortOrder INTEGER NOT NULL)");
            await db.Database.ExecuteSqlRawAsync("CREATE TABLE IF NOT EXISTS StoreSettings (Key TEXT NOT NULL PRIMARY KEY, Value TEXT NOT NULL)");
            await db.Database.ExecuteSqlRawAsync("CREATE TABLE IF NOT EXISTS Media (Id TEXT NOT NULL PRIMARY KEY, ContentType TEXT NOT NULL, Content BLOB NOT NULL)");
        } else {
            await db.Database.ExecuteSqlRawAsync("IF OBJECT_ID(N'Categories', N'U') IS NULL CREATE TABLE Categories (Id int NOT NULL PRIMARY KEY, Name nvarchar(80) NOT NULL, Image nvarchar(max) NOT NULL, SortOrder int NOT NULL)");
            await db.Database.ExecuteSqlRawAsync("IF OBJECT_ID(N'StoreSettings', N'U') IS NULL CREATE TABLE StoreSettings ([Key] nvarchar(80) NOT NULL PRIMARY KEY, Value nvarchar(max) NOT NULL)");
            await db.Database.ExecuteSqlRawAsync("IF OBJECT_ID(N'Media', N'U') IS NULL CREATE TABLE Media (Id uniqueidentifier NOT NULL PRIMARY KEY, ContentType nvarchar(max) NOT NULL, Content varbinary(max) NOT NULL)");
        }
        await using var transaction = await db.Database.BeginTransactionAsync(System.Data.IsolationLevel.Serializable);
        if (await db.StoreSettings.AnyAsync(s => s.Key == "catalog-v2")) return;
        var names = new[] { "Offer Zone", "Dry Fruits", "Nuts", "Spices", "Healthy Snacks", "Dates", "Seeds", "Berries", "Rice & Millets", "Herbal Powders", "Oils" };
        for (int i = 0; i < names.Length; i++)
            db.Categories.Add(new StoreCategory { Id = 101 + i, Name = names[i], Image = $"/collections/{101 + i}.svg", SortOrder = i });
        foreach (var row in await db.Products.ToListAsync()) {
            var product = JsonSerializer.Deserialize<StoreProduct>(row.Json, json)!;
            row.Json = JsonSerializer.Serialize(product with { CategoryId = Remap(product.CategoryId, product.Name), IsOffer = product.IsOffer || product.CategoryId is 12 or 13 }, json);
        }
        db.StoreSettings.Add(new StoreSetting { Key = "catalog-v2", Value = "complete" });
        await db.SaveChangesAsync(); await transaction.CommitAsync();
    }
    public static int Remap(int oldId, string name) => oldId switch {
        1 or 2 or 3 or 5 => 103, 4 or 7 => 102, 6 => 106, 8 => 107, 9 => 105,
        10 => name.Contains("berr", StringComparison.OrdinalIgnoreCase) ? 108 : 102,
        11 => 104, 12 or 13 => 101, _ => oldId
    };
}
