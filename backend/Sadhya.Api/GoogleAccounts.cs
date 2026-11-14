using System.Security.Claims;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
public static class GoogleAccounts
{
    public static void MapGoogleAccounts(this RouteGroupBuilder api, IConfiguration config)
    {
        var clientId = config["Authentication:Google:ClientId"];
        api.MapGet("/auth/google/config", () => Results.Ok(new { enabled = !string.IsNullOrWhiteSpace(clientId), clientId = string.IsNullOrWhiteSpace(clientId) ? null : clientId }));
        api.MapPost("/auth/google", async (GoogleInput input, UserManager<Customer> users, SignInManager<Customer> signin) => {
            if (string.IsNullOrWhiteSpace(clientId)) return Results.Json(new { message = "Google sign-in has not been configured yet." }, statusCode: 503);
            var payload = await Verify(input.Credential, clientId);
            if (payload is null) return Results.Json(new { message = "Google sign-in could not be verified. Please try again." }, statusCode: 401);
            var user = await users.FindByLoginAsync("Google", payload.Subject);
            if (user is null) {
                if (await users.FindByEmailAsync(payload.Email) is not null) return Results.Conflict(new { message = "This email already has an account. Log in with your password, then link Google from My account." });
                var displayName = string.IsNullOrWhiteSpace(payload.Name) ? payload.Email : payload.Name.Trim();
                user = new Customer { UserName = payload.Email, Email = payload.Email, EmailConfirmed = true, FullName = displayName[..Math.Min(displayName.Length, 100)] };
                var result = await users.CreateAsync(user);
                if (!result.Succeeded) return Results.BadRequest(new { message = "Could not create the account. Try logging in with your email instead." });
                var linked = await users.AddLoginAsync(user, new UserLoginInfo("Google", payload.Subject, "Google"));
                if (!linked.Succeeded) { await users.DeleteAsync(user); return Results.Conflict(new { message = "Google sign-in could not be linked. Please try again." }); }
            }
            if (!await signin.CanSignInAsync(user) || await users.IsLockedOutAsync(user)) return Results.Json(new { message = "Unable to log in. Please try again later." }, statusCode: 401);
            await signin.SignInAsync(user, false, "Google"); return Results.Ok(new { message = "Logged in with Google." });
        }).RequireRateLimiting("auth");
        api.MapPost("/auth/google/link", async (GoogleInput input, ClaimsPrincipal principal, UserManager<Customer> users) => {
            var user = await users.GetUserAsync(principal);
            if (user is null) return Results.Unauthorized();
            if (string.IsNullOrWhiteSpace(clientId)) return Results.Json(new { message = "Google sign-in has not been configured yet." }, statusCode: 503);
            if (string.IsNullOrEmpty(input.Password) || !await users.CheckPasswordAsync(user, input.Password)) return Results.BadRequest(new { message = "Enter your current account password to link Google." });
            var payload = await Verify(input.Credential, clientId);
            if (payload is null || !string.Equals(payload.Email, user.Email, StringComparison.OrdinalIgnoreCase)) return Results.BadRequest(new { message = "Choose the Google account with the same email as your store account." });
            var result = await users.AddLoginAsync(user, new UserLoginInfo("Google", payload.Subject, "Google"));
            return result.Succeeded ? Results.Ok(new { message = "Google account linked." }) : Results.Conflict(new { message = "This Google account could not be linked." });
        }).RequireAuthorization().RequireRateLimiting("auth");
    }
    private static async Task<GoogleJsonWebSignature.Payload?> Verify(string credential, string clientId) {
        if (string.IsNullOrWhiteSpace(credential) || credential.Length > 10000) return null;
        try {
            var payload = await GoogleJsonWebSignature.ValidateAsync(credential, new GoogleJsonWebSignature.ValidationSettings { Audience = new[] { clientId } });
            return payload.EmailVerified && !string.IsNullOrEmpty(payload.Email) && !string.IsNullOrEmpty(payload.Subject) ? payload : null;
        } catch (Exception error) when (error is InvalidJwtException or ArgumentException or FormatException) { return null; }
    }
}
