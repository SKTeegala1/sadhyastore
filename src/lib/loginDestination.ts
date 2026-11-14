export function loginDestination(next: unknown): "/" | "/checkout" | "/admin" | "/account" {
  return next === "/checkout" || next === "/admin" || next === "/account" ? next : "/";
}
