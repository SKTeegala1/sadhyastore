import { Package, UserRound } from "lucide-react";
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
          <Link
            to="/account"
            hash="orders"
            onClick={onNavigate}
            aria-label="My orders"
            className="inline-flex min-h-11 items-center gap-1.5"
          >
            <Package className="h-5 w-5" aria-hidden="true" />
            <span>Orders</span>
          </Link>
          <Link
            to="/account"
            onClick={onNavigate}
            aria-label="My account"
            title="My account"
            className="inline-flex h-11 w-11 items-center justify-center"
          >
            <UserRound className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">My account</span>
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
          search={{ next: "/" }}
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
