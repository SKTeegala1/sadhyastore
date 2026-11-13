import GoogleSignIn from "@/components/account/GoogleSignIn";
import { loginDestination } from "@/lib/loginDestination";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import { api, message, resetCsrf } from "@/lib/api";
import { Panel, Field, ErrorNotice, buttonClass } from "@/components/account/StoreForms";
export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    next: loginDestination(search.next),
  }),
  component: Login,
});
function Login() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const { user, refresh } = useAuth();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const form = new FormData(e.currentTarget);
    try {
      await api("/auth/login", { method: "POST", body: JSON.stringify(Object.fromEntries(form)) });
      resetCsrf();
      await refresh();
      await navigate({ to: next });
    } catch (e) {
      setError(message(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <Panel title="Welcome back" subtitle="Log in to manage your addresses and place an order.">
      <div className="max-w-md rounded-2xl border bg-card p-6 shadow-sm">
        {user ? (
          <>
            <p>You’re logged in as {user.fullName}.</p>
            <Link to={next} className="mt-4 inline-block text-primary">
              Continue →
            </Link>
          </>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <ErrorNotice text={error} />
            <Field
              label="Email or mobile number"
              name="identifier"
              type="text"
              autoComplete="username"
              required
              maxLength={254}
            />
            <Field
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
            <button disabled={busy} className={buttonClass + " w-full"}>
              {busy ? "Logging in…" : "Log in"}
            </button>
            <div className="border-t pt-4">
              <GoogleSignIn onSuccess={() => navigate({ to: next })} />
            </div>
            <p className="text-sm">
              New to Sadhya?{" "}
              <Link to="/register" search={{ next }} className="font-semibold text-primary">
                Create an account
              </Link>
            </p>
          </form>
        )}
      </div>
    </Panel>
  );
}
