/// <reference types="google.maps" />
let pending: Promise<void> | undefined;
export function loadGoogleMaps(key: string) {
  if (window.google?.maps?.marker) return Promise.resolve();
  if (pending) return pending;
  pending = new Promise<void>((resolve, reject) => {
    const scope = window as typeof window & {
      sadhyaMapsReady?: () => void;
      gm_authFailure?: () => void;
    };
    const script = document.createElement("script");
    const timeout = window.setTimeout(() => fail(), 15000);
    function fail() {
      window.clearTimeout(timeout);
      script.remove();
      pending = undefined;
      reject(
        new Error(
          "Google Maps could not load. Use your current location or enter coordinates instead.",
        ),
      );
    }
    scope.sadhyaMapsReady = () => {
      window.clearTimeout(timeout);
      resolve();
    };
    scope.gm_authFailure = fail;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&libraries=marker&v=weekly&loading=async&callback=sadhyaMapsReady`;
    script.async = true;
    script.onerror = fail;
    document.head.appendChild(script);
  });
  return pending;
}
export type LocationPin = { latitude: number; longitude: number };
export function mapsUrl(location: LocationPin) {
  return `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
}
