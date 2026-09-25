"use client";

import { useState } from "react";
import { BellOff, Bell, Menu, Share2, Plus, Sparkles } from "lucide-react";
import { PROFILE } from "@/lib/mockData";

export default function TopBar({
  focusMode,
  onToggleFocus,
  onQuickAdd,
  onMenu,
}) {
  const [value, setValue] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareUrl = "https://asiri.internal/schedules/sashes-lakshan?view=readonly";

  function submit(e) {
    e.preventDefault();
    if (!value.trim()) return;
    onQuickAdd(value);
    setValue("");
  }

  function copy() {
    navigator.clipboard?.writeText(shareUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <>
      <header className={`topbar ${focusMode ? "focus-on" : ""}`}>
        <div className="d-flex flex-wrap align-items-center gap-2 gap-lg-3">
          <button type="button" className="btn btn-light mobile-toggle" onClick={onMenu} aria-label="Open menu">
            <Menu size={18} />
          </button>

          <div className="ticker">
            <span className="dot-live" />
            Hospital Shift: {PROFILE.shift} <span className="opacity-50">|</span> On-Call Status: {PROFILE.onCall}
            {focusMode && (
              <span className="badge rounded-pill ms-1" style={{ background: "#f59e0b", color: "#111827" }}>
                Focus
              </span>
            )}
          </div>

          <div className="ms-lg-auto d-flex align-items-center gap-2 flex-wrap">
            <div className={`focus-switch ${focusMode ? "active" : ""}`}>
              <div className="form-check form-switch m-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="focusMode"
                  checked={focusMode}
                  onChange={onToggleFocus}
                />
              </div>
              {focusMode ? <BellOff size={15} /> : <Bell size={15} />}
              <label htmlFor="focusMode" className="mb-0 small fw-semibold">
                Focus Mode
              </label>
            </div>

            <button type="button" className="btn btn-outline-dark btn-sm rounded-pill" onClick={() => setShareOpen(true)}>
              <Share2 size={14} className="me-1" />
              Share Schedule
            </button>
          </div>
        </div>

        <form className="quick-add mt-3" onSubmit={submit}>
          <Sparkles size={16} color="#0d9488" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type 'Gym at 6pm tomorrow' or 'Tea date with Amasha Saturday'..."
          />
          <button type="submit" className="btn btn-teal btn-sm rounded-pill px-3">
            <Plus size={14} className="me-1" />
            Add
          </button>
        </form>
      </header>

      {shareOpen && (
        <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(15,23,42,.45)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: 18, border: 0, boxShadow: "0 12px 40px rgba(15,23,42,.18)" }}>
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">Share view-only schedule</h5>
                <button type="button" className="btn-close" onClick={() => setShareOpen(false)} />
              </div>
              <div className="modal-body">
                <p className="muted mb-3">
                  Generate a read-only link for family or the on-call roster. No edit access.
                </p>
                <div className="share-link mb-3">{shareUrl}</div>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge rounded-pill text-bg-light border">
                    <i className="bi bi-google me-1" />
                    Google Calendar sync
                  </span>
                  <span className="badge rounded-pill" style={{ background: "#ecfdf5", color: "#047857" }}>
                    Connected
                  </span>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-outline-secondary rounded-pill" onClick={() => setShareOpen(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-teal rounded-pill" onClick={copy}>
                  {copied ? "Copied" : "Copy link"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
