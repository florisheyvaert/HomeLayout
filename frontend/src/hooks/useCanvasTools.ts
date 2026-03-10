import { useState, useCallback } from "react";
import type { CanvasTool } from "../types";

export function useCanvasTools() {
  const [activeTool, setActiveTool] = useState<CanvasTool>("select");

  const selectTool = useCallback((tool: CanvasTool) => {
    setActiveTool(tool);
  }, []);

  return { activeTool, selectTool };
}
