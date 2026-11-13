using Microsoft.EntityFrameworkCore;
public static class OrderNotesUpgrade
{
    public static async Task Run(StoreDb db)
    {
        if (db.Database.IsSqlite()) {
            var connection = db.Database.GetDbConnection();
            await db.Database.OpenConnectionAsync();
            bool exists = false;
            await using (var command = connection.CreateCommand()) {
                command.CommandText = "PRAGMA table_info(Orders)";
                await using var reader = await command.ExecuteReaderAsync();
                while (await reader.ReadAsync()) if (reader.GetString(1) == "AdditionalDetails") exists = true;
            }
            if (!exists) await db.Database.ExecuteSqlRawAsync("ALTER TABLE Orders ADD COLUMN AdditionalDetails TEXT NULL");
            await db.Database.CloseConnectionAsync();
        } else {
            await db.Database.ExecuteSqlRawAsync("IF COL_LENGTH(N'Orders', N'AdditionalDetails') IS NULL ALTER TABLE Orders ADD AdditionalDetails nvarchar(1000) NULL");
        }
    }
}
