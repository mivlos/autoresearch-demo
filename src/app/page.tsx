"use client";
import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  UsersThree,
  PaintBrush,
  PlayCircle,
  Sparkle,
  ArrowsClockwise,
  RocketLaunch,
  Clock,
} from "@phosphor-icons/react";

import PromptSection from "@/components/PromptSection";
import PipelineStage from "@/components/PipelineStage";
import SummaryBar from "@/components/SummaryBar";
import LoopDiagram from "@/components/LoopDiagram";

import ResearchDesign from "@/components/stages/ResearchDesign";
import Recruitment from "@/components/stages/Recruitment";
import StimulusGeneration from "@/components/stages/StimulusGeneration";
import StudyExecution from "@/components/stages/StudyExecution";
import Synthesis from "@/components/stages/Synthesis";
import OptimiseRerun from "@/components/stages/OptimiseRerun";
import Ship from "@/components/stages/Ship";

const STAGES = [
  { title: "Designing Research", icon: Brain, thinkText: "Designing research methodology", thinkMs: 500 },
  { title: "Recruiting Participants", icon: UsersThree, thinkText: "Connecting to recruitment panel", thinkMs: 500 },
  { title: "Generating Test Materials", icon: PaintBrush, thinkText: "Generating stimuli with Creative API", thinkMs: 500 },
  { title: "Running Study", icon: PlayCircle, thinkText: "Launching unmoderated sessions", thinkMs: 500 },
  { title: "Synthesising Results", icon: Sparkle, thinkText: "Analysing 20 sessions with AI", thinkMs: 500 },
  { title: "Optimising & Validating", icon: ArrowsClockwise, thinkText: "Generating optimised variant", thinkMs: 500 },
  { title: "Shipping", icon: RocketLaunch, thinkText: "Deploying to production", thinkMs: 500 },
];

const STAGE_COMPONENTS = [
  ResearchDesign,
  Recruitment,
  StimulusGeneration,
  StudyExecution,
  Synthesis,
  OptimiseRerun,
  Ship,
];

// Realistic elapsed times for each stage
const TIME_ELAPSED = [
  "~30 seconds",
  "~4 hours (auto-scheduled)",
  "~12 seconds",
  "~4 hours (async, unattended)",
  "~3 minutes",
  "~2.5 hours (generate + validate)",
  "~45 seconds",
];

// Cumulative time labels after each stage completes
const CUMULATIVE_TIMES = [
  "~30 seconds",
  "~4 hours",
  "~4 hours",
  "~8 hours",
  "~8 hours",
  "~10.5 hours",
  "~11 hours",
];

// Delays between stages (ms) — kept short for snappy demo flow
const STAGE_DELAYS = [0, 700, 700, 700, 700, 700, 700];

export default function Home() {
  const [prompt, setPrompt] = useState("Test this landing page concept with 20 Gen Z users in the US");
  const [running, setRunning] = useState(false);
  const [activeStages, setActiveStages] = useState<boolean[]>(new Array(7).fill(false));
  const [completedStages, setCompletedStages] = useState<boolean[]>(new Array(7).fill(false));
  const [pipelineComplete, setPipelineComplete] = useState(false);
  const [currentCumulativeTime, setCurrentCumulativeTime] = useState("");
  const pipelineRef = useRef<HTMLDivElement>(null);

  const activateStage = useCallback((index: number) => {
    setActiveStages((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  const completeStage = useCallback((index: number) => {
    setCompletedStages((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
    setCurrentCumulativeTime(CUMULATIVE_TIMES[index]);
    // Activate next stage after delay
    if (index < 6) {
      setTimeout(() => activateStage(index + 1), STAGE_DELAYS[index + 1]);
    } else {
      setPipelineComplete(true);
    }
  }, [activateStage]);

  const handleRun = () => {
    if (!prompt.trim() || running) return;
    setRunning(true);
    setActiveStages(new Array(7).fill(false));
    setCompletedStages(new Array(7).fill(false));
    setPipelineComplete(false);
    setCurrentCumulativeTime("");
    // Start first stage
    setTimeout(() => {
      activateStage(0);
      pipelineRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 500);
  };

  const completedCount = completedStages.filter(Boolean).length;

  return (
    <main className="min-h-screen gradient-bg grid-pattern">
      <PromptSection
        prompt={prompt}
        setPrompt={setPrompt}
        onRun={handleRun}
        running={running}
      />

      {/* Pipeline */}
      <AnimatePresence>
        {running && (
          <motion.section
            ref={pipelineRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="px-6 pb-8 max-w-4xl mx-auto"
          >
            {/* Active prompt display */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 px-4 py-3 rounded-xl bg-card/40 border border-card-border"
            >
              <div className="text-[10px] uppercase tracking-wider text-muted mb-1">Research Prompt</div>
              <div className="text-sm text-foreground/90 font-medium">&ldquo;{prompt}&rdquo;</div>
            </motion.div>

            {/* Running total elapsed time */}
            <AnimatePresence>
              {completedCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 flex items-center justify-between px-4 py-3 rounded-xl bg-accent/5 border border-accent/20"
                >
                  <div className="flex items-center gap-2">
                    <Clock weight="duotone" className="w-4 h-4 text-accent" />
                    <span className="text-xs font-mono text-accent">
                      Total elapsed: {currentCumulativeTime}
                    </span>
                    {pipelineComplete && (
                      <span className="text-xs text-accent/70 ml-1">(fully autonomous)</span>
                    )}
                  </div>
                  {pipelineComplete && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs font-mono text-muted/60"
                    >
                      vs ~3 weeks (manual coordination)
                    </motion.span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              {STAGES.map((stage, i) => {
                const StageContent = STAGE_COMPONENTS[i];
                return (
                  <PipelineStage
                    key={i}
                    stageNumber={i + 1}
                    title={stage.title}
                    icon={<stage.icon weight="duotone" className="w-5 h-5" />}
                    active={activeStages[i]}
                    completed={completedStages[i]}
                    thinkingText={stage.thinkText}
                    thinkDuration={stage.thinkMs}
                    timeElapsed={TIME_ELAPSED[i]}
                    onComplete={() => completeStage(i)}
                  >
                    <StageContent />
                  </PipelineStage>
                );
              })}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Summary & Loop — show after pipeline completes */}
      <AnimatePresence>
        {pipelineComplete && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <SummaryBar />
            <LoopDiagram />

            {/* Footer */}
            <div className="text-center pb-12 text-[11px] text-muted/40">
              AutoResearch Demo · Built for UserTesting Executive Leadership Offsite
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
