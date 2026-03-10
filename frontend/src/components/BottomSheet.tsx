import { useState, useRef, useEffect, useCallback } from "react";

export type SnapPoint = "hidden" | "peek" | "half" | "full";

interface BottomSheetProps {
  children: React.ReactNode;
  targetSnap: SnapPoint;
  isDark: boolean;
}

const PEEK_HEIGHT = 180;
const HALF_RATIO = 0.45;
const FULL_RATIO = 0.85;

function getSnapHeight(snap: SnapPoint, vh: number): number {
  switch (snap) {
    case "hidden":
      return 0;
    case "peek":
      return PEEK_HEIGHT;
    case "half":
      return vh * HALF_RATIO;
    case "full":
      return vh * FULL_RATIO;
  }
}

export function BottomSheet({ children, targetSnap, isDark }: BottomSheetProps) {
  const [height, setHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startY: 0, startHeight: 0 });
  const prevTargetRef = useRef(targetSnap);

  const vh = typeof window !== "undefined" ? window.innerHeight : 800;

  // Auto-snap when targetSnap changes from parent
  useEffect(() => {
    if (targetSnap !== prevTargetRef.current) {
      prevTargetRef.current = targetSnap;
      setHeight(getSnapHeight(targetSnap, vh));
    }
  }, [targetSnap, vh]);

  // Initial mount
  useEffect(() => {
    setHeight(getSnapHeight(targetSnap, vh));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      dragRef.current = { startY: e.clientY, startHeight: height };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [height]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const dy = dragRef.current.startY - e.clientY;
      const newH = Math.max(0, Math.min(vh * 0.92, dragRef.current.startHeight + dy));
      setHeight(newH);
    },
    [isDragging, vh]
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const snaps: SnapPoint[] = ["hidden", "peek", "half", "full"];
    let closest: SnapPoint = "peek";
    let minDist = Infinity;
    for (const s of snaps) {
      const d = Math.abs(height - getSnapHeight(s, vh));
      if (d < minDist) {
        minDist = d;
        closest = s;
      }
    }
    setHeight(getSnapHeight(closest, vh));
  }, [isDragging, height, vh]);

  const isVisible = height > 0 || targetSnap !== "hidden";
  if (!isVisible) return null;

  const bg = isDark ? "rgba(30, 30, 30, 0.96)" : "rgba(255, 255, 255, 0.96)";
  const border = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 30,
        padding: "0 8px 8px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          height: Math.max(height, 0),
          borderRadius: 16,
          backgroundColor: bg,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: "0 -2px 20px rgba(0,0,0,0.10), 0 0 1px rgba(0,0,0,0.15)",
          border: `1px solid ${border}`,
          display: "flex",
          flexDirection: "column" as const,
          overflow: "hidden",
          transition: isDragging ? "none" : "height 0.32s cubic-bezier(0.32, 0.72, 0, 1)",
          pointerEvents: "auto",
        }}
      >
        {/* Drag handle */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 0 4px",
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "none",
            flexShrink: 0,
            userSelect: "none",
          }}
        >
          <div
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              backgroundColor: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)",
            }}
          />
        </div>

        {/* Scrollable content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            minHeight: 0,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
