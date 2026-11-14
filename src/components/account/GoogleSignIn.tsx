import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api, message, resetCsrf } from "@/lib/api";
import { useAuth } from "@/lib/auth";
type IdentityApi = {
  initialize: (options: {
    client_id: string;
    callback: (response: { credential: string }) => void;
    auto_select: boolean;
  }) => void;
  renderButton: (
    element: HTMLElement,
    options: { theme: string; size: string; text: string; width: number },
  ) => void;
};
const identity = () =>
  (window as unknown as { google?: { accounts?: { id?: IdentityApi } } }).google?.accounts?.id;
let loader: Promise<void> | undefined;
function loadIdentity() {
  if (identity()) return Promise.resolve();
  loader ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    const timeout = window.setTimeout(fail, 15000);
    function fail() {
      window.clearTimeout(timeout);
      script.remove();
      loader = undefined;
      reject(new Error("Google sign-in could not load. Please use email or mobile login."));
    }
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      window.clearTimeout(timeout);
      resolve();
    };
    script.onerror = fail;
    document.head.appendChild(script);
  });
  return loader;
}
export default function GoogleSignIn({
  onSuccess,
  linkPassword,
}: {
  onSuccess: () => void | Promise<void>;
  linkPassword?: string;
}) {
  const config = useQuery({
    queryKey: ["google-auth-config"],
    queryFn: () => api<{ enabled: boolean; clientId: string | null }>("/auth/google/config"),
    retry: 1,
  });
  const { refresh } = useAuth();
  const container = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const latest = useRef({ onSuccess, linkPassword, refresh });
  latest.current = { onSuccess, linkPassword, refresh };
  useEffect(() => {
    if (!config.data?.enabled || !config.data.clientId || !container.current) return;
    let cancelled = false;
    const clientId = config.data.clientId;
    loadIdentity()
      .then(() => {
        if (cancelled || !container.current) return;
        const google = identity();
        if (!google) throw new Error("Google sign-in is unavailable.");
        google.initialize({
          client_id: clientId,
          auto_select: false,
          callback: async (response) => {
            if (cancelled) return;
            setError("");
            setBusy(true);
            try {
              const linking = latest.current.linkPassword !== undefined;
              await api(linking ? "/auth/google/link" : "/auth/google", {
                method: "POST",
                body: JSON.stringify({
                  credential: response.credential,
                  password: latest.current.linkPassword,
                }),
              });
              if (!linking) resetCsrf();
              await latest.current.refresh();
              await latest.current.onSuccess();
            } catch (e) {
              setError(message(e));
            } finally {
              if (!cancelled) setBusy(false);
            }
          },
        });
        google.renderButton(container.current, {
          theme: "outline",
          size: "large",
          text: "continue_with",
          width: Math.min(container.current.clientWidth || 300, 400),
        });
      })
      .catch((e) => {
        if (!cancelled) setError(message(e));
      });
    return () => {
      cancelled = true;
    };
  }, [config.data?.enabled, config.data?.clientId]);
  return (
    <div className="space-y-2">
      <div
        ref={container}
        aria-busy={busy}
        className={
          (config.data?.enabled ? "min-h-11 w-full overflow-hidden " : "hidden ") +
          (busy ? "pointer-events-none opacity-50" : "")
        }
      />
      {(!config.data?.enabled || config.error) && (
        <>
          <button
            type="button"
            disabled
            className="min-h-11 w-full rounded-xl border px-4 text-sm text-muted-foreground"
          >
            Continue with Google
          </button>
          {!config.isPending && (
            <p className="text-xs text-muted-foreground">
              Google sign-in is temporarily unavailable. Use email or mobile login.
            </p>
          )}
        </>
      )}
      {busy && (
        <p role="status" className="text-sm text-muted-foreground">
          Verifying Google account…
        </p>
      )}
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
