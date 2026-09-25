"use client";

export default function TaskChecklist({ tasks, onToggle }) {
  const groups = [
    { id: "urgent", title: "Urgent / Critical", hint: "Hospital systems first" },
    { id: "normal", title: "Normal", hint: "Department tickets" },
    { id: "low", title: "Low / Personal", hint: "Life admin" },
  ];

  const done = tasks.filter((t) => t.done).length;
  const pct = Math.round((done / tasks.length) * 100);

  return (
    <section>
      <div className="mb-3">
        <div>
          <p className="kicker">Module 2</p>
          <h2 className="section-title h4">Sysadmin Task Checklist</h2>
        </div>
        <div className="mt-2" style={{ maxWidth: 280 }}>
          <div className="d-flex justify-content-between small mb-1">
            <span className="muted">Live completion</span>
            <strong>
              {done}/{tasks.length} · {pct}%
            </strong>
          </div>
          <div className="progress-slim">
            <span style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div className="row g-3">
        {groups.map((g) => (
          <div className="col-lg-4" key={g.id}>
            <div className="card-soft p-3 h-100">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h6 className="mb-0">{g.title}</h6>
                  <span className="muted">{g.hint}</span>
                </div>
                <span
                  className="badge rounded-pill"
                  style={{
                    background: g.id === "urgent" ? "#ffe4e6" : g.id === "normal" ? "#dbeafe" : "#fef3c7",
                    color: g.id === "urgent" ? "#9f1239" : g.id === "normal" ? "#1e40af" : "#92400e",
                  }}
                >
                  {tasks.filter((t) => t.priority === g.id).length}
                </span>
              </div>
              {tasks
                .filter((t) => t.priority === g.id)
                .map((task) => (
                  <label key={task.id} className={`task-item priority-${task.priority} ${task.done ? "done" : ""} d-flex gap-2`}>
                    <input
                      type="checkbox"
                      className="form-check-input mt-1"
                      checked={task.done}
                      onChange={() => onToggle(task.id)}
                    />
                    <span className="min-w-0">
                      <h6 className="mb-1" style={{ fontSize: "0.92rem", lineHeight: 1.35 }}>
                        {task.title}
                      </h6>
                      <p className="muted mb-0" style={{ fontSize: "0.8rem", lineHeight: 1.45 }}>
                        {task.detail}
                      </p>
                    </span>
                  </label>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
