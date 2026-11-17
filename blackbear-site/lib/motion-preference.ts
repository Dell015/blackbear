"use client";
import { useSyncExternalStore } from "react";
function preference(): "full" | "reduced" | "system" {
  if (typeof window === "undefined") return "full";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return "system";
  try {
    if (localStorage.getItem("bb-reduced-motion") === "1") return "reduced";
  } catch {}
  return "full";
}
function subscribe(listener: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", listener);
  window.addEventListener("bb:motion", listener);
  window.addEventListener("storage", listener);
  return () => {
    media.removeEventListener("change", listener);
    window.removeEventListener("bb:motion", listener);
    window.removeEventListener("storage", listener);
  };
}
export const useMotionPreference = () =>
  useSyncExternalStore(subscribe, preference, () => "full" as const);
export function setReducedMotion(reduced: boolean) {
  try {
    localStorage.setItem("bb-reduced-motion", reduced ? "1" : "0");
  } catch {}
  document.documentElement.classList.toggle(
    "rm",
    reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  window.dispatchEvent(new Event("bb:motion"));
}
