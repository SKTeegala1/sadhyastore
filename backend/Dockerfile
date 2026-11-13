FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /source
COPY backend/Sadhya.Api/Sadhya.Api.csproj backend/Sadhya.Api/
RUN dotnet restore backend/Sadhya.Api/Sadhya.Api.csproj
COPY backend/Sadhya.Api/ backend/Sadhya.Api/
RUN dotnet publish backend/Sadhya.Api/Sadhya.Api.csproj -c Release --no-restore -o /publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
# Initialize mounted-volume permissions, then drop to the built-in app user.
RUN apt-get update && apt-get install -y --no-install-recommends gosu && rm -rf /var/lib/apt/lists/*
COPY --from=build /publish/ ./
COPY backend/docker/entrypoint.sh /app/entrypoint.sh
RUN chmod 755 /app/entrypoint.sh
ENV ASPNETCORE_ENVIRONMENT=Production \
    DatabaseProvider=Sqlite \
    Storage__Path=/var/data \
    DOTNET_EnableDiagnostics=0
EXPOSE 10000
ENTRYPOINT ["/app/entrypoint.sh"]
