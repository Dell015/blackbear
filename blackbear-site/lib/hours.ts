import type { Branch } from "./data";

export type Status = { kind: "open" | "closed" | "unknown"; label: string; detail?: string };

/** Current time in the Philippines, independent of the visitor's device timezone. */
export function manilaNow(d = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return { day: days.indexOf(get("weekday")), minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

const toMin = (s: string) => {
  const [h, m] = s.split(":").map(Number);
  return h * 60 + m;
};

export function fmt(s: string) {
  let m = toMin(s) % (24 * 60);
  const h = Math.floor(m / 60);
  m = m % 60;
  const ap = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${h12}:${String(m).padStart(2, "0")} ${ap}` : `${h12} ${ap}`;
}

export function hoursText(b: Branch): string {
  if (b.hours === "24/7") return "Open 24 hours, every day";
  if (!b.hours) return "To confirm";
  return b.hours
    .map((h) => {
      const days = h.days ? dayRange(h.days) : "Daily";
      return `${days} ${fmt(h.open)} to ${fmt(h.close)}`;
    })
    .join(" · ");
}

function dayRange(days: number[]) {
  const n = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  if (days.length === 1) return n[days[0]];
  return `${n[days[0]]}–${n[days[days.length - 1]]}`;
}

export function statusOf(b: Branch, now = manilaNow()): Status {
  if (b.hours === "24/7") return { kind: "open", label: "Open 24/7" };
  if (!b.hours) return { kind: "unknown", label: "Hours to confirm" };
  const { day, minutes } = now;
  const prevDay = (day + 6) % 7;
  for (const h of b.hours) {
    const o = toMin(h.open);
    const c = toMin(h.close);
    const appliesToday = !h.days || h.days.includes(day);
    const appliesPrev = !h.days || h.days.includes(prevDay);
    if (appliesToday && minutes >= o && minutes < c) return { kind: "open", label: "Open now", detail: `until ${fmt(h.close)}` };
    // spill-over past midnight from yesterday's slot
    if (appliesPrev && c > 1440 && minutes < c - 1440) return { kind: "open", label: "Open now", detail: `until ${fmt(h.close)}` };
  }
  const today = b.hours.find((h) => !h.days || h.days.includes(day));
  if (today && minutes < toMin(today.open)) return { kind: "closed", label: "Closed", detail: `opens ${fmt(today.open)}` };
  const tomorrow = b.hours.find((h) => !h.days || h.days.includes((day + 1) % 7));
  return { kind: "closed", label: "Closed", detail: tomorrow ? `opens ${fmt(tomorrow.open)}` : undefined };
}
