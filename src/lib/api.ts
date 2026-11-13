export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}
let csrfToken: string | undefined;
export function resetCsrf() {
  csrfToken = undefined;
}
export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const method = options.method ?? "GET";
  const headers = new Headers(options.headers);
  if (options.body) headers.set("Content-Type", "application/json");
  if (!["GET", "HEAD"].includes(method)) {
    if (!csrfToken) {
      const response = await fetch("/api/auth/csrf", { credentials: "same-origin" });
      if (!response.ok)
        throw new ApiError("Could not verify your session. Please try again.", response.status);
      csrfToken = (await response.json()).token;
    }
    headers.set("X-CSRF-TOKEN", csrfToken!);
  }
  let response: Response;
  try {
    response = await fetch(`/api${path}`, { ...options, headers, credentials: "same-origin" });
  } catch {
    throw new ApiError("Cannot reach the store server. Please try again later.", 0);
  }
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new ApiError(
      body.message ??
        (response.status === 401
          ? "Please log in to continue."
          : response.status === 403
            ? "Administrator access is required."
            : "The request failed. Please try again."),
      response.status,
    );
  }
  return response.status === 204 ? (undefined as T) : response.json();
}
export const message = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong. Please try again.";
