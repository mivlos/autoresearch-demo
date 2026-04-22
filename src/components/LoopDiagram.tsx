"use client";
import { motion } from "framer-motion";
import { Hammer, TestTube, Sparkle, SlidersHorizontal, ShieldCheck, Rocket, ChartLine, ArrowRight } from "@phosphor-icons/react";

const STEPS = [
  { icon: Hammer, label: "Build" },
  { icon: TestTube, label: "Test" },
  { icon: Sparkle, label: "Synthesise" },
  { icon: SlidersHorizontal, label: "Optimise" },
  { icon: ShieldCheck, label: "Validate" },
  { icon: Rocket, label: "Ship" },
  { icon: ChartLine, label: "Monitor" },
];

export default function LoopDiagram() {
  return (
    <section className="px-6 py-12 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="font-heading font-bold text-xl text-foreground mb-2">The Continuous Loop</h2>
        <p className="text-muted text-sm mb-8">Research never stops — it runs alongside your product</p>

        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          {STEPS.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card/60 border border-card-border"
              >
                <step.icon weight="duotone" className="w-4 h-4 text-accent" />
                <span className="text-xs font-medium">{step.label}</span>
              </motion.div>
              {i < STEPS.length - 1 && (
                <ArrowRight weight="bold" className="w-3 h-3 text-muted/40" />
              )}
              {i === STEPS.length - 1 && (
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight weight="bold" className="w-3 h-3 text-accent/40" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <div className="text-[11px] text-muted">
          Powered by: <span className="text-foreground/60">Agent Orchestration</span>
          {" · "}
          <span className="text-foreground/60">User Interviews Panel</span>
          {" · "}
          <span className="text-foreground/60">Picsart Creative API</span>
          {" · "}
          <span className="text-foreground/60">AI Synthesis</span>
        </div>
      </motion.div>
    </section>
  );
}
