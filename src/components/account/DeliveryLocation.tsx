import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps, mapsUrl, type LocationPin } from "@/lib/googleMaps";
import { Field } from "./StoreForms";
export default function DeliveryLocation({
  value,
  onChange,
}: {
  value: LocationPin | null;
  onChange: (value: LocationPin | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [manual, setManual] = useState(false);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const change = useRef(onChange);
  change.current = onChange;
  const latest = useRef(value);
  latest.current = value;
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  useEffect(() => {
    if (!open || !key || !container.current) return;
    let cancelled = false;
    let mapClick: google.maps.MapsEventListener | undefined;
    let drag: google.maps.MapsEventListener | undefined;
    loadGoogleMaps(key)
      .then(() => {
        if (cancelled || !container.current) return;
        const pin = latest.current;
        const center = pin
          ? { lat: pin.latitude, lng: pin.longitude }
          : { lat: 17.519, lng: 78.284 };
        const map = new google.maps.Map(container.current, {
          center,
          zoom: pin ? 17 : 12,
          mapId: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID",
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          gestureHandling: "cooperative",
        });
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: pin ? center : undefined,
          gmpDraggable: true,
          title: "Delivery location",
        });
        mapRef.current = map;
        markerRef.current = marker;
        mapClick = map.addListener("click", (event: google.maps.MapMouseEvent) => {
          if (!event.latLng) return;
          const pos = event.latLng.toJSON();
          marker.position = pos;
          change.current({ latitude: pos.lat, longitude: pos.lng });
        });
        drag = marker.addListener("dragend", () => {
          const p = marker.position;
          if (!p) return;
          const latitude = typeof p.lat === "function" ? p.lat() : p.lat;
          const longitude = typeof p.lng === "function" ? p.lng() : p.lng;
          change.current({ latitude, longitude });
        });
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      });
    return () => {
      cancelled = true;
      mapClick?.remove();
      drag?.remove();
      if (markerRef.current) markerRef.current.map = null;
      mapRef.current = null;
      markerRef.current = null;
    };
  }, [open, key]);
  useEffect(() => {
    if (!value) {
      if (markerRef.current) markerRef.current.position = null;
      return;
    }
    const pos = { lat: value.latitude, lng: value.longitude };
    if (markerRef.current) markerRef.current.position = pos;
    mapRef.current?.panTo(pos);
  }, [value]);
  function currentLocation() {
    setError("");
    if (!navigator.geolocation) {
      setError("Location is not supported. Enter your address manually.");
      return;
    }
    setBusy(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        onChange({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        setBusy(false);
      },
      () => {
        setBusy(false);
        setError(
          "Location permission was denied or unavailable. You can still enter your address and coordinates manually.",
        );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 30000 },
    );
  }
  return (
    <div className="min-w-0 space-y-3 rounded-xl border bg-muted/20 p-4 sm:col-span-2">
      <div>
        <h3 className="font-semibold">
          Delivery location{" "}
          <span className="text-xs font-normal text-muted-foreground">(optional)</span>
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Add a pin to help us find you. Complete the street address and PIN code below too.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={currentLocation}
          className="min-h-11 rounded-lg border bg-background px-3 text-sm text-primary"
        >
          {busy ? "Finding location…" : "Use my current location"}
        </button>
        {key && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="min-h-11 rounded-lg border bg-background px-3 text-sm text-primary"
          >
            {open ? "Close map" : "Choose on Google Maps"}
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setManual((v) => !v);
            setLat(value ? String(value.latitude) : "");
            setLng(value ? String(value.longitude) : "");
          }}
          className="min-h-11 px-2 text-sm text-primary"
        >
          Enter coordinates
        </button>
      </div>
      {open && key && (
        <>
          <div
            ref={container}
            aria-label="Select delivery location on Google Maps"
            className="h-64 w-full rounded-xl sm:h-80"
          />
          <p className="text-xs text-muted-foreground">
            Tap the map or drag the pin to your delivery entrance.
          </p>
        </>
      )}
      {manual && (
        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Latitude"
            value={lat}
            inputMode="decimal"
            onChange={(e) => setLat(e.target.value)}
          />
          <Field
            label="Longitude"
            value={lng}
            inputMode="decimal"
            onChange={(e) => setLng(e.target.value)}
          />
          <button
            type="button"
            className="min-h-11 text-left text-sm font-semibold text-primary"
            onClick={() => {
              const latitude = Number(lat),
                longitude = Number(lng);
              if (
                !lat.trim() ||
                !lng.trim() ||
                !Number.isFinite(latitude) ||
                !Number.isFinite(longitude) ||
                Math.abs(latitude) > 90 ||
                Math.abs(longitude) > 180
              ) {
                setError("Enter valid latitude (−90 to 90) and longitude (−180 to 180).");
                return;
              }
              onChange({ latitude, longitude });
              setError("");
              setManual(false);
            }}
          >
            Use these coordinates
          </button>
        </div>
      )}
      {value && (
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span>
            Pin: {value.latitude.toFixed(6)}, {value.longitude.toFixed(6)}
          </span>
          <a
            href={mapsUrl(value)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center font-semibold text-primary"
          >
            View on Google Maps ↗
          </a>
          <button
            type="button"
            className="min-h-10 text-destructive"
            onClick={() => onChange(null)}
          >
            Remove pin
          </button>
        </div>
      )}
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
