import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import { api, message, resetCsrf } from "@/lib/api";
import { Field, ErrorNotice, buttonClass } from "./StoreForms";
import GoogleSignIn from "./GoogleSignIn";
export default function AccountSignInSettings() {
  const { user, refresh } = useAuth();
  const [phone, setPhone] = useState(user?.phoneNumber ?? "");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  async function save(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await api("/auth/phone", {
        method: "POST",
        body: JSON.stringify({ phoneNumber: phone, password }),
      });
      resetCsrf();
      await refresh();
      setPassword("");
      setNotice("Mobile number saved. You can now use it with your password to log in.");
    } catch (e) {
      setError(message(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="mb-8 rounded-2xl border bg-card p-5">
      <h2 className="mb-4 text-xl font-semibold">Sign-in options</h2>
      <ErrorNotice text={error} />
      {notice && (
        <p role="status" className="mb-3 text-sm text-primary">
          {notice}
        </p>
      )}
      {user?.hasPassword ? (
        <form onSubmit={save} className="grid max-w-xl gap-4 sm:grid-cols-2">
          <Field
            label="Login mobile number"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={20}
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Field
            label="Current password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button disabled={busy} className={buttonClass + " sm:col-span-2"}>
            {busy ? "Saving…" : "Save mobile number"}
          </button>
        </form>
      ) : (
        <p className="text-sm text-muted-foreground">
          You use Google to sign in. Delivery phone numbers are managed with your addresses.
        </p>
      )}
      {user?.googleLinked ? (
        <p className="mt-4 text-sm text-primary">Google sign-in is linked.</p>
      ) : (
        user?.hasPassword && (
          <div className="mt-5 max-w-sm border-t pt-4">
            <p className="mb-3 text-sm text-muted-foreground">
              To link Google, enter your current password above and choose the Google account with
              the same email.
            </p>
            <GoogleSignIn
              linkPassword={password}
              onSuccess={() => {
                setPassword("");
                setNotice("Google sign-in linked.");
              }}
            />
          </div>
        )
      )}
    </section>
  );
}
