using SkiaSharp;

public static class MediaFiles
{
    public static string Root(IConfiguration config) => Path.GetFullPath(config["Media:Directory"] ?? (Environment.GetEnvironmentVariable("RENDER") == "true" ? "/var/data/media" : "App_Data/media"));
    // Limit parallel image decoding on the small production instance.
    public static readonly SemaphoreSlim Gate = new(1, 1);
    public static async Task<byte[]> Encode(byte[] input, int width)
    {
        using var data = SKData.CreateCopy(input);
        using var codec = SKCodec.Create(data);
        if (codec is null || codec.Info.Width <= 0 || codec.Info.Height <= 0 || (long)codec.Info.Width * codec.Info.Height > 16_000_000)
            throw new InvalidDataException("Choose a valid image smaller than 16 megapixels.");
        using var bitmap = SKBitmap.Decode(input) ?? throw new InvalidDataException("The image could not be decoded.");
        var rotated = (int)codec.EncodedOrigin >= 5;
        var sourceWidth = rotated ? bitmap.Height : bitmap.Width;
        var sourceHeight = rotated ? bitmap.Width : bitmap.Height;
        var scale = Math.Min(1d, (double)width / Math.Max(sourceWidth, sourceHeight));
        using var outputBitmap = new SKBitmap(Math.Max(1, (int)(sourceWidth * scale)), Math.Max(1, (int)(sourceHeight * scale)));
        using (var canvas = new SKCanvas(outputBitmap)) {
            canvas.Clear(SKColors.Transparent);
            canvas.Scale((float)scale);
            switch ((int)codec.EncodedOrigin) {
                case 2: canvas.Translate(bitmap.Width, 0); canvas.Scale(-1, 1); break;
                case 3: canvas.Translate(bitmap.Width, bitmap.Height); canvas.RotateDegrees(180); break;
                case 4: canvas.Translate(0, bitmap.Height); canvas.Scale(1, -1); break;
                case 5: canvas.RotateDegrees(90); canvas.Scale(1, -1); break;
                case 6: canvas.Translate(bitmap.Height, 0); canvas.RotateDegrees(90); break;
                case 7: canvas.Translate(bitmap.Height, bitmap.Width); canvas.Scale(-1, -1); canvas.RotateDegrees(90); canvas.Scale(1, -1); break;
                case 8: canvas.Translate(0, bitmap.Width); canvas.RotateDegrees(270); break;
            }
            using var sourceImage = SKImage.FromBitmap(bitmap);
            canvas.DrawImage(sourceImage, 0, 0, new SKSamplingOptions(SKFilterMode.Linear, SKMipmapMode.Linear));
        }
        using var image = SKImage.FromBitmap(outputBitmap);
        using var encoded = image.Encode(SKEncodedImageFormat.Webp, 80);
        return await Task.FromResult(encoded.ToArray());
    }

    public static async Task Write(string path, byte[] bytes)
    {
        Directory.CreateDirectory(Path.GetDirectoryName(path)!);
        var temporary = path + "." + Guid.NewGuid().ToString("N") + ".tmp";
        try { await File.WriteAllBytesAsync(temporary, bytes); File.Move(temporary, path, true); }
        finally { if (File.Exists(temporary)) File.Delete(temporary); }
    }
}
