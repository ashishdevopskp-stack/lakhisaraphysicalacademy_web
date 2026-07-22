"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export function FadeInUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Scroll-triggered fade for a heading/paragraph pair further down a page.
export function ScrollFadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// True staggered list: parent triggers once on scroll, children cascade in
// with a shared timing config instead of each item computing its own delay.
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const staggerItemUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

const staggerItemScale = {
  hidden: { opacity: 0, y: 10, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: EASE } },
};

export function StaggerList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  variant = "up",
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "up" | "scale";
  hover?: boolean;
}) {
  return (
    <motion.div
      variants={variant === "scale" ? staggerItemScale : staggerItemUp}
      whileHover={hover ? { y: -3, transition: { duration: 0.15, ease: EASE } } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}