// app/notification/_NotificationMotion.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.22, 0.61, 0.36, 1] as const;

export function FadeInUp({
  children,
  delay = 0,
  duration = 0.6,
  y = 16,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.7,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollFadeUp({
  children,
  delay = 0,
  duration = 0.55,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerList({
  children,
  className,
  staggerDelay = 0.05,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: staggerDelay } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const upVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: EASE } },
};

export function StaggerItem({
  children,
  className,
  variant = "up",
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  variant?: "up" | "scale";
  hover?: boolean;
}) {
  return (
    <motion.div
      variants={variant === "scale" ? scaleVariants : upVariants}
      whileHover={hover ? { y: -3 } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}