"use client";
import { motion } from "framer-motion";
import { CheckCircle } from "@phosphor-icons/react";
import RevealLine from "../RevealLine";
import { useSequentialReveal } from "../useSequentialReveal";

interface Props { onStageComplete?: () => void; }

const VARIANTS = [
  { label: "Variant A: Bold CTA", color: "from-cyan-500/30 to-blue-600/30", accent: "#22D3EE" },
  { label: "Variant B: Social Proof", color: "from-violet-500/30 to-purple-600/30", accent: "#A78BFA" },
  { label: "Variant C: Minimal", color: "from-emerald-500/30 to-teal-600/30", accent: "#34D399" },
];

function MockupCard({ v, delay }: { v: typeof VARIANTS[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="rounded-lg overflow-hidden border border-card-border"
    >
      <div className={`h-28 bg-gradient-to-br ${v.color} flex items-center justify-center relative`}>
        <div className="absolute inset-3 flex flex-col gap-1.5">
          <div className="h-2 w-12 rounded bg-white/20" />
          <div className="h-1 w-20 rounded bg-white/10" />
          <div className="flex-1" />
          <div className="h-1.5 w-16 rounded bg-white/15" />
          <div className="h-1 w-24 rounded bg-white/10" />
          <div className="h-1 w-20 rounded bg-white/10" />
          <div className="flex-1" />
          <div className="h-4 w-14 rounded" style={{ backgroundColor: v.accent + "60" }} />
        </div>
      </div>
      <div className="p-2 text-center">
        <div className="text-[11px] font-medium">{v.label}</div>
      </div>
    </motion.div>
  );
}

export default function StimulusGeneration({ onStageComplete }: Props) {
  const v = useSequentialReveal(8, 280, onStageComplete);

  return (
    <div className="space-y-2 text-sm">
      <RevealLine visible={v >= 1}>
        <span className="text-xs font-mono text-muted">▸ Connecting to Picsart Creative API...</span>
      </RevealLine>

      <RevealLine visible={v >= 2}>
        <span className="text-xs font-mono text-muted">▸ Generating Variant A: Bold CTA layout...</span>
      </RevealLine>
      <RevealLine visible={v >= 3}>
        <span className="text-xs font-mono text-muted">▸ Generating Variant B: Social proof layout...</span>
      </RevealLine>
      <RevealLine visible={v >= 4}>
        <span className="text-xs font-mono text-muted">▸ Generating Variant C: Minimal layout...</span>
      </RevealLine>

      {/* Show mockups */}
      <RevealLine visible={v >= 5}>
        <div className="grid grid-cols-3 gap-3 mt-1">
          {VARIANTS.map((variant, i) => (
            <MockupCard key={i} v={variant} delay={i * 0.15} />
          ))}
        </div>
      </RevealLine>

      <RevealLine visible={v >= 6}>
        <span className="text-xs font-mono text-accent">✓ Creating responsive versions (mobile + desktop): 6 assets total</span>
      </RevealLine>
      <RevealLine visible={v >= 7}>
        <span className="text-xs font-mono text-accent">✓ Configuring prototype environment: URLs assigned, recording enabled</span>
      </RevealLine>
      <RevealLine visible={v >= 8}>
        <span className="text-xs text-success flex items-center gap-1.5 mt-1">
          <CheckCircle weight="duotone" className="w-3.5 h-3.5" />
          Test materials ready in 12.4 seconds
        </span>
      </RevealLine>
    </div>
  );
}
