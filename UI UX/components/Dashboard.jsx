"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import Timeline from "@/components/Timeline";
import TaskChecklist from "@/components/TaskChecklist";
import DatingHub from "@/components/DatingHub";
import WellnessCard from "@/components/WellnessCard";
import { INITIAL_EVENTS, INITIAL_TASKS, WELLNESS } from "@/lib/mockData";
import { parseQuickAdd } from "@/lib/schedule";

export default function Dashboard() {
  const [section, setSection] = useState("schedule");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [category, setCategory] = useState("all");
  const [cups, setCups] = useState(5);
  const [toast, setToast] = useState(null);

  function notify(message) {
    if (focusMode && /proposal|date|meetup|tea/i.test(message)) {
      setToast("Focus Mode on — social pings muted.");
    } else {
      setToast(message);
    }
    window.clearTimeout(notify._t);
    notify._t = window.setTimeout(() => setToast(null), 3200);
  }

  function addEvent(event) {
    setEvents((prev) => [...prev, event]);
    setSection("schedule");
    notify(`Added: ${event.title} (${event.start}–${event.end})`);
  }

  function onQuickAdd(text) {
    const parsed = parseQuickAdd(text);
    if (!parsed) return;
    addEvent(parsed);
  }

  function onScheduleMeet(name, start, end, title) {
    addEvent({
      id: `meet-${Date.now()}`,
      title,
      start,
      end,
      category: "social",
      kind: "social",
      location: "Colombo",
    });
  }

  function onAddWorkout() {
    const exists = events.some((e) => e.title.includes(WELLNESS.workout.title));
    if (exists) {
      notify("Leg Day is already on the calendar.");
      return;
    }
    addEvent({
      id: "gym-leg",
      title: `${WELLNESS.workout.title} · Gym`,
      start: WELLNESS.workout.time,
      end: "20:00",
      category: "health",
      kind: "health",
      location: WELLNESS.workout.place,
    });
  }

  let view = <Timeline events={events} category={category} onCategory={setCategory} />;
  if (section === "tasks") {
    view = (
      <TaskChecklist
        tasks={tasks}
        onToggle={(id) =>
          setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
        }
      />
    );
  } else if (section === "dating") {
    view = <DatingHub events={events} onScheduleMeet={onScheduleMeet} toast={notify} />;
  } else if (section === "wellness") {
    view = (
      <WellnessCard
        cups={cups}
        onCups={(d) => setCups((c) => Math.max(0, Math.min(16, c + d)))}
        onAddWorkout={onAddWorkout}
        showAnalytics={false}
      />
    );
  } else if (section === "analytics") {
    view = (
      <WellnessCard
        cups={cups}
        onCups={(d) => setCups((c) => Math.max(0, Math.min(16, c + d)))}
        onAddWorkout={onAddWorkout}
        showAnalytics
      />
    );
  }

  return (
    <div className="shell">
      <Sidebar
        active={section}
        open={sidebarOpen}
        onNavigate={(id) => {
          setSection(id);
          setSidebarOpen(false);
        }}
      />
      <div className="main-wrap">
        <TopBar
          focusMode={focusMode}
          onToggleFocus={() => {
            setFocusMode((v) => !v);
            notify(!focusMode ? "Focus Mode — notifications muted." : "Focus Mode off.");
          }}
          onQuickAdd={onQuickAdd}
          onMenu={() => setSidebarOpen((v) => !v)}
        />
        <main className="content container-fluid">
          {view}
        </main>
      </div>
      {sidebarOpen && (
        <div
          className="d-lg-none position-fixed top-0 start-0 w-100 h-100"
          style={{ background: "rgba(15,23,42,.35)", zIndex: 30 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {toast && <div className="toast-lite">{toast}</div>}
    </div>
  );
}
