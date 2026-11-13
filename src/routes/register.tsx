import { loginDestination } from "@/lib/loginDestination";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { api, message } from "@/lib/api";
import { Panel, Field, ErrorNotice, buttonClass } from "@/components/account/StoreForms";
export const Route = createFileRoute("/register")({
  validateSearch: (search: Record<string, unknown>) => ({
    next: loginDestination(search.next),
  }),
  component: Register,
});
function Register() {
  const { next } = Route.useSearch();
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    if (form.get("password") !== form.get("confirm")) {
      setError("Passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          fullName: form.get("fullName"),
          email: form.get("email"),
          password: form.get("password"),
        }),
      });
      setDone(true);
    } catch (e) {
      setError(message(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <Panel title="Create your account" subtitle="Fresh dry fruits, a few clicks away.">
      <div className="max-w-md rounded-2xl border bg-card p-6 shadow-sm">
        {done ? (
          <div role="status">
            <p>Your account is ready.</p>
            <Link to="/login" search={{ next }} className="mt-4 inline-block text-primary">
              Continue to login →
            </Link>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <ErrorNotice text={error} />
            <Field label="Full name" name="fullName" autoComplete="name" required maxLength={100} />
            <Field
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
            />
            <Field
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={10}
              required
            />
            <p className="text-xs text-muted-foreground">
              At least 10 characters with uppercase, lowercase, a number and a symbol.
            </p>
            <Field
              label="Confirm password"
              name="confirm"
              type="password"
              autoComplete="new-password"
              minLength={10}
              required
            />
            <button disabled={busy} className={buttonClass + " w-full"}>
              {busy ? "Creating account…" : "Register"}
            </button>
            <p className="text-sm">
              Already registered?{" "}
              <Link to="/login" search={{ next }} className="text-primary">
                Log in
              </Link>
            </p>
          </form>
        )}
      </div>
    </Panel>
  );
}
