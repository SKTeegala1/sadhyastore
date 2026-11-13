import type { InputHTMLAttributes, ReactNode } from "react";
export const fieldClass =
  "w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary";
export const buttonClass =
  "rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground disabled:opacity-50";
export function Field({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="grid gap-1.5 text-sm font-medium">
      <span>{label}</span>
      <input {...props} className={fieldClass} />
    </label>
  );
}
export function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Sadhya Store</p>
      <h1 className="font-display text-3xl font-bold md:text-4xl">{title}</h1>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}
export function ErrorNotice({ text }: { text: string }) {
  return text ? (
    <p
      role="alert"
      className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
    >
      {text}
    </p>
  ) : null;
}
