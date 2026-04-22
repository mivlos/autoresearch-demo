"use client";
import { CheckCircle, Desktop, DeviceMobile } from "@phosphor-icons/react";
import RevealLine from "../RevealLine";
import { useSequentialReveal } from "../useSequentialReveal";

interface Props { onStageComplete?: () => void; }

export default function ResearchDesign({ onStageComplete }: Props) {
  const v = useSequentialReveal(12, 250, onStageComplete);

  return (
    <div className="space-y-2 text-sm">
      <RevealLine visible={v >= 1}>
        <span className="text-xs font-mono text-muted">▸ Analysing research objective...</span>
      </RevealLine>
      <RevealLine visible={v >= 2}>
        <span className="text-xs font-mono text-accent">✓ Objective classified: Evaluative (usability + conversion)</span>
      </RevealLine>
      <RevealLine visible={v >= 3}>
        <span className="text-xs font-mono text-muted">▸ Selecting methodology: <span className="text-foreground/90">Unmoderated usability test + post-task survey</span></span>
      </RevealLine>
      <RevealLine visible={v >= 4}>
        <span className="text-xs text-muted italic">&ldquo;Landing page evaluation benefits from task-based assessment with quantitative success metrics&rdquo;</span>
      </RevealLine>
      <RevealLine visible={v >= 5}>
        <span className="text-xs font-mono text-muted">▸ Defining sample: <span className="text-foreground/90">20 participants</span> <span className="text-muted/60">(power analysis: 80% power at p&lt;0.05 for SUS delta of 10 points)</span></span>
      </RevealLine>
      <RevealLine visible={v >= 6}>
        <span className="text-xs font-mono text-accent">✓ Generating screener: 5 criteria</span>
      </RevealLine>

      {/* Screener criteria */}
      <RevealLine visible={v >= 7}>
        <div className="flex flex-wrap gap-2 mt-1 ml-3">
          {["Age: 18–27 (Gen Z)", "Location: United States", "Online purchase in last 30 days", "Excludes: UX, Design, Marketing"].map((c, i) => (
            <span key={i} className="px-2 py-1 rounded-md bg-card-border/30 text-xs text-foreground/80 flex items-center gap-1.5">
              <CheckCircle weight="duotone" className="w-3.5 h-3.5 text-accent" />
              {c}
            </span>
          ))}
          <span className="px-2 py-1 rounded-md bg-card-border/30 text-xs text-foreground/80 flex items-center gap-1.5">
            <DeviceMobile weight="duotone" className="w-3.5 h-3.5 text-accent" /> Mobile 70%
          </span>
          <span className="px-2 py-1 rounded-md bg-card-border/30 text-xs text-foreground/80 flex items-center gap-1.5">
            <Desktop weight="duotone" className="w-3.5 h-3.5 text-accent" /> Desktop 30%
          </span>
        </div>
      </RevealLine>

      <RevealLine visible={v >= 8}>
        <span className="text-xs font-mono text-muted">▸ Designing task flow: <span className="text-foreground/90">3 tasks + 4 post-task questions</span></span>
      </RevealLine>

      {/* Tasks */}
      <RevealLine visible={v >= 9}>
        <ol className="space-y-1 list-decimal list-inside text-foreground/80 text-xs ml-3">
          <li>&ldquo;Find the product that best matches your style preferences&rdquo;</li>
          <li>&ldquo;Complete a purchase of your chosen item&rdquo;</li>
          <li>&ldquo;Rate your overall experience&rdquo;</li>
        </ol>
      </RevealLine>

      <RevealLine visible={v >= 10}>
        <span className="text-xs font-mono text-accent">✓ Setting success metrics: Task completion &gt;75%, SUS &gt;68, Time on task &lt;3min</span>
      </RevealLine>

      <RevealLine visible={v >= 11}>
        <div className="flex flex-wrap gap-2 mt-1 ml-3">
          {["Task completion rate", "Time on task", "SUS score", "NPS"].map((m, i) => (
            <span key={i} className="px-2 py-1 rounded-md border border-accent/20 text-xs text-accent">{m}</span>
          ))}
        </div>
      </RevealLine>

      <RevealLine visible={v >= 12}>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="rounded-lg bg-accent-dim p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted mb-1">Methodology</div>
            <div className="font-medium text-accent text-xs">Unmoderated usability test + post-task survey</div>
          </div>
          <div className="rounded-lg bg-accent-dim p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted mb-1">Confidence</div>
            <div className="font-medium text-xs">95% CI</div>
          </div>
        </div>
      </RevealLine>
    </div>
  );
}
