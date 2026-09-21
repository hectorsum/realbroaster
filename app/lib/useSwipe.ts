"use client";

import { useRef, useState } from "react";

interface Options {
  /** Called once when a drag ends past the threshold. -1 = swipe right (previous), 1 = swipe left (next). */
  onSwipe: (dir: -1 | 1) => void;
  /** Called when a drag actually starts / ends (e.g. to pause an autoplay timer). */
  onStart?: () => void;
  onEnd?: () => void;
}

/**
 * Horizontal swipe for touch and mouse using pointer events.
 * The element must have `touch-action: pan-y` so the browser keeps vertical scrolling
 * and hands horizontal gestures to us (needed on iOS Safari).
 * A drag only begins after a few px of movement so plain taps/clicks keep working,
 * and the click that follows a drag is swallowed.
 */
export function useSwipe({ onSwipe, onStart, onEnd }: Options) {
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const dx = useRef(0);
  const width = useRef(0);
  const pressed = useRef(false);
  const moved = useRef(false);

  const finish = () => {
    pressed.current = false;
    if (!moved.current) return;
    setDragging(false);
    setDragX(0);
    const threshold = Math.min(90, width.current * 0.18);
    if (dx.current < -threshold) onSwipe(1);
    else if (dx.current > threshold) onSwipe(-1);
    dx.current = 0;
    onEnd?.();
  };

  const handlers = {
    onPointerDown: (e: React.PointerEvent<HTMLElement>) => {
      pressed.current = true;
      moved.current = false;
      startX.current = e.clientX;
      dx.current = 0;
      width.current = e.currentTarget.clientWidth;
    },
    onPointerMove: (e: React.PointerEvent<HTMLElement>) => {
      if (!pressed.current) return;
      const d = e.clientX - startX.current;
      if (!moved.current) {
        if (Math.abs(d) < 6) return;
        moved.current = true;
        setDragging(true);
        onStart?.();
        e.currentTarget.setPointerCapture?.(e.pointerId);
      }
      dx.current = d;
      setDragX(d);
    },
    onPointerUp: finish,
    onPointerCancel: finish,
    onClickCapture: (e: React.MouseEvent<HTMLElement>) => {
      if (moved.current) {
        e.stopPropagation();
        e.preventDefault();
        moved.current = false;
      }
    },
    onDragStart: (e: React.DragEvent<HTMLElement>) => e.preventDefault(),
  };

  return { dragX, dragging, handlers };
}
