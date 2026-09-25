"use client";

import { CATEGORIES } from "@/lib/mockData";
import { bestGap, fromMinutes, overlaps, toMinutes } from "@/lib/schedule";
import { Clock, Filter } from "lucide-react";

const HOURS = Array.from({ length: 18 }, (_, i) => i + 6);
const HOUR_H = 72;

function slotStyle(event, events) {
  const top = ((toMinutes(event.start) - 6 * 60) / 60) * HOUR_H;
  const durationH = ((toMinutes(event.end) - toMinutes(event.start)) / 60) * HOUR_H;
  const height = Math.max(durationH, 72);
  const sitsOnShift =
    event.kind !== "shift" &&
    events.some(
      (other) =>
        other.kind === "shift" &&
        other.id !== event.id &&
        overlaps(other.start, other.end, event.start, event.end)
    );

  if (event.kind === "shift") {
    return { top, height, width: "34%", right: "auto" };
  }
  if (sitsOnShift) {
    return { top, height, left: "calc(4.85rem + 36%)" };
  }
  return { top, height };
}

export default function Timeline({ events, category, onCategory }) {
  const filtered =
    category === "all" ? events : events.filter((e) => e.category === category);
  const gap = bestGap(events);
  const hours = gap ? ((gap.end - gap.start) / 60).toFixed(1).replace(/\.0$/, "") : "0";

  return (
    <section>
      <div className="mb-3">
        <p className="kicker">Module 1</p>
        <h2 className="section-title h4 mb-2">Daily Schedule &amp; Smart Free-Time Finder</h2>
        <div className="d-flex flex-wrap gap-1">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`filter-chip ${category === c.id ? "active" : ""}`}
              onClick={() => onCategory(c.id)}
            >
              {c.id === "all" && <Filter size={12} className="me-1" />}
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="free-banner mb-3 d-flex gap-3 align-items-start">
        <div
          className="rounded-circle"
          style={{
            width: 42,
            height: 42,
            background: "#fff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <Clock size={18} color="#0d9488" />
        </div>
        <div>
          <div className="fw-bold">Free Time Finder</div>
          {gap ? (
            <p className="mb-0 muted">
              You have a {hours} hr free gap today between {fromMinutes(gap.start)} – {fromMinutes(gap.end)}{" "}
              (Perfect for gym or a coffee date!)
            </p>
          ) : (
            <p className="mb-0 muted">No substantial gaps today — your roster is packed.</p>
          )}
        </div>
      </div>

      <div className="card-soft p-3 p-md-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <strong>Hourly timeline · 06:00 – 23:00</strong>
          <div className="d-flex flex-wrap gap-2 small">
            <span className="badge rounded-pill" style={{ background: "#2563eb" }}>
              Hospital Shift
            </span>
            <span className="badge rounded-pill" style={{ background: "#ea580c" }}>
              IT Maintenance
            </span>
            <span className="badge rounded-pill" style={{ background: "#1d4ed8" }}>
              Admin / Servers
            </span>
            <span className="badge rounded-pill" style={{ background: "#10b981" }}>
              Personal / Gym
            </span>
          </div>
        </div>

        <div className="timeline" style={{ height: 18 * HOUR_H }}>
          {HOURS.map((h) => (
            <div key={h} className="hour-row">
              <div className="hour-label">{String(h).padStart(2, "0")}:00</div>
            </div>
          ))}
          {filtered.map((event) => (
            <div key={event.id} className={`slot ${event.kind}`} style={slotStyle(event, filtered)}>
              <span className="slot-title">{event.title}</span>
              <span className="slot-meta">
                {event.start} – {event.end} · {event.location}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
