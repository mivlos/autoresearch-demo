"use client";
import { motion } from "framer-motion";
import { MagnifyingGlass, Lightning } from "@phosphor-icons/react";

const EXAMPLE_PROMPTS = [
  "Test this landing page concept with 20 Gen Z users in the US",
  "Validate our new pricing page with existing customers",
  "Compare 3 ad variants with Instagram-active women 25-34",
  "Run a competitive usability benchmark: us vs Canva vs Adobe",
];

interface PromptSectionProps {
  prompt: string;
  setPrompt: (p: string) => void;
  onRun: () => void;
  running: boolean;
}

export default function PromptSection({ prompt, setPrompt, onRun, running }: PromptSectionProps) {
  return (
    <section className="relative px-6 pt-16 pb-12 max-w-4xl mx-auto">
      {/* Logo / Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <Lightning weight="duotone" className="w-5 h-5 text-accent" />
          </div>
          <h1 className="font-heading font-bold text-2xl tracking-tight">AutoResearch</h1>
        </div>
        <p className="text-muted text-sm max-w-md mx-auto">
          From research prompt to validated product — fully autonomous, powered by agentic AI.
        </p>
      </motion.div>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        <div className="relative rounded-2xl border border-card-border bg-card/80 backdrop-blur-md overflow-hidden focus-within:border-accent/50 transition-colors">
          <div className="flex items-center gap-3 px-5 py-4">
            <MagnifyingGlass weight="duotone" className="w-5 h-5 text-muted flex-shrink-0" />
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="What do you want to learn?"
              disabled={running}
              className="flex-1 bg-transparent text-foreground placeholder:text-muted/60 text-base outline-none disabled:opacity-50 font-sans"
            />
          </div>
        </div>

        {/* Example Prompts */}
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {EXAMPLE_PROMPTS.map((ex, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              onClick={() => !running && setPrompt(ex)}
              disabled={running}
              className="px-3 py-1.5 text-xs rounded-full border border-card-border bg-card/50 text-muted hover:text-foreground hover:border-accent/30 transition-all disabled:opacity-40 cursor-pointer"
            >
              {ex}
            </motion.button>
          ))}
        </div>

        {/* Run Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center mt-6"
        >
          <button
            onClick={onRun}
            disabled={running || !prompt.trim()}
            className="group relative px-8 py-3 rounded-xl bg-accent text-background font-heading font-bold text-sm tracking-wide hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Lightning weight="duotone" className="w-4 h-4" />
              {running ? "Running AutoResearch..." : "Run AutoResearch"}
            </span>
            {!running && prompt.trim() && (
              <motion.div
                className="absolute inset-0 bg-white/10"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ width: "50%" }}
              />
            )}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
