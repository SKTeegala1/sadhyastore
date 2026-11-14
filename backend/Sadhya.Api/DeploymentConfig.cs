using System.Net;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.DataProtection;

public static class DeploymentConfig
{
    public static void ConfigureStoreDeployment(this WebApplicationBuilder builder)
    {
        var keys = builder.Configuration["DataProtection:KeyPath"];
        if (!string.IsNullOrWhiteSpace(keys)) {
            Directory.CreateDirectory(keys);
            builder.Services.AddDataProtection().SetApplicationName("SadhyaStore").PersistKeysToFileSystem(new DirectoryInfo(keys));
        }
        var renderHost = builder.Configuration["RENDER_EXTERNAL_HOSTNAME"];
        if (!string.IsNullOrWhiteSpace(renderHost)) {
            var hosts = builder.Configuration["AllowedHosts"] ?? "localhost;127.0.0.1";
            builder.Configuration["AllowedHosts"] = hosts + ";" + renderHost;
            if (!builder.Environment.IsDevelopment() && string.IsNullOrWhiteSpace(builder.Configuration["Gateway:Token"]))
                throw new InvalidOperationException("Set Gateway__Token before deploying the Render backend.");
        }
    }
    public static void UseStoreGateway(this WebApplication app)
    {
        var token = app.Configuration["Gateway:Token"];
        if (string.IsNullOrWhiteSpace(token)) return;
        var expected = SHA256.HashData(Encoding.UTF8.GetBytes(token));
        app.Use(async (context, next) => {
            if (!context.Request.Path.StartsWithSegments("/api") || context.Request.Path.Equals("/api/health", StringComparison.OrdinalIgnoreCase)) { await next(); return; }
            var supplied = context.Request.Headers["X-Sadhya-Gateway-Key"].ToString();
            if (supplied.Length > 1024 || !CryptographicOperations.FixedTimeEquals(expected, SHA256.HashData(Encoding.UTF8.GetBytes(supplied)))) {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsJsonAsync(new { message = "Access the store API through the storefront." }); return;
            }
            // Cloudflare terminates HTTPS and authenticates this hop with the secret.
            // Set the scheme only after verification, so secure CSRF/cookies work.
            context.Request.Scheme = "https";
            // Only a caller with the gateway secret may supply the client's IP.
            if (IPAddress.TryParse(context.Request.Headers["X-Sadhya-Client-IP"].ToString(), out var clientIp))
                context.Connection.RemoteIpAddress = clientIp;
            await next();
        });
    }
}
