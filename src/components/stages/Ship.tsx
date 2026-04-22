"use client";
import { motion } from "framer-motion";
import { CheckCircle } from "@phosphor-icons/react";
import RevealLine from "../RevealLine";
import { useSequentialReveal } from "../useSequentialReveal";

interface Props { onStageComplete?: () => void; }

export default function Ship({ onStageComplete }: Props) {
  const v = useSequentialReveal(7, 280, onStageComplete);

  return (
    <div className="space-y-2 text-sm">
      <RevealLine visible={v >= 1}>
        <span className="text-xs font-mono text-muted">▸ Deploying optimised variant to production CDN...</span>
      </RevealLine>
      <RevealLine visible={v >= 2}>
        <span className="text-xs font-mono text-accent">✓ A/B test configured: 50/50 split, 7-day duration</span>
      </RevealLine>
      <RevealLine visible={v >= 3}>
        <span className="text-xs font-mono text-muted">▸ Continuous monitoring: weekly 5-participant pulse checks scheduled</span>
      </RevealLine>
      <RevealLine visible={v >= 4}>
        <span className="text-xs font-mono text-accent">✓ Insight knowledge base updated: 3 new patterns, 2 updated heuristics</span>
      </RevealLine>
      <RevealLine visible={v >= 5}>
        <span className="text-xs font-mono text-accent">✓ Stakeholder report generated and shared to #product-research</span>
      </RevealLine>

      {/* Success banner */}
      <RevealLine visible={v >= 6}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="rounded-xl bg-gradient-to-r from-success/15 to-accent/10 border border-success/30 p-4 mt-2"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle weight="duotone" className="w-6 h-6 text-success" />
            </div>
            <div>
              <div className="text-sm font-heading font-bold text-success">Research Complete</div>
              <div className="text-xs text-foreground/70 mt-0.5">
                Full research cycle completed autonomously. Zero researcher time required for logistics.
              </div>
            </div>
          </div>
        </motion.div>
      </RevealLine>

      <RevealLine visible={v >= 7}>
        <span className="text-xs text-muted/60 mt-1 block">Pipeline finished.</span>
      </RevealLine>
    </div>
  );
}
