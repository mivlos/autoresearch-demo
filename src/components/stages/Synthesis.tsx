"use client";
import { motion } from "framer-motion";
import { Lightbulb, TrendUp, Warning, ShieldCheck } from "@phosphor-icons/react";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
};

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

export default function Synthesis() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5 text-sm">
      {/* Executive Summary */}
      <motion.div variants={item} className="rounded-lg bg-accent-dim border border-accent/20 p-4">
        <div className="text-[10px] uppercase tracking-wider text-accent mb-2 font-medium">Executive Summary</div>
        <p className="text-foreground/90 text-xs leading-relaxed">
          The landing page tested well with Gen Z users (SUS 72.5, above industry average of 68). Task completion was strong for browse and purchase flows, but the checkout confirmation page caused confusion for 35% of participants.
        </p>
      </motion.div>

      {/* Key Findings */}
      <motion.div variants={item}>
        <div className="text-[10px] uppercase tracking-wider text-muted mb-3">Key Findings</div>
        <div className="space-y-2">
          {FINDINGS.map((f, i) => (
            <motion.div
              key={i}
              variants={item}
              className="flex items-start gap-2.5 text-xs"
            >
              <f.icon
                weight="duotone"
                className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                  f.type === "positive" ? "text-success" : f.type === "negative" ? "text-amber-400" : "text-accent"
                }`}
              />
              <span className="text-foreground/80">{f.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div variants={item}>
        <div className="text-[10px] uppercase tracking-wider text-muted mb-3">Recommendations</div>
        <ol className="space-y-2 list-decimal list-inside">
          {RECOMMENDATIONS.map((r, i) => (
            <motion.li key={i} variants={item} className="text-xs text-foreground/80">
              {r}
            </motion.li>
          ))}
        </ol>
      </motion.div>

      {/* Confidence */}
      <motion.div variants={item} className="flex items-center gap-2 text-xs text-success">
        <ShieldCheck weight="duotone" className="w-4 h-4" />
        High confidence — 20 participants, 95% CI on key metrics, consistent themes across sessions
      </motion.div>
    </motion.div>
  );
}
