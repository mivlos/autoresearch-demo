"use client";
import { motion } from "framer-motion";
import { TrendUp, CheckCircle } from "@phosphor-icons/react";
import AnimatedCounter from "../AnimatedCounter";
import RevealLine from "../RevealLine";
import { useSequentialReveal } from "../useSequentialReveal";

interface Props { onStageComplete?: () => void; }

export default function OptimiseRerun({ onStageComplete }: Props) {
  const v = useSequentialReveal(10, 280, onStageComplete);

  return (
    <div className="space-y-2 text-sm">
      <RevealLine visible={v >= 1}>
        <span className="text-xs font-mono text-muted">▸ Applying Recommendation 1: Surfacing shipping costs pre-cart...</span>
      </RevealLine>
      <RevealLine visible={v >= 2}>
        <span className="text-xs font-mono text-muted">▸ Applying Recommendation 2: Adopting Variant B social proof pattern...</span>
      </RevealLine>
      <RevealLine visible={v >= 3}>
        <span className="text-xs font-mono text-accent">✓ Generating optimised variant via Picsart Creative API...</span>
      </RevealLine>

      {/* Side by side */}
      <RevealLine visible={v >= 4}>
        <div className="grid grid-cols-2 gap-4 items-center mt-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-lg border border-card-border overflow-hidden"
          >
            <div className="h-24 bg-gradient-to-br from-slate-500/20 to-slate-600/20 flex items-center justify-center relative">
              <div className="absolute inset-3 flex flex-col gap-1.5">
                <div className="h-2 w-12 rounded bg-white/20" />
                <div className="h-1 w-16 rounded bg-white/10" />
                <div className="flex-1" />
                <div className="h-1.5 w-16 rounded bg-white/15" />
                <div className="h-1 w-20 rounded bg-white/10" />
                <div className="flex-1" />
                <div className="h-4 w-14 rounded bg-violet-500/30" />
              </div>
            </div>
            <div className="p-2 text-center text-[11px] text-muted">Original</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border border-accent/30 overflow-hidden"
          >
            <div className="h-24 bg-gradient-to-br from-violet-500/20 to-purple-600/20 flex items-center justify-center relative">
              <div className="absolute inset-3 flex flex-col gap-1.5">
                <div className="h-2 w-12 rounded bg-white/20" />
                <div className="h-1 w-16 rounded bg-white/10" />
                <div className="flex-1" />
                <div className="h-1.5 w-20 rounded bg-accent/30" />
                <div className="h-1 w-24 rounded bg-white/10" />
                <div className="h-2 w-16 rounded bg-success/30" />
                <div className="flex-1" />
                <div className="h-4 w-14 rounded bg-violet-500/40" />
              </div>
            </div>
            <div className="p-2 text-center text-[11px] text-accent font-medium">Optimised</div>
          </motion.div>
        </div>
      </RevealLine>

      <RevealLine visible={v >= 5}>
        <span className="text-xs font-mono text-muted">▸ Scheduling validation: 10 participants, same screener, 2-hour turnaround</span>
      </RevealLine>
      <RevealLine visible={v >= 6}>
        <span className="text-xs font-mono text-accent">✓ Validation sessions 1-10 complete</span>
      </RevealLine>
      <RevealLine visible={v >= 7}>
        <span className="text-xs font-mono text-muted">▸ Computing delta: SUS 72.5 → 81.2 (+8.7), Checkout friction 35% → 12% (-23pp)</span>
      </RevealLine>

      {/* Validation results */}
      <RevealLine visible={v >= 8}>
        <div className="grid grid-cols-2 gap-3 mt-1">
          <div className="rounded-lg bg-accent-dim p-3 text-center">
            <div className="text-lg font-heading font-bold text-accent">
              <AnimatedCounter value={81.2} decimals={1} duration={1.5} />
            </div>
            <div className="text-[10px] text-muted uppercase tracking-wider">New SUS Score</div>
            <div className="text-[10px] text-success flex items-center justify-center gap-1 mt-1">
              <TrendUp weight="bold" className="w-3 h-3" /> +8.7 points
            </div>
          </div>
          <div className="rounded-lg bg-accent-dim p-3 text-center">
            <div className="text-lg font-heading font-bold text-accent">
              <AnimatedCounter value={12} suffix="%" decimals={0} duration={1.5} />
            </div>
            <div className="text-[10px] text-muted uppercase tracking-wider">Checkout Friction</div>
            <div className="text-[10px] text-success flex items-center justify-center gap-1 mt-1">
              <TrendUp weight="bold" className="w-3 h-3" /> Down from 35%
            </div>
          </div>
        </div>
      </RevealLine>

      <RevealLine visible={v >= 9}>
        <span className="text-xs font-mono text-accent">✓ Statistical significance confirmed (p=0.003)</span>
      </RevealLine>
      <RevealLine visible={v >= 10}>
        <span className="text-xs text-success font-medium flex items-center gap-1.5 mt-1">
          <CheckCircle weight="duotone" className="w-4 h-4" />
          Decision: ✓ Ready to ship
        </span>
      </RevealLine>
    </div>
  );
}
