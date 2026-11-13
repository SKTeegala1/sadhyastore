import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { message } from "@/lib/api";
export default function AccountNav({ onNavigate }: { onNavigate?: () => void }) {
  const { user, loading, logout } = useAuth();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  if (loading) return <span className="text-sm text-muted-foreground">Loading account…</span>;
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      {user ? (
        <>
          <Link to="/account" onClick={onNavigate}>
            My account
          </Link>
          {user.isAdmin && (
            <Link to="/admin" onClick={onNavigate} className="font-semibold text-primary">
              Admin
            </Link>
          )}
          <button
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                await logout();
                onNavigate?.();
              } catch (e) {
                setError(message(e));
              } finally {
                setBusy(false);
              }
            }}
          >
            Log out
          </button>
        </>
      ) : (
        <Link
          to="/login"
          search={{ next: "/account" }}
          onClick={onNavigate}
          className="font-semibold text-primary"
        >
          Log in / Register
        </Link>
      )}
      {error && (
        <span role="alert" className="text-destructive">
          {error}
        </span>
      )}
    </div>
  );
}
