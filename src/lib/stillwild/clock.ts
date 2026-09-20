export interface Clock {
  wallMs(): number;
  monotonicMs(): number;
  gameDay(ms: number): string;
}

export function localGameDay(ms: number): string {
  const d = new Date(ms);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export const systemClock: Clock = {
  wallMs: () => Date.now(),
  monotonicMs: () => (typeof performance !== "undefined" ? performance.now() : Date.now()),
  gameDay: localGameDay,
};

export function formatDayLabel(day: string): string {
  const [y, m, d] = day.split("-").map(Number);
  if (!y || !m || !d) return day;
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function sevenDaysBack(today: string): string[] {
  const [y, m, d] = today.split("-").map(Number);
  const start = new Date(y, m - 1, d);
  const days: string[] = [];
  for (let i = 6; i >= 0; i -= 1) {
    const dt = new Date(start);
    dt.setDate(start.getDate() - i);
    days.push(localGameDay(dt.getTime()));
  }
  return days;
}
