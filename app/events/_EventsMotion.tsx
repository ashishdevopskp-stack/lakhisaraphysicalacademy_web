"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.22, 0.61, 0.36, 1] as const;

/* ---------- Hero-only entrances (animate on mount) ---------- */

export function FadeInUp({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
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
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Below-the-fold entrance (animate once in view) ---------- */

type Tag = "div" | "h1" | "h2" | "p";
const tagMap = {
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  p: motion.p,
} as const;

export function ScrollFadeUp({
  as = "div",
  children,
  className,
  delay = 0,
}: {
  as?: Tag;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const Comp = tagMap[as] as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: EASE, delay }}
      className={className}
    >
      {children}
    </Comp>
  );
}

/* ---------- Repeated list / grid entrances ---------- */

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const itemScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: EASE } },
};

export function StaggerList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type ItemTag = "div" | "a";
const itemTagMap = { div: motion.div, a: motion.a } as const;

export function StaggerItem({
  as = "div",
  children,
  className,
  hover = false,
  variant = "up",
  ...rest
}: {
  as?: ItemTag;
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "up" | "scale";
  [key: string]: unknown;
}) {
  const Comp = itemTagMap[as] as typeof motion.div;
  return (
    <Comp
      variants={variant === "scale" ? itemScale : itemUp}
      whileHover={hover ? { y: -3 } : undefined}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
}