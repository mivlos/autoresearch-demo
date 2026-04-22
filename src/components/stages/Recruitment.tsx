"use client";
import { UserCircle } from "@phosphor-icons/react";
import RevealLine from "../RevealLine";
import { useSequentialReveal } from "../useSequentialReveal";

interface Props { onStageComplete?: () => void; }

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

export default function Recruitment({ onStageComplete }: Props) {
  const v = useSequentialReveal(12, 220, onStageComplete);

  return (
    <div className="space-y-2 text-sm">
      <RevealLine visible={v >= 1}>
        <span className="text-xs font-mono text-muted">▸ Connecting to User Interviews Recruit API...</span>
      </RevealLine>
      <RevealLine visible={v >= 2}>
        <span className="text-xs font-mono text-accent">✓ POST /api/v2/recruits — project created (ID: REC-2026-0422)</span>
      </RevealLine>
      <RevealLine visible={v >= 3}>
        <span className="text-xs font-mono text-muted">▸ Querying panel: <span className="text-foreground/90">6,247,000 active participants</span></span>
      </RevealLine>
      <RevealLine visible={v >= 4}>
        <span className="text-xs font-mono text-muted">▸ Applying screener: Age 18-27... → <span className="text-accent">4,812 match</span></span>
      </RevealLine>
      <RevealLine visible={v >= 5}>
        <span className="text-xs font-mono text-muted">▸ Applying screener: US location... → <span className="text-accent">2,341 match</span></span>
      </RevealLine>
      <RevealLine visible={v >= 6}>
        <span className="text-xs font-mono text-muted">▸ Applying screener: Mobile device preference... → <span className="text-accent">1,156 match</span></span>
      </RevealLine>
      <RevealLine visible={v >= 7}>
        <span className="text-xs font-mono text-muted">▸ Applying screener: Recent purchase history... → <span className="text-accent">847 match</span></span>
      </RevealLine>
      <RevealLine visible={v >= 8}>
        <span className="text-xs font-mono text-muted">▸ Applying screener: Profession exclusion... → <span className="text-accent">156 qualified</span></span>
      </RevealLine>
      <RevealLine visible={v >= 9}>
        <span className="text-xs font-mono text-accent">✓ Scheduling: 24 confirmed, 20 selected (4 backup)</span>
      </RevealLine>
      <RevealLine visible={v >= 10}>
        <span className="text-xs font-mono text-success">✓ All sessions scheduled within 4.2 hours</span>
      </RevealLine>

      {/* Participant cards */}
      <RevealLine visible={v >= 11}>
        <div className="grid grid-cols-4 gap-2 mt-2">
          {PARTICIPANTS.map((p, i) => (
            <div
              key={i}
              className="rounded-lg bg-card-border/20 p-2 text-center"
            >
              <div className="flex justify-center mb-1">
                <UserCircle weight="duotone" className="w-6 h-6 text-accent/60" />
              </div>
              <div className="text-xs font-medium">{p.initials}</div>
              <div className="text-[10px] text-muted">{p.age} · {p.loc.split(",")[1]?.trim()}</div>
              <div className="text-[10px] text-muted">{p.device}</div>
              <div className="text-[10px] text-accent font-mono">{p.match}%</div>
            </div>
          ))}
        </div>
      </RevealLine>

      <RevealLine visible={v >= 12}>
        <div className="text-xs text-muted mt-1">+ 12 more participants scheduled</div>
      </RevealLine>
    </div>
  );
}
