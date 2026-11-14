using System.Text.Json;
using Microsoft.EntityFrameworkCore;
public record StoreSlide(string Id, string Image, string? MobileImage, string Alt, bool IsActive);
public static class SlideEndpoints
{
    public static void MapSlides(this RouteGroupBuilder api, RouteGroupBuilder admin, JsonSerializerOptions json)
    {
        api.MapGet("/slides", async (StoreDb db) => {
            var setting = await db.StoreSettings.AsNoTracking().SingleOrDefaultAsync(s => s.Key == "homepage-slides");
            var slides = setting is null ? new List<StoreSlide>() : JsonSerializer.Deserialize<List<StoreSlide>>(setting.Value, json)!;
            return Results.Ok(new { configured = setting is not null, slides = slides.Where(s => s.IsActive) });
        });
        admin.MapGet("/slides", async (StoreDb db) => {
            var setting = await db.StoreSettings.AsNoTracking().SingleOrDefaultAsync(s => s.Key == "homepage-slides");
            return Results.Ok(new { configured = setting is not null, slides = setting is null ? new List<StoreSlide>() : JsonSerializer.Deserialize<List<StoreSlide>>(setting.Value, json)! });
        });
        admin.MapPut("/slides", async (List<StoreSlide> slides, StoreDb db) => {
            if (slides.Count > 30 || slides.Select(s => s.Id).Distinct().Count() != slides.Count || slides.Any(s => !Guid.TryParse(s.Id, out _) || !CatalogEndpoints.ImageValid(s.Image) || (!string.IsNullOrWhiteSpace(s.MobileImage) && !CatalogEndpoints.ImageValid(s.MobileImage)) || string.IsNullOrWhiteSpace(s.Alt) || s.Alt.Length > 200)) return Results.BadRequest(new { message = "Add a valid image and description to every slide. Up to 30 slides are supported." });
            var setting = await db.StoreSettings.FindAsync("homepage-slides");
            if (setting is null) { setting = new StoreSetting { Key = "homepage-slides" }; db.StoreSettings.Add(setting); }
            setting.Value = JsonSerializer.Serialize(slides, json); await db.SaveChangesAsync();
            return Results.Ok(new { configured = true, slides });
        });
    }
}
