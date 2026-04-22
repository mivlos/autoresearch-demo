"use client";
import { motion } from "framer-motion";
import { CheckCircle, Desktop, DeviceMobile } from "@phosphor-icons/react";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
};

export default function ResearchDesign() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4 text-sm">
      <motion.div variants={item} className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-accent-dim p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted mb-1">Methodology</div>
          <div className="font-medium text-accent">Unmoderated usability test + post-task survey</div>
        </div>
        <div className="rounded-lg bg-accent-dim p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted mb-1">Sample Size</div>
          <div className="font-medium">20 participants</div>
        </div>
        <div className="rounded-lg bg-accent-dim p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted mb-1">Est. Duration</div>
          <div className="font-medium">8–12 min / session</div>
        </div>
        <div className="rounded-lg bg-accent-dim p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted mb-1">Confidence</div>
          <div className="font-medium">95% CI</div>
        </div>
      </motion.div>

      <motion.div variants={item} className="text-muted italic text-xs">
        &ldquo;Landing page evaluation benefits from task-based assessment with quantitative success metrics and qualitative follow-up&rdquo;
      </motion.div>

      <motion.div variants={item}>
        <div className="text-[10px] uppercase tracking-wider text-muted mb-2">Screener Criteria</div>
        <div className="flex flex-wrap gap-2">
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
      </motion.div>

      <motion.div variants={item}>
        <div className="text-[10px] uppercase tracking-wider text-muted mb-2">Generated Tasks</div>
        <ol className="space-y-1.5 list-decimal list-inside text-foreground/80 text-xs">
          <li>&ldquo;Find the product that best matches your style preferences&rdquo;</li>
          <li>&ldquo;Complete a purchase of your chosen item&rdquo;</li>
          <li>&ldquo;Rate your overall experience&rdquo;</li>
        </ol>
      </motion.div>

      <motion.div variants={item}>
        <div className="text-[10px] uppercase tracking-wider text-muted mb-2">Success Metrics</div>
        <div className="flex flex-wrap gap-2">
          {["Task completion rate", "Time on task", "SUS score", "NPS"].map((m, i) => (
            <span key={i} className="px-2 py-1 rounded-md border border-accent/20 text-xs text-accent">{m}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
