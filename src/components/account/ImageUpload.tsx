import { useState } from "react";
import { api, message } from "@/lib/api";
export default function ImageUpload({
  label,
  value,
  onChange,
  disabled = false,
  onBusyChange,
}: {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  onBusyChange?: (busy: boolean) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  return (
    <div className="min-w-0 space-y-2 rounded-xl border bg-muted/20 p-3">
      <label className="grid min-w-0 gap-2 text-sm font-medium">
        <span>{label}</span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={disabled || busy}
          className="min-w-0 max-w-full text-xs file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-3 file:py-2 file:text-primary"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            setError("");
            if (file.size > 5 * 1024 * 1024) {
              setError("Choose an image smaller than 5 MB.");
              return;
            }
            setBusy(true);
            onBusyChange?.(true);
            try {
              const data = new FormData();
              data.append("file", file);
              const uploaded = await api<{ url: string }>("/admin/media", {
                method: "POST",
                body: data,
              });
              onChange(uploaded.url);
            } catch (e) {
              setError(message(e));
            } finally {
              setBusy(false);
              onBusyChange?.(false);
            }
          }}
        />
      </label>
      <p className="text-xs text-muted-foreground">
        JPEG, PNG or WebP · Up to 5 MB{busy ? " · Uploading…" : ""}
      </p>
      {value && (
        <img
          src={value}
          alt="Uploaded image preview"
          className="h-20 w-20 rounded-lg object-cover"
        />
      )}
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
