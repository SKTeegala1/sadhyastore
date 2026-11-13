using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
public static class PhoneAccounts
{
    public static string? Normalize(string? value) {
        if (string.IsNullOrWhiteSpace(value)) return null;
        var phone = Regex.Replace(value.Trim(), @"[\s()-]", "");
        if (phone.StartsWith("+91")) phone = phone[3..];
        else if (phone.Length == 12 && phone.StartsWith("91")) phone = phone[2..];
        return Regex.IsMatch(phone, @"^[6-9][0-9]{9}$") ? phone : null;
    }
    public static async Task Upgrade(StoreDb db) {
        if (db.Database.IsSqlite()) await db.Database.ExecuteSqlRawAsync("CREATE TABLE IF NOT EXISTS LoginPhones (PhoneNumber TEXT NOT NULL PRIMARY KEY, UserId TEXT NOT NULL)");
        else await db.Database.ExecuteSqlRawAsync("IF OBJECT_ID(N'LoginPhones', N'U') IS NULL CREATE TABLE LoginPhones (PhoneNumber nvarchar(10) NOT NULL PRIMARY KEY, UserId nvarchar(450) NOT NULL)");
    }
}
