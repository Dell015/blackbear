"use client";
import { useSyncExternalStore } from "react";
import { branches, cakeStory, cakeStoryDate } from "./data";

export type CampUpdate = {
  cakes: string[];
  updated: string | null;
  soldOut: string[];
  note: string;
  hoursDraft: string;
  featuredPhoto?: string;
  specialTitle?: string;
  specialDescription?: string;
  eventTitle?: string;
  eventDescription?: string;
  eventWhen?: string;
};
export type CampPhoto = {
  id: string;
  src: string;
  caption: string;
  author: string;
  branch: string;
  approved: boolean;
  winner: boolean;
  created: string;
};
export type CrewProfile = {
  id: string;
  name: string;
  branch: string;
  specialty: string;
  onDuty: boolean;
};
export type DemoState = {
  version: 1;
  camps: Record<string, CampUpdate>;
  stamps: number;
  rewardHistory: string[];
  favoriteCrew: string | null;
  savedPicks: string[];
  crew: CrewProfile[];
  photos: CampPhoto[];
  activity: { id: string; text: string; time: string }[];
};
export const demoInitial: DemoState = {
  version: 1,
  camps: Object.fromEntries(
    branches.map((branch) => [
      branch.id,
      {
        cakes: cakeStory[branch.id] ?? [],
        updated: null,
        soldOut: [],
        note: "",
        hoursDraft: "",
      },
    ]),
  ),
  stamps: 0,
  rewardHistory: [],
  favoriteCrew: null,
  savedPicks: [],
  crew: [
    {
      id: "crew-1",
      name: "Alex · demo profile",
      branch: "cauayan-d1",
      specialty: "Coffee & latte art",
      onDuty: true,
    },
    {
      id: "crew-2",
      name: "Sam · demo profile",
      branch: "santiago",
      specialty: "Matcha & late-night brews",
      onDuty: false,
    },
    {
      id: "crew-3",
      name: "Kai · demo profile",
      branch: "cauayan-sf",
      specialty: "Brunch & cake pairings",
      onDuty: true,
    },
  ],
  photos: [],
  activity: [],
};
/** First visit: a lived-in demo (dates relative to today) so the owner sees the
 * workspace in action. Seed ids start with "seed-". Visitors' own changes replace it. */
function seededState(): DemoState {
  const today = localDate();
  const ago = (h: number) => new Date(Date.now() - h * 3600_000).toISOString();
  return {
    ...demoInitial,
    camps: {
      ...demoInitial.camps,
      "cauayan-d1": { ...demoInitial.camps["cauayan-d1"], updated: today, note: "Fresh Biscoff Cheesecake just came out of the chiller." },
      santiago: {
        ...demoInitial.camps.santiago,
        updated: today,
        soldOut: ["Matcha Series::Matcha Ube"],
        note: "Open all night. Matcha Ube is back tomorrow morning.",
      },
    },
    photos: [
      {
        id: "seed-photo-1",
        src: "/img/coffee-iced-latte-outdoor-480.webp",
        caption: "Iced latte on a sunny Saturday",
        author: "Demo guest",
        branch: "cauayan-d1",
        approved: false,
        winner: false,
        created: ago(2),
      },
    ],
    activity: [
      { id: "seed-act-1", text: "Santiago City marked Matcha Ube unavailable for today", time: ago(1) },
      { id: "seed-act-3", text: "A customer photo is waiting for review", time: ago(2) },
      { id: "seed-act-2", text: "Cauayan District 1 reviewed today's cake lineup", time: ago(3) },
    ],
  };
}
const key = "bb-workspace-v1";
let cached = demoInitial;
let lastRaw: string | null | undefined;
function snapshot(): DemoState {
  if (typeof window === "undefined") return demoInitial;
  try {
    const raw = localStorage.getItem(key);
    if (raw !== lastRaw) {
      lastRaw = raw;
      if (!raw) {
        cached = seededState();
        return cached;
      }
      const value = JSON.parse(raw);
      cached =
        value?.version === 1 &&
        value.camps &&
        Array.isArray(value.crew) &&
        Array.isArray(value.photos)
          ? {
              ...demoInitial,
              ...value,
              camps: { ...demoInitial.camps, ...value.camps },
            }
          : demoInitial;
    }
  } catch {
    /* Use the in-memory session when browser storage is unavailable. */
  }
  return cached;
}
function subscribe(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener("bb:workspace", listener);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("bb:workspace", listener);
  };
}
export const useDemo = () =>
  useSyncExternalStore(subscribe, snapshot, () => demoInitial);
export function changeDemo(
  change: (state: DemoState) => DemoState,
  activity?: string,
): boolean {
  const current = snapshot();
  const next = change(current);
  if (activity)
    next.activity = [
      {
        id: crypto.randomUUID(),
        text: activity,
        time: new Date().toISOString(),
      },
      ...current.activity,
    ].slice(0, 30);
  try {
    const raw = JSON.stringify(next);
    localStorage.setItem(key, raw);
    lastRaw = raw;
    cached = next;
    window.dispatchEvent(new Event("bb:workspace"));
    return true;
  } catch {
    return false;
  }
}
export function updateCamp(
  id: string,
  patch: Partial<CampUpdate>,
  activity?: string,
) {
  return changeDemo(
    (state) => ({
      ...state,
      camps: { ...state.camps, [id]: { ...state.camps[id], ...patch } },
    }),
    activity,
  );
}
export function localDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
export const sampleCakeDate = cakeStoryDate;
/** "2026-11-17" -> "November 17, 2026" (Philippine calendar date, no timezone drift). */
export function prettyDate(ymd: string, month: "long" | "short" = "long") {
  const [y, m, d] = ymd.split("-").map(Number);
  if (!y || !m || !d) return ymd;
  return new Intl.DateTimeFormat("en-PH", { year: "numeric", month, day: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, d)));
}
export function prettyTime(value: string) {
  return new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

/** A small browser-local preview, never an upload to a server. */
export async function preparePhoto(file: File): Promise<string> {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type))
    throw new Error("Choose a JPG, PNG, or WebP photo.");
  if (file.size > 8 * 1024 * 1024)
    throw new Error("Choose a photo smaller than 8 MB.");
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, 900 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Your browser could not prepare this photo.");
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.72);
  } finally {
    bitmap.close();
  }
}
