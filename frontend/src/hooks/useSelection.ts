import { useState, useCallback } from "react";

export function useSelection() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const select = useCallback((id: string) => {
    setSelectedIds(new Set([id]));
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  return { selectedIds, select, toggleSelect, clearSelection };
}
