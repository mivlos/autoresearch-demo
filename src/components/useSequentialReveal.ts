"use client";
import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Hook for sequential line-by-line reveal.
 * Returns the count of currently visible lines.
 * Calls onAllRevealed when all lines have appeared.
 */
export function useSequentialReveal(
  totalLines: number,
  delayMs: number = 250,
  onAllRevealed?: () => void
) {
  const [visibleCount, setVisibleCount] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    if (visibleCount >= totalLines) {
      if (!completedRef.current) {
        completedRef.current = true;
        // Small delay after last line before calling complete
        const t = setTimeout(() => onAllRevealed?.(), 400);
        return () => clearTimeout(t);
      }
      return;
    }
    const timer = setTimeout(() => setVisibleCount((v) => v + 1), delayMs);
    return () => clearTimeout(timer);
  }, [visibleCount, totalLines, delayMs, onAllRevealed]);

  return visibleCount;
}
