import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import { Panel } from "./StoreForms";
export default function RequireAccount({
  children,
  admin = false,
  next = "/account",
}: {
  children: ReactNode;
  admin?: boolean;
  next?: string;
}) {
  const { user, loading, error, refresh } = useAuth();
  if (loading) return <Panel title="Loading your account…">Please wait.</Panel>;
  if (error)
    return (
      <Panel title="Account unavailable">
        <p role="alert">{error}</p>
        <button className="mt-4 text-primary" onClick={() => void refresh()}>
          Try again
        </button>
      </Panel>
    );
  if (!user)
    return (
      <Panel title="Log in to continue">
        <p>Your addresses and orders are saved securely to your account.</p>
        <Link
          to="/login"
          search={{ next }}
          className="mt-5 inline-block font-semibold text-primary"
        >
          Log in / Register →
        </Link>
      </Panel>
    );
  if (admin && !user.isAdmin)
    return (
      <Panel title="Administrator access required">
        This account does not have permission to manage the store.
      </Panel>
    );
  return children;
}
