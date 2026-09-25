export const PROFILE = {
  name: "Sashes Lakshan",
  title: "System Admin · Asiri Hospital",
  location: "Colombo",
  initials: "SL",
  shift: "08:00 - 17:00",
  onCall: "Active",
};

export const INITIAL_EVENTS = [
  {
    id: "e1",
    title: "Hospital Shift — Asiri Colombo",
    start: "08:00",
    end: "17:00",
    category: "work",
    kind: "shift",
    location: "Asiri Hospital, Colombo 05",
  },
  {
    id: "e2",
    title: "IT Maintenance Window",
    start: "10:15",
    end: "11:00",
    category: "work",
    kind: "maintenance",
    location: "Server Room B",
  },
  {
    id: "e3",
    title: "Routine Admin & Server Checks",
    start: "14:00",
    end: "14:40",
    category: "work",
    kind: "admin",
    location: "NOC Desk",
  },
  {
    id: "e4",
    title: "Shift Handover Notes",
    start: "17:00",
    end: "17:30",
    category: "work",
    kind: "admin",
    location: "IT Office",
  },
  {
    id: "e5",
    title: "Family dinner (home)",
    start: "20:15",
    end: "21:00",
    category: "personal",
    kind: "personal",
    location: "Nugegoda",
  },
];

export const INITIAL_TASKS = [
  {
    id: "t1",
    title: "Review Asiri Hospital Server Backup Logs",
    detail: "Overnight Veeam job on HIS cluster — verify 03:12 snapshot.",
    priority: "urgent",
    done: false,
  },
  {
    id: "t2",
    title: "Firewall Patch — Perimeter FW-02",
    detail: "Apply vendor advisory ASA-2026-09 during maintenance slot.",
    priority: "urgent",
    done: false,
  },
  {
    id: "t3",
    title: "Replace Switch in Radiology Dept",
    detail: "Cisco C9200 on floor 3 — spare boxed in stores.",
    priority: "normal",
    done: false,
  },
  {
    id: "t4",
    title: "Reset PACS workstation tickets",
    detail: "Three pending Helpdesk items from night shift.",
    priority: "normal",
    done: true,
  },
  {
    id: "t5",
    title: "Protein shake restock",
    detail: "Whey isolate — Healthguard or Keells.",
    priority: "low",
    done: false,
  },
  {
    id: "t6",
    title: "Reply to Aunty's proposal message",
    detail: "Amasha's profile from the Matara introduction.",
    priority: "low",
    done: false,
  },
];

export const PROPOSALS = [
  {
    id: "p1",
    name: "Amasha Fernando",
    age: 28,
    profession: "Clinical Pharmacist",
    location: "Colombo 05",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    compatibility: "Horoscope: Strong · Govi",
    family: "Catholic family; parents in Dehiwala. Elder sister married.",
    notes: "Introduced via Aunty Nirmala. Prefers tea meet before formal visit.",
    status: "new",
  },
  {
    id: "p2",
    name: "Nethmi Jayawardena",
    age: 30,
    profession: "Chartered Accountant",
    location: "Rajagiriya",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    compatibility: "Horoscope: Compatible · Karava",
    family: "Only daughter; father retired bank manager.",
    notes: "Looking for a grounded professional. Open to Colombo-based life.",
    status: "new",
  },
  {
    id: "p3",
    name: "Sachini Perera",
    age: 27,
    profession: "UX Designer · Fintech",
    location: "Battaramulla",
    photo:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
    compatibility: "Horoscope: Review pending",
    family: "Colombo 07; both parents in medicine.",
    notes: "Shared gym interest. Prefers low-key first conversation.",
    status: "new",
  },
];

export const DATES = [
  {
    id: "d1",
    name: "Kavindi Silva",
    age: 26,
    vibe: "Weekend coffee + city walk",
    interests: ["Specialty coffee", "Trail running", "Indie film"],
    icebreaker: "If we had 90 free minutes tonight, beach or bookstore?",
    photo:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop",
    proposed: { start: "18:00", end: "19:30" },
  },
  {
    id: "d2",
    name: "Ruwani de Alwis",
    age: 29,
    vibe: "After-work rooftop, low pressure",
    interests: ["Jazz playlists", "Sri Lankan food tours", "Yoga"],
    icebreaker: "What's the one hospital story you'd never tell at dinner?",
    photo:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    proposed: { start: "19:00", end: "21:00" },
  },
  {
    id: "d3",
    name: "Ishara Mendis",
    age: 27,
    vibe: "Saturday gallery + gelato",
    interests: ["Photography", "Strength training", "Travel"],
    icebreaker: "Gym playlist or silence — which camp are you in?",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    proposed: { start: "16:00", end: "18:00" },
  },
];

export const WELLNESS = {
  sleep: { duration: "7h 15m", bedtime: "23:30", wake: "06:45" },
  workout: {
    title: "Leg Day",
    time: "18:30",
    place: "Fitness First — Liberty Plaza",
  },
  timeSplit: [
    { label: "Hospital Work", value: 45, color: "#e11d48" },
    { label: "Sleep & Rest", value: 30, color: "#64748b" },
    { label: "Gym & Fitness", value: 12, color: "#10b981" },
    { label: "Dating / Social", value: 13, color: "#f59e0b" },
  ],
};

export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "work", label: "Work" },
  { id: "personal", label: "Personal" },
  { id: "social", label: "Social" },
  { id: "health", label: "Health" },
];
