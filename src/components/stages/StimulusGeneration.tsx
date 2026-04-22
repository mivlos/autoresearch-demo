"use client";
import { motion } from "framer-motion";
import { CheckCircle } from "@phosphor-icons/react";

const VARIANTS = [
  { label: "Variant A: Bold CTA", color: "from-cyan-500/30 to-blue-600/30", accent: "#22D3EE" },
  { label: "Variant B: Social Proof", color: "from-violet-500/30 to-purple-600/30", accent: "#A78BFA" },
  { label: "Variant C: Minimal", color: "from-emerald-500/30 to-teal-600/30", accent: "#34D399" },
];

export default function StimulusGeneration() {
  return (
    <div className="space-y-4 text-sm">
      <div className="text-xs text-muted flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        Using Picsart Creative API to generate test stimuli
      </div>

      <div className="grid grid-cols-3 gap-3">
        {VARIANTS.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
            className="rounded-lg overflow-hidden border border-card-border"
          >
            <div className={`h-28 bg-gradient-to-br ${v.color} flex items-center justify-center relative`}>
              {/* Simulated landing page wireframe */}
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
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs text-muted">
        <span className="flex items-center gap-1.5 text-success">
          <CheckCircle weight="duotone" className="w-3.5 h-3.5" />
          3 responsive variants generated in 12 seconds
        </span>
        <span className="flex items-center gap-1.5 text-success">
          <CheckCircle weight="duotone" className="w-3.5 h-3.5" />
          Test environment configured
        </span>
      </div>
    </div>
  );
}
