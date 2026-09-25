export function toMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function fromMinutes(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function findFreeGaps(events, dayStart = 6 * 60, dayEnd = 23 * 60) {
  const sorted = [...events]
    .map((e) => ({ start: toMinutes(e.start), end: toMinutes(e.end) }))
    .sort((a, b) => a.start - b.start);

  const gaps = [];
  let cursor = dayStart;
  for (const ev of sorted) {
    if (ev.start > cursor) {
      gaps.push({ start: cursor, end: ev.start });
    }
    cursor = Math.max(cursor, ev.end);
  }
  if (cursor < dayEnd) gaps.push({ start: cursor, end: dayEnd });
  return gaps.filter((g) => g.end - g.start >= 30);
}

export function bestGap(events) {
  const gaps = findFreeGaps(events);
  if (!gaps.length) return null;
  return gaps.reduce((a, b) => (b.end - b.start > a.end - a.start ? b : a));
}

export function overlaps(aStart, aEnd, bStart, bEnd) {
  return toMinutes(aStart) < toMinutes(bEnd) && toMinutes(aEnd) > toMinutes(bStart);
}

export function hasConflict(events, start, end) {
  return events.some((e) => overlaps(e.start, e.end, start, end));
}

export function parseQuickAdd(text) {
  const raw = text.trim();
  if (!raw) return null;

  const lower = raw.toLowerCase();
  let category = "personal";
  let kind = "personal";
  if (/gym|workout|run|yoga|protein/.test(lower)) {
    category = "health";
    kind = "health";
  } else if (/date|tea|coffee|meet|proposal|amasha|dinner/.test(lower)) {
    category = "social";
    kind = "social";
  } else if (/server|firewall|hospital|patch|backup|it |switch/.test(lower)) {
    category = "work";
    kind = /maint|patch|firewall/.test(lower) ? "maintenance" : "admin";
  }

  let start = "18:00";
  const ampm = lower.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/);
  const hhmm = lower.match(/\b(\d{1,2}):(\d{2})\b/);
  if (ampm) {
    let h = Number(ampm[1]);
    const m = Number(ampm[2] || 0);
    const mer = ampm[3];
    if (mer === "pm" && h < 12) h += 12;
    if (mer === "am" && h === 12) h = 0;
    start = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  } else if (hhmm) {
    start = `${String(hhmm[1]).padStart(2, "0")}:${hhmm[2]}`;
  }

  const startM = toMinutes(start);
  const end = fromMinutes(Math.min(startM + 90, 23 * 60));
  const whenNote = /tomorrow/.test(lower)
    ? "Tomorrow"
    : /saturday|sat\b/.test(lower)
      ? "Saturday"
      : "Today";

  return {
    id: `e-${Date.now()}`,
    title: raw.replace(/^add\s+/i, ""),
    start,
    end,
    category,
    kind,
    location: whenNote,
  };
}
