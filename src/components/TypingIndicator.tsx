"use client";
import { motion } from "framer-motion";

export default function TypingIndicator({ text = "Thinking" }: { text?: string }) {
  return (
    <div className="flex items-center gap-2 text-muted">
      <span className="text-sm font-mono">{text}</span>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-accent"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}
