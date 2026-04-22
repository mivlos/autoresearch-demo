"use client";
import { motion } from "framer-motion";
import { ArrowRight, TrendUp, CheckCircle } from "@phosphor-icons/react";
import AnimatedCounter from "../AnimatedCounter";

export default function OptimiseRerun() {
  return (
    <div className="space-y-4 text-sm">
      <div className="text-xs text-muted">Agent applying recommendations to generate optimised variant...</div>

      {/* Side by side comparison */}
      <div className="grid grid-cols-2 gap-4 items-center">
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
              {/* No shipping cost visible */}
              <div className="h-4 w-14 rounded bg-violet-500/30" />
            </div>
          </div>
          <div className="p-2 text-center text-[11px] text-muted">Original</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-lg border border-accent/30 overflow-hidden"
        >
          <div className="h-24 bg-gradient-to-br from-violet-500/20 to-purple-600/20 flex items-center justify-center relative">
            <div className="absolute inset-3 flex flex-col gap-1.5">
              <div className="h-2 w-12 rounded bg-white/20" />
              <div className="h-1 w-16 rounded bg-white/10" />
              <div className="flex-1" />
              {/* Social proof element */}
              <div className="h-1.5 w-20 rounded bg-accent/30" />
              <div className="h-1 w-24 rounded bg-white/10" />
              {/* Shipping cost visible early */}
              <div className="h-2 w-16 rounded bg-success/30" />
              <div className="flex-1" />
              <div className="h-4 w-14 rounded bg-violet-500/40" />
            </div>
          </div>
          <div className="p-2 text-center text-[11px] text-accent font-medium">Optimised</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xs text-muted"
      >
        Scheduling validation study: 10 participants, same screener, optimised variant only
      </motion.div>

      {/* Validation results */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-2 gap-3"
      >
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex items-center gap-2 text-xs text-success font-medium"
      >
        <CheckCircle weight="duotone" className="w-4 h-4" />
        Ready to ship. Optimised variant meets all success criteria.
      </motion.div>
    </div>
  );
}
