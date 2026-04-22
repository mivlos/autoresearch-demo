"use client";
import { Lightbulb, TrendUp, Warning, ShieldCheck } from "@phosphor-icons/react";
import RevealLine from "../RevealLine";
import { useSequentialReveal } from "../useSequentialReveal";

interface Props { onStageComplete?: () => void; }

const FINDINGS = [
  { icon: TrendUp, text: "First impression was positive — 85% described the design as 'modern' and 'trustworthy'", type: "positive" },
  { icon: TrendUp, text: "Product discovery was intuitive — avg. 47 seconds to find preferred item", type: "positive" },
  { icon: Warning, text: "Checkout friction: 35% hesitated at payment step due to unclear shipping costs", type: "negative" },
  { icon: TrendUp, text: "Mobile experience outperformed desktop on all engagement metrics", type: "positive" },
  { icon: Lightbulb, text: "Variant B (Social Proof) outperformed A and C on conversion intent (+23%)", type: "insight" },
];

const RECOMMENDATIONS = [
  "Surface shipping costs earlier in the flow (pre-cart)",
  "Adopt Variant B's social proof pattern for production",
  "Optimise desktop layout — currently 15% lower engagement than mobile",
];

export default function Synthesis({ onStageComplete }: Props) {
  const v = useSequentialReveal(14, 250, onStageComplete);

  return (
    <div className="space-y-2 text-sm">
      <RevealLine visible={v >= 1}>
        <span className="text-xs font-mono text-muted">▸ Ingesting 20 session recordings (4h 12m total footage)...</span>
      </RevealLine>
      <RevealLine visible={v >= 2}>
        <span className="text-xs font-mono text-muted">▸ Transcribing verbal protocols...</span>
      </RevealLine>
      <RevealLine visible={v >= 3}>
        <span className="text-xs font-mono text-muted">▸ Extracting behavioural patterns: click paths, scroll depth, hover maps</span>
      </RevealLine>
      <RevealLine visible={v >= 4}>
        <span className="text-xs font-mono text-accent">✓ Running thematic analysis: 847 coded segments → 12 themes → 5 key findings</span>
      </RevealLine>
      <RevealLine visible={v >= 5}>
        <span className="text-xs font-mono text-muted">▸ Cross-referencing with quantitative metrics...</span>
      </RevealLine>
      <RevealLine visible={v >= 6}>
        <span className="text-xs font-mono text-accent">✓ Generating executive summary...</span>
      </RevealLine>

      {/* Executive Summary */}
      <RevealLine visible={v >= 7}>
        <div className="rounded-lg bg-accent-dim border border-accent/20 p-4 mt-1">
          <div className="text-[10px] uppercase tracking-wider text-accent mb-2 font-medium">Executive Summary</div>
          <p className="text-foreground/90 text-xs leading-relaxed">
            The landing page tested well with Gen Z users (SUS 72.5, above industry average of 68). Task completion was strong for browse and purchase flows, but the checkout confirmation page caused confusion for 35% of participants.
          </p>
        </div>
      </RevealLine>

      {/* Key Findings one by one */}
      {FINDINGS.map((f, i) => (
        <RevealLine key={i} visible={v >= 8 + i}>
          <div className="flex items-start gap-2.5 text-xs ml-2">
            <f.icon
              weight="duotone"
              className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                f.type === "positive" ? "text-success" : f.type === "negative" ? "text-amber-400" : "text-accent"
              }`}
            />
            <span className="text-foreground/80">{f.text}</span>
          </div>
        </RevealLine>
      ))}

      <RevealLine visible={v >= 13}>
        <span className="text-xs font-mono text-muted">▸ Formulating recommendations based on evidence strength...</span>
      </RevealLine>

      {/* Recommendations */}
      <RevealLine visible={v >= 14}>
        <div className="mt-1">
          <div className="text-[10px] uppercase tracking-wider text-muted mb-2">Recommendations</div>
          <ol className="space-y-1.5 list-decimal list-inside">
            {RECOMMENDATIONS.map((r, i) => (
              <li key={i} className="text-xs text-foreground/80">{r}</li>
            ))}
          </ol>
          <div className="flex items-center gap-2 text-xs text-success mt-3">
            <ShieldCheck weight="duotone" className="w-4 h-4" />
            High confidence — 20 participants, 95% CI on key metrics
          </div>
        </div>
      </RevealLine>
    </div>
  );
}
