"use client";
import { useEffect, useRef } from "react";
import { lockScroll } from "@/components/Motion";

/** Contain keyboard navigation and return focus to the overlay's trigger. */
export function useDialog<T extends HTMLElement>(open: boolean, onClose: () => void) {
  const ref = useRef<T>(null);
  const close = useRef(onClose);
  useEffect(() => { close.current = onClose; }, [onClose]);
  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    const previous = document.activeElement as HTMLElement | null;
    const siblings: { element: HTMLElement; inert: boolean }[] = [];
    let current: HTMLElement = dialog;
    while (current.parentElement && current !== document.body) {
      for (const sibling of Array.from(current.parentElement.children)) {
        if (sibling !== current && sibling instanceof HTMLElement && !sibling.classList.contains("sheet-backdrop") && !["SCRIPT", "STYLE"].includes(sibling.tagName)) {
          siblings.push({ element: sibling, inert: sibling.inert });
          sibling.inert = true;
        }
      }
      current = current.parentElement;
    }
    lockScroll(true);
    const focusables = () => Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, [tabindex="0"]'))
      .filter((element) => !element.closest("[inert]") && element.getClientRects().length > 0);
    const frame = requestAnimationFrame(() => (focusables()[0] ?? dialog).focus({ preventScroll: true }));
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); close.current(); }
      if (event.key !== "Tab") return;
      const elements = focusables();
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (!first) { event.preventDefault(); return; }
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault(); first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKey);
      siblings.forEach(({ element, inert }) => { element.inert = inert; });
      lockScroll(false);
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, [open]);
  return ref;
}
