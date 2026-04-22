"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Robot,
  Flask,
  Code,
  UsersThree,
  PaintBrush,
  Play,
  Sparkle,
  ArrowsClockwise,
  Database,
  Rocket,
  Lightning,
  ArrowLeft,
  ArrowRight,
  CaretDown,
  CaretUp,
  CheckCircle,
  Warning,
  XCircle,
  CalendarBlank,
  CurrencyDollar,
  TreeStructure,
  Chats,
  VideoCamera,
  Microphone,
} from "@phosphor-icons/react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Status = "ready" | "needs-config" | "needs-build" | "partial" | "gated" | "auth";

interface SubComponent {
  name: string;
  status: Status;
  statusLabel: string;
  ease: number;
  time: string;
}

interface ComponentData {
  id: string;
  name: string;
  icon: React.ElementType;
  what: string;
  status: Status;
  statusLabel: string;
  integration: string;
  ease: number;
  time: string;
  blockers: string;
  dependencies: string;
  subs?: SubComponent[];
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const COMPONENTS: ComponentData[] = [
  {
    id: "orchestrator",
    name: "OpenClaw Orchestrator",
    icon: Robot,
    what: "Central coordination agent. Receives research requests, plans the pipeline, delegates to specialist components, manages the full loop.",
    status: "ready",
    statusLabel: "READY",
    integration: "Native — IS the infrastructure",
    ease: 5,
    time: "Already running",
    blockers: "None",
    dependencies: "Anthropic API key, Mac/Linux host",
  },
  {
    id: "research-design",
    name: "Research Design Agent",
    icon: Flask,
    what: "Specialist skill that determines methodology, sample size, screener questions, task flows, and success metrics based on the research objective.",
    status: "needs-build",
    statusLabel: "NEEDS BUILD",
    integration: "OpenClaw skill (SKILL.md + prompt engineering)",
    ease: 4,
    time: "2–3 days",
    blockers: "Needs UXR domain expertise to encode methodological decision trees",
    dependencies: "OpenClaw orchestrator, LLM (Opus recommended)",
  },
  {
    id: "build-engine",
    name: "Build Engine — Codex / Claude Code",
    icon: Code,
    what: "Autonomous code generation for building whatever the pipeline needs — test environments, prototype pages, survey forms, analysis scripts, reports.",
    status: "ready",
    statusLabel: "READY",
    integration: "CLI (claude), API (OpenAI Codex), or OpenClaw sub-agent",
    ease: 4,
    time: "Already available",
    blockers: "Rate limits on heavy usage. Codex requires OpenAI API key.",
    dependencies: "GitHub for version control, Vercel for deployment",
  },
  {
    id: "recruitment",
    name: "Recruitment — User Interviews API",
    icon: UsersThree,
    what: "Programmatic access to 6M+ panel. Create projects, define screeners, recruit participants, track status, manage incentives.",
    status: "gated",
    statusLabel: "NEEDS ACCESS",
    integration: "REST API (v2.0)",
    ease: 3,
    time: "1–2 weeks",
    blockers: "Partner API access required — need to apply or get fast-tracked by Baran/UT leadership. Hub API available on all plans.",
    dependencies: "User Interviews account, API key, prepaid balance for incentives",
  },
  {
    id: "stimulus",
    name: "Creative Stimulus — Picsart CLI/API",
    icon: PaintBrush,
    what: "Generate test stimuli on demand — landing pages, ad variants, product mockups, social posts. 100+ AI models including Flux, Ideogram, Recraft, Veo.",
    status: "needs-config",
    statusLabel: "NEEDS API KEY",
    integration: "CLI (picsart) or REST API (picsart.io)",
    ease: 4,
    time: "1–2 days",
    blockers: "Picsart Creative API key (Oli to provision)",
    dependencies: "Picsart account, API key",
  },
  {
    id: "execution",
    name: "Study Execution — Multiple Paths",
    icon: Play,
    what: "Actually running the research sessions. Multiple execution paths depending on methodology.",
    status: "partial",
    statusLabel: "MIXED",
    integration: "Various APIs per path",
    ease: 4,
    time: "Varies",
    blockers: "Depends on chosen path",
    dependencies: "Upstream recruitment + stimuli",
    subs: [
      { name: "Unmoderated Survey (Typeform/SurveyMonkey)", status: "ready", statusLabel: "READY", ease: 4, time: "1–2 days" },
      { name: "Unmoderated Usability (Maze/Lyssna)", status: "gated", statusLabel: "NEEDS ACCESS", ease: 3, time: "1–2 weeks" },
      { name: "AI-Moderated Interview (ElevenLabs)", status: "ready", statusLabel: "READY", ease: 4, time: "2–3 days" },
      { name: "Human-Moderated (Zoom + Granola)", status: "partial", statusLabel: "PARTIAL", ease: 3, time: "1 week" },
    ],
  },
  {
    id: "synthesis",
    name: "Synthesis Engine",
    icon: Sparkle,
    what: "Ingests session data (transcripts, recordings, survey responses, behavioural data), runs thematic analysis, extracts insights, generates structured reports.",
    status: "ready",
    statusLabel: "READY",
    integration: "Native LLM analysis + QMD for knowledge retrieval",
    ease: 4,
    time: "2–3 days",
    blockers: "Transcript/recording ingestion format needs standardisation",
    dependencies: "LLM (Opus for deep analysis, Sonnet for routine synthesis)",
  },
  {
    id: "loop",
    name: "Karpathy AutoResearch Loop",
    icon: ArrowsClockwise,
    what: "The optimise-validate-iterate loop. Agent analyses results, generates hypotheses, creates optimised variants, re-runs targeted validation, confirms improvement with statistical significance.",
    status: "needs-build",
    statusLabel: "NEEDS BUILD",
    integration: "OpenClaw cron + sub-agent spawning",
    ease: 3,
    time: "1–2 weeks",
    blockers: "Needs clear stopping criteria, cost management for iterative loops",
    dependencies: "All upstream components, statistical significance calculation",
  },
  {
    id: "knowledge-base",
    name: "Insight Knowledge Base",
    icon: Database,
    what: "Persistent, queryable repository of all research findings. Accumulates over time. Agents query it before designing new studies — 'what do we already know about this?'",
    status: "partial",
    statusLabel: "PARTIAL",
    integration: "QMD (local search) + Notion API + MCP",
    ease: 3,
    time: "1 week",
    blockers: "Schema design for research-specific entities (findings, recommendations, confidence levels, evidence chains)",
    dependencies: "QMD, Notion",
  },
  {
    id: "deployment",
    name: "Deployment & Monitoring",
    icon: Rocket,
    what: "Ship validated changes to production. Configure A/B tests. Set up continuous pulse-check monitoring via the panel.",
    status: "ready",
    statusLabel: "READY",
    integration: "Vercel CLI, GitHub Actions",
    ease: 5,
    time: "Already running",
    blockers: "None for deployment. Monitoring loop needs recruitment pipeline.",
    dependencies: "Vercel, GitHub, User Interviews API for ongoing pulse checks",
  },
];

const READINESS_ROWS = [
  { name: "Orchestrator (OpenClaw)", status: "ready" as Status, statusLabel: "Ready", ease: 5, time: "Now", blocker: "—" },
  { name: "Build Engine (Claude Code)", status: "ready" as Status, statusLabel: "Ready", ease: 4, time: "Now", blocker: "—" },
  { name: "Synthesis Engine", status: "ready" as Status, statusLabel: "Ready", ease: 4, time: "2–3 days", blocker: "—" },
  { name: "Deployment (Vercel)", status: "ready" as Status, statusLabel: "Ready", ease: 5, time: "Now", blocker: "—" },
  { name: "AI Interviews (ElevenLabs)", status: "ready" as Status, statusLabel: "Ready", ease: 4, time: "2–3 days", blocker: "—" },
  { name: "Research Design Agent", status: "needs-build" as Status, statusLabel: "Build", ease: 4, time: "2–3 days", blocker: "UXR expertise" },
  { name: "Stimulus Gen (Picsart)", status: "needs-config" as Status, statusLabel: "Config", ease: 4, time: "1–2 days", blocker: "API key" },
  { name: "Insight Knowledge Base", status: "partial" as Status, statusLabel: "Partial", ease: 3, time: "1 week", blocker: "Schema" },
  { name: "AutoResearch Loop", status: "needs-build" as Status, statusLabel: "Build", ease: 3, time: "1–2 weeks", blocker: "State mgmt" },
  { name: "Recruitment (User Interviews)", status: "gated" as Status, statusLabel: "Gated", ease: 3, time: "1–2 weeks", blocker: "API access" },
  { name: "Usability Testing (Maze)", status: "gated" as Status, statusLabel: "Gated", ease: 3, time: "1–2 weeks", blocker: "API access" },
  { name: "Granola (Meeting Intel)", status: "auth" as Status, statusLabel: "Auth", ease: 3, time: "1 day", blocker: "OAuth re-auth" },
];

const COST_ROWS = [
  { component: "LLM (design + synthesis)", cost: "~$2–5" },
  { component: "Recruitment (20 participants × $30 avg)", cost: "~$600" },
  { component: "Stimulus generation (Picsart API)", cost: "~$1–5" },
  { component: "AI-moderated interviews (ElevenLabs)", cost: "~$10–20" },
  { component: "Deployment (Vercel)", cost: "Free tier" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function statusColor(s: Status) {
  if (s === "ready") return "text-emerald-400";
  if (s === "needs-build" || s === "needs-config" || s === "partial" || s === "gated" || s === "auth") return "text-amber-400";
  return "text-red-400";
}

function statusBg(s: Status) {
  if (s === "ready") return "bg-emerald-400/15 border-emerald-400/30";
  return "bg-amber-400/15 border-amber-400/30";
}

function StatusDot({ status }: { status: Status }) {
  const color = status === "ready" ? "bg-emerald-400" : "bg-amber-400";
  return <span className={`inline-block w-2 h-2 rounded-full ${color}`} />;
}

function EaseBar({ ease }: { ease: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <div key={n} className={`h-1.5 w-4 rounded-full ${n <= ease ? "bg-accent" : "bg-card-border"}`} />
      ))}
      <span className="text-[10px] text-muted ml-1">{ease}/5</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component Card                                                     */
/* ------------------------------------------------------------------ */

function ComponentCard({ comp }: { comp: ComponentData }) {
  const [open, setOpen] = useState(false);
  const Icon = comp.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-card-border bg-card/60 backdrop-blur-sm overflow-hidden"
    >
      {/* Header — always visible */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left cursor-pointer hover:bg-white/[0.02] transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
          <Icon weight="duotone" className="w-5 h-5 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-sm text-foreground truncate">{comp.name}</span>
            <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${statusBg(comp.status)} ${statusColor(comp.status)}`}>
              {comp.statusLabel}
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5 line-clamp-1">{comp.what}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <EaseBar ease={comp.ease} />
          {open ? <CaretUp className="w-4 h-4 text-muted" /> : <CaretDown className="w-4 h-4 text-muted" />}
        </div>
      </button>

      {/* Expanded details */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 border-t border-card-border">
              <p className="text-sm text-foreground/80 mb-4">{comp.what}</p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted mb-1">Integration</div>
                  <div className="font-mono text-foreground/70">{comp.integration}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted mb-1">Time to Integrate</div>
                  <div className="font-mono text-foreground/70">{comp.time}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted mb-1">Blockers</div>
                  <div className={`font-mono ${comp.blockers === "None" ? "text-emerald-400/70" : "text-amber-400/70"}`}>{comp.blockers}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted mb-1">Dependencies</div>
                  <div className="font-mono text-foreground/70">{comp.dependencies}</div>
                </div>
              </div>

              {/* Sub-components */}
              {comp.subs && (
                <div className="mt-4 space-y-2">
                  <div className="text-[10px] uppercase tracking-wider text-muted mb-2">Execution Paths</div>
                  {comp.subs.map((sub, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg bg-background/40 border border-card-border">
                      <div className="flex items-center gap-2">
                        <StatusDot status={sub.status} />
                        <span className="text-xs text-foreground/80">{sub.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-[10px] font-mono ${statusColor(sub.status)}`}>{sub.statusLabel}</span>
                        <span className="text-[10px] font-mono text-muted">{sub.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Architecture Diagram                                               */
/* ------------------------------------------------------------------ */

function ArchDiagram() {
  const orchestrator = { label: "ORCHESTRATOR", sub: "OpenClaw Agent · Kit / Draper", icon: Robot };
  const nodes = [
    { label: "Build Engine", sub: "Codex / Claude Code", icon: Code, status: "ready" as Status },
    { label: "Research Design", sub: "Method Expert Skill", icon: Flask, status: "needs-build" as Status },
    { label: "Recruit Panel", sub: "User Interviews API", icon: UsersThree, status: "gated" as Status },
    { label: "Create Stimuli", sub: "Picsart CLI/API", icon: PaintBrush, status: "needs-config" as Status },
    { label: "Synth Engine", sub: "LLM Analysis", icon: Sparkle, status: "ready" as Status },
  ];

  return (
    <div className="relative">
      {/* Central node */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mb-8"
      >
        <div className="relative px-8 py-5 rounded-2xl border-2 border-accent/40 bg-accent/10 backdrop-blur-sm text-center">
          <div className="absolute -top-px left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full pulse-ring" />
          <orchestrator.icon weight="duotone" className="w-8 h-8 text-accent mx-auto mb-2" />
          <div className="font-heading font-bold text-sm text-accent">{orchestrator.label}</div>
          <div className="text-[10px] text-muted mt-0.5">{orchestrator.sub}</div>
        </div>
      </motion.div>

      {/* Connection lines — vertical stem */}
      <div className="flex justify-center mb-4">
        <div className="w-px h-8 bg-gradient-to-b from-accent/40 to-accent/10" />
      </div>

      {/* Horizontal connector bar */}
      <div className="relative mx-auto max-w-3xl mb-4">
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-accent/20" />
        {/* Vertical drops */}
        {nodes.map((_, i) => (
          <div
            key={i}
            className="absolute top-0 h-6 w-px bg-accent/20"
            style={{ left: `${10 + i * 20}%` }}
          />
        ))}
      </div>

      {/* Child nodes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-3xl mx-auto mt-6">
        {nodes.map((node, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="relative rounded-xl border border-card-border bg-card/60 p-4 text-center hover:border-accent/30 transition-colors"
          >
            <StatusDot status={node.status} />
            <node.icon weight="duotone" className="w-6 h-6 text-accent/80 mx-auto mt-2 mb-1" />
            <div className="font-heading font-bold text-[11px] text-foreground leading-tight">{node.label}</div>
            <div className="text-[9px] text-muted mt-0.5">{node.sub}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Critical Path Timeline                                             */
/* ------------------------------------------------------------------ */

const WEEKS = [
  {
    week: "Week 1",
    label: "Foundation",
    items: [
      { day: "Day 1–2", task: "Research Design Agent skill (encode methodology decision trees)", icon: Flask },
      { day: "Day 2–3", task: "Synthesis templates (research-specific analysis patterns)", icon: Sparkle },
      { day: "Day 3", task: "Picsart API key provisioned + stimulus generation connected", icon: PaintBrush },
      { day: "Day 3–5", task: "AI-moderated interview agent (ElevenLabs + research script)", icon: Microphone },
    ],
  },
  {
    week: "Week 2",
    label: "Integration",
    items: [
      { day: "Day 6–7", task: "User Interviews Recruit API access (fast-tracked by leadership)", icon: UsersThree },
      { day: "Day 7–10", task: "AutoResearch loop orchestration (iterate + validate cycle)", icon: ArrowsClockwise },
      { day: "Day 10", task: "Insight knowledge base schema + QMD indexing", icon: Database },
    ],
  },
  {
    week: "Week 3",
    label: "Validation",
    items: [
      { day: "Day 11–13", task: "Integration testing, edge cases, cost optimisation", icon: Code },
      { day: "Day 14", task: "First real study through the pipeline", icon: Play },
      { day: "Day 15", task: "Demo to stakeholders", icon: Rocket },
    ],
  },
];

function CriticalPath() {
  return (
    <div className="space-y-8">
      {WEEKS.map((w, wi) => (
        <motion.div
          key={wi}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: wi * 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-heading font-bold text-sm text-accent">{w.week}</span>
            <span className="text-xs text-muted">— {w.label}</span>
            <div className="flex-1 h-px bg-card-border" />
          </div>
          <div className="space-y-2 ml-4">
            {w.items.map((item, ii) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={ii}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: wi * 0.1 + ii * 0.05 }}
                  className="flex items-start gap-3 px-4 py-3 rounded-lg bg-card/40 border border-card-border"
                >
                  <Icon weight="duotone" className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-mono text-[11px] text-accent/70 mr-2">{item.day}</span>
                    <span className="text-sm text-foreground/80">{item.task}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 px-5 py-4 rounded-xl bg-accent/5 border border-accent/20 text-center"
      >
        <p className="text-sm text-foreground/90 font-heading font-bold">
          From zero to autonomous research pipeline: 3 weeks.
        </p>
        <p className="text-xs text-muted mt-1">
          From first study to continuous insight engine: 2 more weeks.
        </p>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen gradient-bg grid-pattern">
      {/* Nav */}
      <nav className="px-6 py-4 max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-muted hover:text-foreground transition-colors text-sm">
          <ArrowLeft weight="bold" className="w-4 h-4" />
          <span>Back to Demo</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-accent/20 flex items-center justify-center">
            <Lightning weight="duotone" className="w-4 h-4 text-accent" />
          </div>
          <span className="font-heading font-bold text-sm">AutoResearch</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-12 pb-16 max-w-5xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <TreeStructure weight="duotone" className="w-4 h-4 text-accent" />
            <span className="text-xs font-mono text-accent">Technical Blueprint</span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl tracking-tight mb-4">
            Architecture: How It All Connects
          </h1>
          <p className="text-muted text-base max-w-xl mx-auto">
            The complete technical blueprint for autonomous research infrastructure
          </p>
        </motion.div>
      </section>

      {/* Section 1: Orchestration Layer */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <SectionHeading number="01" title="The Orchestration Layer" />
        <ArchDiagram />
      </section>

      {/* Section 2: Component Breakdown */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <SectionHeading number="02" title="Component Breakdown" />
        <p className="text-sm text-muted mb-6 max-w-2xl">
          Click any component to expand full details — integration method, blockers, dependencies, and time to integrate.
        </p>
        <div className="space-y-3">
          {COMPONENTS.map((comp) => (
            <ComponentCard key={comp.id} comp={comp} />
          ))}
        </div>
      </section>

      {/* Section 3: Integration Readiness */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <SectionHeading number="03" title="Integration Readiness Summary" />
        <div className="rounded-2xl border border-card-border bg-card/40 backdrop-blur-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-card-border">
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-muted font-medium">Component</th>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-muted font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-muted font-medium">Ease</th>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-muted font-medium">Time</th>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-muted font-medium">Blocker</th>
                </tr>
              </thead>
              <tbody>
                {READINESS_ROWS.map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-card-border/50 last:border-b-0"
                  >
                    <td className="px-4 py-3 text-foreground/80 font-medium">{row.name}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${statusBg(row.status)} ${statusColor(row.status)} text-[10px] font-mono font-semibold`}>
                        <StatusDot status={row.status} />
                        {row.statusLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3"><EaseBar ease={row.ease} /></td>
                    <td className="px-4 py-3 font-mono text-muted">{row.time}</td>
                    <td className="px-4 py-3 font-mono text-muted">{row.blocker}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: Critical Path */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <SectionHeading number="04" title="Critical Path" />
        <CriticalPath />
      </section>

      {/* Section 5: Cost Model */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <SectionHeading number="05" title="Cost Model" />
        <p className="text-sm text-muted mb-6">Cost breakdown per autonomous research cycle</p>
        <div className="rounded-2xl border border-card-border bg-card/40 backdrop-blur-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-card-border">
                <th className="text-left px-5 py-3 text-[10px] uppercase tracking-wider text-muted font-medium">Component</th>
                <th className="text-right px-5 py-3 text-[10px] uppercase tracking-wider text-muted font-medium">Cost per Study</th>
              </tr>
            </thead>
            <tbody>
              {COST_ROWS.map((row, i) => (
                <tr key={i} className="border-b border-card-border/50">
                  <td className="px-5 py-3 text-foreground/80">{row.component}</td>
                  <td className="px-5 py-3 text-right font-mono text-foreground/70">{row.cost}</td>
                </tr>
              ))}
              <tr className="border-b border-card-border bg-accent/5">
                <td className="px-5 py-3 font-heading font-bold text-foreground">Total per cycle</td>
                <td className="px-5 py-3 text-right font-mono font-bold text-accent">~$615–630</td>
              </tr>
              <tr className="border-b border-card-border/50">
                <td className="px-5 py-3 text-muted">Traditional agency equivalent</td>
                <td className="px-5 py-3 text-right font-mono text-muted">$15,000–25,000</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-heading font-bold text-emerald-400">Savings</td>
                <td className="px-5 py-4 text-right font-heading font-bold text-emerald-400 text-lg">~96%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center pb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-heading font-bold hover:bg-accent/20 transition-colors"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
          Back to Pipeline Demo
        </Link>
        <div className="mt-6 text-[11px] text-muted/40">
          AutoResearch Architecture · Built for UserTesting Executive Leadership Offsite
        </div>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared UI                                                          */
/* ------------------------------------------------------------------ */

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-6"
    >
      <span className="font-mono text-[10px] text-accent/50">{number}</span>
      <h2 className="font-heading font-bold text-xl text-foreground">{title}</h2>
      <div className="flex-1 h-px bg-card-border" />
    </motion.div>
  );
}
