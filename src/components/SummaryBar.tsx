"use client";
import { motion } from "framer-motion";
import { Clock, UserCircle, Users, ShieldCheck, ArrowsClockwise, CurrencyDollar } from "@phosphor-icons/react";

const STATS = [
  { icon: Clock, label: "Total Time", value: "~11 hours", subtext: "vs ~3 weeks traditional" },
  { icon: UserCircle, label: "Researcher Time", value: "0 hrs logistics", subtext: "30 min review" },
  { icon: Users, label: "Participants", value: "30", subtext: "20 initial + 10 validation" },
  { icon: ShieldCheck, label: "Confidence", value: "95% CI", subtext: "All key metrics" },
  { icon: ArrowsClockwise, label: "Iterations", value: "2", subtext: "Original + optimised" },
  { icon: CurrencyDollar, label: "Cost", value: "~$600", subtext: "vs ~$15K+ traditional" },
];

export default function SummaryBar() {
  return (
    <section className="px-6 py-12 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <h2 className="font-heading font-bold text-xl text-foreground">The Numbers</h2>
          <p className="text-muted text-sm mt-1">Research at the speed of product development</p>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl bg-card/60 border border-card-border p-4 text-center"
            >
              <stat.icon weight="duotone" className="w-6 h-6 text-accent mx-auto mb-2" />
              <div className="font-heading font-bold text-lg text-foreground">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted mt-1">{stat.label}</div>
              <div className="text-[10px] text-muted/60 mt-0.5">{stat.subtext}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
