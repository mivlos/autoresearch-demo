"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CaretDown, CaretUp, UserCircle } from "@phosphor-icons/react";

const PARTICIPANTS = [
  { initials: "SJ", age: 22, loc: "Austin, TX", device: "Mobile", match: 98 },
  { initials: "MK", age: 19, loc: "Brooklyn, NY", device: "Mobile", match: 96 },
  { initials: "AR", age: 24, loc: "Portland, OR", device: "Desktop", match: 95 },
  { initials: "LC", age: 20, loc: "Miami, FL", device: "Mobile", match: 94 },
  { initials: "DW", age: 23, loc: "Chicago, IL", device: "Mobile", match: 93 },
  { initials: "TB", age: 21, loc: "Denver, CO", device: "Desktop", match: 91 },
  { initials: "KP", age: 25, loc: "Seattle, WA", device: "Mobile", match: 90 },
  { initials: "NR", age: 18, loc: "Nashville, TN", device: "Mobile", match: 89 },
];

const FUNNEL = [
  { label: "Screening", count: 847 },
  { label: "Eligible", count: 156 },
  { label: "Qualified", count: 24 },
  { label: "Scheduled", count: 20 },
];

export default function Recruitment() {
  const [funnelStep, setFunnelStep] = useState(0);
  const [showApi, setShowApi] = useState(false);

  useEffect(() => {
    const timers = FUNNEL.map((_, i) =>
      setTimeout(() => setFunnelStep(i + 1), (i + 1) * 600)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="space-y-4 text-sm">
      {/* Connection status */}
      <div className="text-xs text-muted flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        Connected to User Interviews panel (6M+ participants)
      </div>

      {/* Funnel */}
      <div className="flex items-center gap-2">
        {FUNNEL.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={funnelStep > i ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="text-lg font-heading font-bold text-accent">{step.count}</div>
              <div className="text-[10px] text-muted uppercase tracking-wider">{step.label}</div>
            </motion.div>
            {i < FUNNEL.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={funnelStep > i ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="w-8 h-px bg-accent/40 origin-left"
              />
            )}
          </div>
        ))}
      </div>

      {/* Participant cards */}
      <div className="grid grid-cols-4 gap-2">
        {PARTICIPANTS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.08 }}
            className="rounded-lg bg-card-border/20 p-2 text-center"
          >
            <div className="flex justify-center mb-1">
              <UserCircle weight="duotone" className="w-6 h-6 text-accent/60" />
            </div>
            <div className="text-xs font-medium">{p.initials}</div>
            <div className="text-[10px] text-muted">{p.age} · {p.loc.split(",")[1]?.trim()}</div>
            <div className="text-[10px] text-muted">{p.device}</div>
            <div className="text-[10px] text-accent font-mono">{p.match}%</div>
          </motion.div>
        ))}
      </div>

      <div className="text-xs text-success flex items-center gap-2">
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        All 20 participants scheduled within 4 hours
      </div>

      {/* API call */}
      <button
        onClick={() => setShowApi(!showApi)}
        className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted hover:text-foreground transition-colors cursor-pointer"
      >
        {showApi ? <CaretUp weight="bold" className="w-3 h-3" /> : <CaretDown weight="bold" className="w-3 h-3" />}
        View API call
      </button>
      {showApi && (
        <motion.pre
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="font-mono text-[11px] bg-background/50 rounded-lg p-3 overflow-x-auto text-muted border border-card-border"
        >
{`POST /api/v2/recruits
{
  "project_name": "Landing Page Gen Z Test",
  "num_participants": 20,
  "screener": {
    "age_range": [18, 27],
    "location": "US",
    "device_mix": { "mobile": 0.7, "desktop": 0.3 },
    "criteria": [
      "online_purchase_30d",
      "!industry:ux,design,marketing"
    ]
  }
}`}
        </motion.pre>
      )}
    </div>
  );
}
