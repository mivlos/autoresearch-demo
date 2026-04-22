"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, ReactNode, cloneElement, isValidElement } from "react";
import TypingIndicator from "./TypingIndicator";

interface PipelineStageProps {
  active: boolean;
  completed: boolean;
  stageNumber: number;
  title: string;
  icon: ReactNode;
  thinkingText?: string;
  thinkDuration?: number;
  timeElapsed?: string;
  children: ReactNode;
  onComplete?: () => void;
}

export default function PipelineStage({
  active,
  completed,
  stageNumber,
  title,
  icon,
  thinkingText = "Processing",
  thinkDuration = 500,
  timeElapsed,
  children,
  onComplete,
}: PipelineStageProps) {
  const [thinking, setThinking] = useState(true);

  useEffect(() => {
    if (!active) return;
    setThinking(true);
    const timer = setTimeout(() => {
      setThinking(false);
    }, thinkDuration);
    return () => clearTimeout(timer);
  }, [active, thinkDuration]);

  // Clone child to pass onStageComplete callback
  const childWithCallback = !thinking && (active || completed) && isValidElement(children)
    ? cloneElement(children as React.ReactElement<{ onStageComplete?: () => void }>, { onStageComplete: onComplete })
    : children;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={active || completed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative rounded-xl border backdrop-blur-sm transition-colors duration-500 overflow-hidden ${
        active && !completed
          ? "border-accent/40 bg-card shadow-lg shadow-accent/5"
          : completed
          ? "border-card-border bg-card/50"
          : "border-transparent"
      }`}
    >
      {/* Glow effect when active */}
      {active && !completed && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.08) 0%, transparent 70%)",
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-500 ${
              active || completed ? "bg-accent/15 text-accent" : "bg-card-border/30 text-muted"
            }`}
          >
            {icon}
          </div>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-xs font-mono text-muted uppercase tracking-wider">
              Stage {stageNumber}
            </span>
            <h3 className="font-heading font-bold text-lg">{title}</h3>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {timeElapsed && completed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[11px] font-mono text-muted/70 whitespace-nowrap"
              >
                ⏱ {timeElapsed}
              </motion.span>
            )}
            {completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center justify-center w-6 h-6 rounded-full bg-success/20 text-success"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            )}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {active && thinking ? (
            <motion.div
              key="thinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pl-[52px]"
            >
              <TypingIndicator text={thinkingText} />
            </motion.div>
          ) : (active || completed) && !thinking ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="pl-[52px]"
            >
              {childWithCallback}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
