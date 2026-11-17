"use client";
import { useEffect, useRef } from "react";
import { IconArrowLeft, IconArrowRight } from "./Icons";

/** Horizontal scroller with mouse drag + arrow buttons. Touch uses native scroll. */
export function useDragRail() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let down = false,
      startX = 0,
      startL = 0,
      moved = false;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      moved = false;
      startX = e.clientX;
      startL = el.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 5 && !moved) {
        moved = true;
        el.classList.add("is-dragging");
      }
      if (moved) el.scrollLeft = startL - dx;
    };
    const onUp = () => {
      down = false;
      setTimeout(() => el.classList.remove("is-dragging"), 0);
    };
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClickCapture, true);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, []);
  return ref;
}

export function RailNav({ target }: { target: React.RefObject<HTMLDivElement | null> }) {
  const go = (dir: number) => {
    const el = target.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 20), behavior: "smooth" });
  };
  return (
    <div className="rail-nav">
      <button className="round" aria-label="Previous" onClick={() => go(-1)}>
        <IconArrowLeft />
      </button>
      <button className="round" aria-label="Next" onClick={() => go(1)}>
        <IconArrowRight />
      </button>
    </div>
  );
}
