"use client";

import { CalendarClock, Heart, LayoutDashboard, Sparkles, BarChart3, MapPin } from "lucide-react";
import { PROFILE } from "@/lib/mockData";

const ITEMS = [
  { id: "schedule", label: "Daily Schedule & Timeline", icon: CalendarClock },
  { id: "tasks", label: "Productivity & Hospital Tasks", icon: LayoutDashboard },
  { id: "dating", label: "Marriage Proposals & Dating Hub", icon: Heart },
  { id: "wellness", label: "Wellness & Habits (Gym/Sleep)", icon: Sparkles },
  { id: "analytics", label: "Time Analytics", icon: BarChart3 },
];

export default function Sidebar({ active, onNavigate, open }) {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="brand-mark">
        <div className="brand-logo">SL</div>
        <div className="brand-copy">
          <strong>Command Center</strong>
          <small>Asiri · Colombo</small>
        </div>
      </div>

      <div className="profile-card">
        <div className="d-flex align-items-start gap-3">
          <div className="avatar flex-shrink-0">{PROFILE.initials}</div>
          <div className="profile-copy">
            <p className="profile-name">{PROFILE.name}</p>
            <p className="profile-title">{PROFILE.title}</p>
          </div>
        </div>
        <span className="badge rounded-pill mt-3" style={{ background: "rgba(34,211,238,.18)", color: "#67e8f9" }}>
          <MapPin size={12} className="me-1" />
          {PROFILE.location}
        </span>
      </div>

      <nav>
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              className={`nav-link-item ${active === item.id ? "active" : ""}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-ico">
                <Icon size={16} />
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-4">
        <div className="muted" style={{ color: "#94a3b8", fontSize: "0.75rem" }}>
          On-call rotation · Week 39
          <br />
          HIS cluster healthy
        </div>
      </div>
    </aside>
  );
}
