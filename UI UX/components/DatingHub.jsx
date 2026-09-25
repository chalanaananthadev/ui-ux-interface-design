"use client";

import { useState } from "react";
import { DATES, PROPOSALS } from "@/lib/mockData";
import { hasConflict } from "@/lib/schedule";
import { CalendarHeart, Heart, MapPin } from "lucide-react";

export default function DatingHub({ events, onScheduleMeet, toast }) {
  const [tab, setTab] = useState("proposals");
  const [proposals, setProposals] = useState(PROPOSALS);

  function setStatus(id, status) {
    setProposals((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  }

  return (
    <section>
      <div className="mb-3">
        <p className="kicker">Module 3 · Lakshan&apos;s Matchmaker</p>
        <h2 className="section-title h4 mb-2">Dating &amp; Marriage Proposals Hub</h2>
        <div className="d-flex flex-wrap gap-1">
          <button
            className={`filter-chip ${tab === "proposals" ? "active" : ""}`}
            type="button"
            onClick={() => setTab("proposals")}
          >
            Matrimonial
          </button>
          <button
            className={`filter-chip ${tab === "dating" ? "active" : ""}`}
            type="button"
            onClick={() => setTab("dating")}
          >
            Dating &amp; Meetups
          </button>
        </div>
      </div>

      {tab === "proposals" && (
        <div className="row g-3">
          {proposals.map((p) => (
            <div className="col-md-6 col-xl-4" key={p.id}>
              <article className="card-soft p-3 h-100">
                <img src={p.photo} alt={p.name} className="person-photo mb-3" />
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="mb-0" style={{ fontWeight: 700, lineHeight: 1.3 }}>
                      {p.name}
                    </h5>
                    <div className="muted">
                      {p.age} · {p.profession}
                    </div>
                  </div>
                  {p.status !== "new" && (
                    <span className="badge rounded-pill" style={{ background: p.status === "shortlist" ? "#ecfdf5" : "#f1f5f9", color: "#0f172a" }}>
                      {p.status}
                    </span>
                  )}
                </div>
                <div className="mt-2 d-flex flex-wrap gap-1">
                  <span className="badge rounded-pill" style={{ background: "#fff7ed", color: "#9a3412" }}>
                    {p.compatibility}
                  </span>
                  <span className="badge rounded-pill" style={{ background: "#ecfeff", color: "#0e7490" }}>
                    <MapPin size={11} className="me-1" />
                    {p.location}
                  </span>
                </div>
                <p className="small mt-3 mb-1">
                  <strong>Family:</strong> {p.family}
                </p>
                <p className="muted small">{p.notes}</p>
                <div className="d-flex flex-wrap gap-2 mt-3">
                  <button
                    type="button"
                    className="btn btn-teal btn-sm rounded-pill"
                    onClick={() => onScheduleMeet(p.name, "17:45", "19:15", `Tea meet with ${p.name}`)}
                  >
                    <CalendarHeart size={14} className="me-1" />
                    Schedule Tea Meet
                  </button>
                  <button type="button" className="btn btn-outline-success btn-sm rounded-pill" onClick={() => setStatus(p.id, "shortlist")}>
                    Shortlist
                  </button>
                  <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill" onClick={() => setStatus(p.id, "passed")}>
                    Pass
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}

      {tab === "dating" && (
        <div className="row g-3">
          {DATES.map((d) => {
            const conflict = hasConflict(events, d.proposed.start, d.proposed.end);
            return (
              <div className="col-md-6 col-xl-4" key={d.id}>
                <article className="card-soft p-3 h-100">
                  <img src={d.photo} alt={d.name} className="person-photo mb-3" />
                  <h5 className="mb-0" style={{ fontWeight: 700, lineHeight: 1.3 }}>
                    {d.name}, {d.age}
                  </h5>
                  <div className="muted mb-2">{d.vibe}</div>
                  <div className="d-flex flex-wrap gap-1 mb-2">
                    {d.interests.map((i) => (
                      <span key={i} className="badge rounded-pill text-bg-light border">
                        {i}
                      </span>
                    ))}
                  </div>
                  <div className="p-2 rounded-3 mb-3" style={{ background: "#f8fafc" }}>
                    <span className="small fw-semibold" style={{ color: "#0d9488" }}>
                      Icebreaker
                    </span>
                    <p className="mb-0 small">{d.icebreaker}</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-dark w-100 rounded-pill"
                    onClick={() => {
                      if (conflict) {
                        toast(`No overlap — ${d.proposed.start}–${d.proposed.end} clashes with your roster.`);
                      } else {
                        onScheduleMeet(d.name, d.proposed.start, d.proposed.end, `Meetup with ${d.name}`);
                        toast(`Free-time overlap found with ${d.name}: ${d.proposed.start}–${d.proposed.end}`);
                      }
                    }}
                  >
                    <Heart size={14} className="me-1" />
                    Find Overlapping Free Time
                  </button>
                </article>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
