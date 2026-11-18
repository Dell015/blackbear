"use client";
import { useEffect, useState } from "react";
import { branches } from "./data";
export function saveCamp(id: string) {
  try { localStorage.setItem("bb-fav-camp", id); } catch {}
  window.dispatchEvent(new CustomEvent("bb:favorite", { detail: id }));
}
export function useCamp() {
  const [camp, setCamp] = useState("cauayan-d1");
  useEffect(() => {
    const sync = (event?: Event) => {
      let id = event instanceof CustomEvent ? event.detail : null;
      try { id ||= localStorage.getItem("bb-fav-camp"); } catch {}
      if (branches.some(b => b.id === id)) setCamp(id);
    };
    sync(); window.addEventListener("bb:favorite", sync); window.addEventListener("storage", sync);
    return () => { window.removeEventListener("bb:favorite", sync); window.removeEventListener("storage", sync); };
  }, []);
  return [camp, (id: string) => { setCamp(id); saveCamp(id); }] as const;
}
