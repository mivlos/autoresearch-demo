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
  { title: "Designing Research", icon: Brain, thinkText: "Designing research methodology", thinkMs: 2500 },
  { title: "Recruiting Participants", icon: UsersThree, thinkText: "Connecting to recruitment panel", thinkMs: 2000 },
  { title: "Generating Test Materials", icon: PaintBrush, thinkText: "Generating stimuli with Creative API", thinkMs: 1800 },
  { title: "Running Study", icon: PlayCircle, thinkText: "Launching unmoderated sessions", thinkMs: 2000 },
  { title: "Synthesising Results", icon: Sparkle, thinkText: "Analysing 20 sessions with AI", thinkMs: 2500 },
  { title: "Optimising & Validating", icon: ArrowsClockwise, thinkText: "Generating optimised variant", thinkMs: 2000 },
  { title: "Shipping", icon: RocketLaunch, thinkText: "Deploying to production", thinkMs: 1500 },
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

// Delays between stages (ms after previous stage completes thinking)
const STAGE_DELAYS = [0, 1500, 1200, 1500, 1500, 1200, 1000];

export default function Home() {
  const [prompt, setPrompt] = useState("Test this landing page concept with 20 Gen Z users in the US");
  const [running, setRunning] = useState(false);
  const [activeStages, setActiveStages] = useState<boolean[]>(new Array(7).fill(false));
  const [completedStages, setCompletedStages] = useState<boolean[]>(new Array(7).fill(false));
  const [pipelineComplete, setPipelineComplete] = useState(false);
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
    // Start first stage
    setTimeout(() => {
      activateStage(0);
      // Scroll to pipeline
      pipelineRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 500);
  };

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
