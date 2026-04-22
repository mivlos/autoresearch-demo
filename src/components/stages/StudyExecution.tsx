"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import AnimatedCounter from "../AnimatedCounter";
import { Play, VideoCamera, UserCircle, ChatTeardropDots } from "@phosphor-icons/react";

const SESSION_PARTICIPANTS = [
  "SJ", "MK", "AR", "LC", "DW", "TB", "KP", "NR", "EF", "GM",
  "HL", "JQ", "BV", "RN", "WZ", "OC", "PY", "IX", "UA", "FD",
];

export default function StudyExecution() {
  const [completedSessions, setCompletedSessions] = useState(0);
  const [showRecordings, setShowRecordings] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCompletedSessions((prev) => {
        if (prev >= 20) {
          clearInterval(interval);
          return 20;
        }
        return prev + 1;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 text-sm">
      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-muted">Sessions completed</span>
          <span className="font-mono text-accent">{completedSessions}/20</span>
        </div>
        <div className="h-2 rounded-full bg-card-border/30 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent to-cyan-400"
            initial={{ width: "0%" }}
            animate={{ width: `${(completedSessions / 20) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Live metrics */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Avg. Task Completion", value: 78, suffix: "%", decimals: 0 },
          { label: "Avg. Time on Task", value: 2.57, suffix: " min", decimals: 2, prefix: "" },
          { label: "SUS Score", value: 72.5, suffix: "", decimals: 1 },
          { label: "NPS", value: 34, prefix: "+", suffix: "", decimals: 0 },
        ].map((m, i) => (
          <div key={i} className="rounded-lg bg-accent-dim p-3 text-center">
            <div className="text-lg font-heading font-bold text-accent">
              <AnimatedCounter value={m.value} prefix={m.prefix} suffix={m.suffix} decimals={m.decimals} duration={2} />
            </div>
            <div className="text-[10px] text-muted uppercase tracking-wider mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Session cards */}
      <div className="flex flex-wrap gap-1.5">
        {SESSION_PARTICIPANTS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={i < completedSessions ? { opacity: 1, scale: 1 } : { opacity: 0.2, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-card-border/20 text-[10px]"
          >
            <UserCircle weight="duotone" className="w-3.5 h-3.5 text-accent/60" />
            <span>{p}</span>
            {i < completedSessions && (
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" className="text-success">
                <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </motion.div>
        ))}
      </div>

      <div className="text-xs text-muted flex items-center gap-2">
        <ChatTeardropDots weight="duotone" className="w-4 h-4 text-accent" />
        Moderation mode: Adaptive AI — follow-up questions triggered on 3 friction points detected
      </div>

      {/* Session recordings */}
      <button
        onClick={() => setShowRecordings(!showRecordings)}
        className="text-[10px] uppercase tracking-wider text-muted hover:text-foreground transition-colors flex items-center gap-1.5 cursor-pointer"
      >
        <VideoCamera weight="duotone" className="w-3.5 h-3.5" />
        {showRecordings ? "Hide" : "View"} session recordings
      </button>
      {showRecordings && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded-lg bg-card-border/20 aspect-video flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
              <Play weight="duotone" className="w-8 h-8 text-accent/40" />
              <span className="absolute bottom-1.5 right-2 text-[9px] font-mono text-muted">Session {n}</span>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
