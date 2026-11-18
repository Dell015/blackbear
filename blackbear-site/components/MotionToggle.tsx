"use client";
import { setReducedMotion, useMotionPreference } from "@/lib/motion-preference";
export default function MotionToggle() {
  const preference = useMotionPreference();
  return (
    <button
      className="motion-toggle"
      aria-pressed={preference !== "full"}
      disabled={preference === "system"}
      onClick={() => setReducedMotion(preference === "full")}
    >
      {preference === "system"
        ? "Motion reduced by system"
        : preference === "reduced"
          ? "Reduced motion: on"
          : "Reduce motion"}
      <span className={`motion-toggle__switch${preference === "full" ? "" : " is-on"}`} aria-hidden="true" />
    </button>
  );
}
