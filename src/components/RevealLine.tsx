"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealLineProps {
  visible: boolean;
  children: ReactNode;
  className?: string;
}

export default function RevealLine({ visible, children, className = "" }: RevealLineProps) {
  if (!visible) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
