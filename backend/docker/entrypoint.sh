#!/bin/sh
set -eu
storage="${Storage__Path:-/var/data}"
keys="${DataProtection__KeyPath:-$storage/keys}"
mkdir -p "$storage" "$keys"
chown -R app:app "$storage" "$keys"
chmod 700 "$keys"
export DataProtection__KeyPath="$keys"
export ConnectionStrings__Store="${ConnectionStrings__Store:-Data Source=$storage/sadhya.db}"
export ASPNETCORE_URLS="http://0.0.0.0:${PORT:-10000}"
exec gosu app dotnet /app/Sadhya.Api.dll
