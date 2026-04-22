"use client";
import { motion } from "framer-motion";
import { Rocket, Eye, Brain, CheckCircle } from "@phosphor-icons/react";

export default function Ship() {
  return (
    <div className="space-y-4 text-sm">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2 text-xs text-foreground/80">
          <Rocket weight="duotone" className="w-4 h-4 text-accent" />
          Deploying optimised variant to production...
        </div>
        <div className="flex items-center gap-2 text-xs text-foreground/80">
          <Eye weight="duotone" className="w-4 h-4 text-accent" />
          Continuous monitoring configured: weekly 5-participant pulse checks via User Interviews panel
        </div>
        <div className="flex items-center gap-2 text-xs text-foreground/80">
          <Brain weight="duotone" className="w-4 h-4 text-accent" />
          Insight agent updated with new learnings — 3 new patterns added to knowledge base
        </div>
      </motion.div>

      {/* Success banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="rounded-xl bg-gradient-to-r from-success/15 to-accent/10 border border-success/30 p-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
            <CheckCircle weight="duotone" className="w-6 h-6 text-success" />
          </div>
          <div>
            <div className="text-sm font-heading font-bold text-success">Research Complete</div>
            <div className="text-xs text-foreground/70 mt-0.5">
              Research-validated product shipped in 6 hours. Zero researcher time required for logistics.
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
