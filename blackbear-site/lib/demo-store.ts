"use client";
import { useSyncExternalStore } from "react";
import { branches, cakeStory, cakeStoryDate } from "./data";

export type CampUpdate = { cakes: string[]; updated: string | null; soldOut: string[]; note: string; hoursDraft: string; featuredPhoto?: string };
export type CampPhoto = { id: string; src: string; caption: string; author: string; branch: string; approved: boolean; winner: boolean; created: string };
export type CrewProfile = { id: string; name: string; branch: string; specialty: string; onDuty: boolean };
export type DemoState = {
  version: 1;
  camps: Record<string, CampUpdate>;
  stamps: number;
  rewardHistory: string[];
  favoriteCrew: string | null;
  crew: CrewProfile[];
  photos: CampPhoto[];
  activity: { id: string; text: string; time: string }[];
};
export const demoInitial: DemoState = {
  version: 1,
  camps: Object.fromEntries(branches.map((branch) => [branch.id, { cakes: cakeStory[branch.id] ?? [], updated: null, soldOut: [], note: "", hoursDraft: "" }])),
  stamps: 0,
  rewardHistory: [],
  favoriteCrew: null,
  crew: [
    { id: "crew-1", name: "Alex · demo profile", branch: "cauayan-d1", specialty: "Coffee & latte art", onDuty: true },
    { id: "crew-2", name: "Sam · demo profile", branch: "santiago", specialty: "Matcha & late-night brews", onDuty: false },
    { id: "crew-3", name: "Kai · demo profile", branch: "cauayan-sf", specialty: "Brunch & cake pairings", onDuty: true },
  ],
  photos: [],
  activity: [],
};
const key = "bb-workspace-v1";
let cached = demoInitial;
let lastRaw: string | null | undefined;
function snapshot(): DemoState {
  if (typeof window === "undefined") return demoInitial;
  try {
    const raw = localStorage.getItem(key);
    if (raw !== lastRaw) {
      lastRaw = raw;
      const value = raw ? JSON.parse(raw) : null;
      cached = value?.version === 1 && value.camps && Array.isArray(value.crew) && Array.isArray(value.photos)
        ? { ...demoInitial, ...value, camps: { ...demoInitial.camps, ...value.camps } } : demoInitial;
    }
  } catch { /* Use the in-memory session when browser storage is unavailable. */ }
  return cached;
}
function subscribe(listener: () => void) {
  const onStorage = (event: StorageEvent) => { if (event.key === key || event.key === null) listener(); };
  window.addEventListener("storage", onStorage);
  window.addEventListener("bb:workspace", listener);
  return () => { window.removeEventListener("storage", onStorage); window.removeEventListener("bb:workspace", listener); };
}
export const useDemo = () => useSyncExternalStore(subscribe, snapshot, () => demoInitial);
export function changeDemo(change: (state: DemoState) => DemoState, activity?: string): boolean {
  const current = snapshot();
  const next = change(current);
  if (activity) next.activity = [{ id: crypto.randomUUID(), text: activity, time: new Date().toISOString() }, ...current.activity].slice(0, 30);
  try {
    const raw = JSON.stringify(next);
    localStorage.setItem(key, raw);
    lastRaw = raw;
    cached = next;
    window.dispatchEvent(new Event("bb:workspace"));
    return true;
  } catch { return false; }
}
export function updateCamp(id: string, patch: Partial<CampUpdate>, activity?: string) {
  return changeDemo((state) => ({ ...state, camps: { ...state.camps, [id]: { ...state.camps[id], ...patch } } }), activity);
}
export function localDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}
export const sampleCakeDate = cakeStoryDate;
export function prettyTime(value: string) {
  return new Intl.DateTimeFormat("en-PH", { timeZone: "Asia/Manila", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value));
}

/** A small browser-local preview, never an upload to a server. */
export async function preparePhoto(file: File): Promise<string> {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) throw new Error("Choose a JPG, PNG, or WebP photo.");
  if (file.size > 8 * 1024 * 1024) throw new Error("Choose a photo smaller than 8 MB.");
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, 900 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Your browser could not prepare this photo.");
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", .72);
  } finally { bitmap.close(); }
}
