import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Hook that loads a vacuum map image reactively.
 * Instead of polling, it reloads the image when `lastUpdated` changes —
 * this timestamp comes from the HA image entity's state via websocket,
 * so we only fetch when the map actually changed.
 * Double-buffers: keeps showing the previous frame until the new one loads.
 */
export function useVacuumMap(
  entityPictureUrl: string | undefined,
  lastUpdated: string | undefined,
  enabled = true,
) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [hasError, setHasError] = useState(false);
  const pendingImg = useRef<HTMLImageElement | null>(null);

  const loadImage = useCallback(() => {
    if (!entityPictureUrl) return;
    if (pendingImg.current) pendingImg.current.src = "";

    const img = new Image();
    img.crossOrigin = "anonymous";
    pendingImg.current = img;

    img.onload = () => {
      pendingImg.current = null;
      setImage(img);
      setHasError(false);
    };
    img.onerror = () => {
      pendingImg.current = null;
      setHasError(true);
    };
    img.src = `${entityPictureUrl}${entityPictureUrl.includes("?") ? "&" : "?"}ts=${Date.now()}`;
  }, [entityPictureUrl]);

  // Reload when lastUpdated changes (pushed via HA websocket)
  useEffect(() => {
    if (!enabled || !entityPictureUrl) return;
    loadImage();

    return () => {
      if (pendingImg.current) {
        pendingImg.current.src = "";
        pendingImg.current = null;
      }
    };
  }, [enabled, entityPictureUrl, lastUpdated, loadImage]);

  return { image, hasError, refresh: loadImage };
}
