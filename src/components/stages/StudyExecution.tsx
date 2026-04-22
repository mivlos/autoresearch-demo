"use client";
import { ChatTeardropDots } from "@phosphor-icons/react";
import AnimatedCounter from "../AnimatedCounter";
import RevealLine from "../RevealLine";
import { useSequentialReveal } from "../useSequentialReveal";

interface Props { onStageComplete?: () => void; }

const SESSIONS = [
  { id: 1, pid: "P-001", desc: "F, 22, Dallas, Mobile", time: "2m 18s", result: "all tasks completed" },
  { id: 2, pid: "P-002", desc: "M, 19, Portland, Mobile", time: "3m 04s", result: "task 3 abandoned" },
  { id: 3, pid: "P-003", desc: "F, 24, Chicago, Desktop", time: "1m 56s", result: "all tasks completed" },
  { id: 4, pid: "P-004", desc: "M, 21, Miami, Mobile", time: "2m 41s", result: "all tasks completed" },
  { id: 5, pid: "P-005", desc: "F, 18, Seattle, Mobile", time: "3m 22s", result: "task 2 hesitation" },
];

export default function StudyExecution({ onStageComplete }: Props) {
  const v = useSequentialReveal(15, 220, onStageComplete);

  return (
    <div className="space-y-2 text-sm">
      {/* Sessions appearing one by one */}
      {SESSIONS.map((s, i) => (
        <div key={s.id}>
          <RevealLine visible={v >= (i * 2 + 1)}>
            <span className="text-xs font-mono text-muted">▸ Session {s.id}/20 starting: {s.pid} ({s.desc})...</span>
          </RevealLine>
          <RevealLine visible={v >= (i * 2 + 2)}>
            <span className={`text-xs font-mono ${s.result.includes("abandoned") || s.result.includes("hesitation") ? "text-amber-400" : "text-accent"}`}>
              ✓ Session {s.id}/20 complete: {s.time}, {s.result}
            </span>
          </RevealLine>
        </div>
      ))}

      <RevealLine visible={v >= 11}>
        <span className="text-xs font-mono text-muted/50">  ...</span>
      </RevealLine>
      <RevealLine visible={v >= 12}>
        <span className="text-xs font-mono text-accent">✓ Session 20/20 complete: 1m 52s, all tasks completed</span>
      </RevealLine>

      <RevealLine visible={v >= 13}>
        <span className="text-xs font-mono text-amber-400">⚠ Friction detected: 7 participants hesitated at checkout (&gt;10s pause)</span>
      </RevealLine>
      <RevealLine visible={v >= 14}>
        <div className="text-xs text-muted flex items-center gap-2 ml-3">
          <ChatTeardropDots weight="duotone" className="w-4 h-4 text-accent" />
          AI follow-up triggered: &ldquo;What made you pause at this step?&rdquo;
        </div>
      </RevealLine>

      {/* Aggregate metrics */}
      <RevealLine visible={v >= 15}>
        <div className="grid grid-cols-4 gap-3 mt-2">
          {[
            { label: "Avg. Task Completion", value: 78, suffix: "%", decimals: 0 },
            { label: "Avg. Time on Task", value: 2.57, suffix: " min", decimals: 2 },
            { label: "SUS Score", value: 72.5, suffix: "", decimals: 1 },
            { label: "NPS", value: 34, prefix: "+", suffix: "", decimals: 0 },
          ].map((m, i) => (
            <div key={i} className="rounded-lg bg-accent-dim p-3 text-center">
              <div className="text-lg font-heading font-bold text-accent">
                <AnimatedCounter value={m.value} prefix={m.prefix} suffix={m.suffix} decimals={m.decimals} duration={1.5} />
              </div>
              <div className="text-[10px] text-muted uppercase tracking-wider mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>
      </RevealLine>
    </div>
  );
}
