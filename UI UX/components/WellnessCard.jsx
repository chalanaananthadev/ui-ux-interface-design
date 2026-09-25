"use client";

import { WELLNESS } from "@/lib/mockData";
import { Droplets, Moon, Dumbbell } from "lucide-react";

export default function WellnessCard({ cups, onCups, onAddWorkout, showAnalytics }) {
  const total = WELLNESS.timeSplit.reduce((s, x) => s + x.value, 0);
  let acc = 0;
  const stops = WELLNESS.timeSplit.map((s) => {
    const start = acc;
    acc += (s.value / total) * 100;
    return `${s.color} ${start}% ${acc}%`;
  });

  return (
    <section>
      <div className="mb-3">
        <p className="kicker">Module 4</p>
        <h2 className="section-title h4">Wellbeing, Habits &amp; Analytics</h2>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <div className="metric">
            <div className="d-flex align-items-center gap-2 mb-2">
              <Moon size={18} color="#64748b" />
              <strong>Sleep Tracker</strong>
            </div>
            <div className="display-6 fw-bold" style={{ fontSize: "1.8rem" }}>
              {WELLNESS.sleep.duration}
            </div>
            <p className="muted mb-0">
              Bedtime {WELLNESS.sleep.bedtime} · Wake-up {WELLNESS.sleep.wake}
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="metric">
            <div className="d-flex align-items-center gap-2 mb-2">
              <Droplets size={18} color="#0ea5e9" />
              <strong>Water Tracker</strong>
            </div>
            <div className="d-flex align-items-center gap-3">
              <button type="button" className="water-btn" onClick={() => onCups(-1)} aria-label="Decrease cups">
                −
              </button>
              <div>
                <div className="fw-bold" style={{ fontSize: "1.6rem", lineHeight: 1 }}>
                  {cups}
                </div>
                <div className="muted">cups today</div>
              </div>
              <button type="button" className="water-btn" onClick={() => onCups(1)} aria-label="Increase cups">
                +
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="metric">
            <div className="d-flex align-items-center gap-2 mb-2">
              <Dumbbell size={18} color="#10b981" />
              <strong>Workout</strong>
            </div>
            <div className="fw-bold">{WELLNESS.workout.title} — {WELLNESS.workout.time}</div>
            <p className="muted mb-2">{WELLNESS.workout.place}</p>
            <button type="button" className="btn btn-sm btn-outline-success rounded-pill" onClick={onAddWorkout}>
              Link to calendar
            </button>
          </div>
        </div>
      </div>

      {showAnalytics && (
        <div className="card-soft p-4">
          <h6 className="mb-3">Time distribution</h6>
          <div className="row align-items-center">
            <div className="col-sm-auto mb-3 mb-sm-0">
              <div
                className="donut"
                style={{ background: `conic-gradient(${stops.join(",")})` }}
              >
                <div className="donut-hole">24h</div>
              </div>
            </div>
            <div className="col">
              {WELLNESS.timeSplit.map((s) => (
                <div key={s.label} className="d-flex justify-content-between py-1">
                  <span>
                    <span className="legend-dot" style={{ background: s.color }} />
                    {s.label}
                  </span>
                  <strong>{s.value}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
