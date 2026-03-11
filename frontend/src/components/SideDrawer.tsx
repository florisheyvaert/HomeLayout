import type { SnapPoint } from "./BottomSheet";

interface SideDrawerProps {
  children: React.ReactNode;
  targetSnap: SnapPoint;
  isDark: boolean;
}

export function SideDrawer({ children, targetSnap, isDark }: SideDrawerProps) {
  const isOpen = targetSnap !== "hidden";

  const bg = isDark ? "rgba(30, 30, 30, 0.96)" : "rgba(255, 255, 255, 0.96)";
  const border = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";

  return (
    <div
      style={{
        position: "absolute",
        top: 64,
        right: 12,
        bottom: 12,
        width: 360,
        borderRadius: 16,
        backgroundColor: bg,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: "0 2px 20px rgba(0,0,0,0.10), 0 0 1px rgba(0,0,0,0.15)",
        border: `1px solid ${border}`,
        display: "flex",
        flexDirection: "column" as const,
        overflow: "hidden",
        pointerEvents: "auto",
        transform: isOpen ? "translateX(0)" : "translateX(calc(100% + 24px))",
        transition: "transform 0.32s cubic-bezier(0.32, 0.72, 0, 1)",
        zIndex: 30,
      }}
    >
      {/* Scrollable content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          minHeight: 0,
          display: "flex",
          flexDirection: "column" as const,
        }}
      >
        {children}
      </div>
    </div>
  );
}
