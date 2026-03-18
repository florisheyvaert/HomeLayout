import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Hook that periodically loads a camera thumbnail image.
 * Returns an HTMLImageElement ready for Konva Image or DOM usage.
 * Double-buffers: keeps showing the previous frame until the new one loads.
 */
export function useCameraThumbnail(
  entityPictureUrl: string | undefined,
  refreshInterval = 10000,
  enabled = true,
) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [hasError, setHasError] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
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

  useEffect(() => {
    if (!enabled || !entityPictureUrl) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    loadImage();
    intervalRef.current = setInterval(loadImage, refreshInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (pendingImg.current) {
        pendingImg.current.src = "";
        pendingImg.current = null;
      }
    };
  }, [enabled, entityPictureUrl, refreshInterval, loadImage]);

  return { image, hasError, refresh: loadImage };
}
