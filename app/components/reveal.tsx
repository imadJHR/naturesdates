"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useRevealEnabled } from "./use-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
};

export function Reveal({ children, className, delay = 0, amount = 0.2 }: RevealProps) {
  const enabled = useRevealEnabled();

  return (
    <motion.div
      className={className}
      initial={enabled ? { opacity: 0, y: 20 } : false}
      whileInView={enabled ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type RevealSectionProps = RevealProps & {
  id?: string;
  "aria-labelledby"?: string;
};

export function RevealSection({ children, className, id, delay = 0, amount = 0.2, ...rest }: RevealSectionProps) {
  const enabled = useRevealEnabled();

  return (
    <motion.section
      id={id}
      className={className}
      {...rest}
      initial={enabled ? { opacity: 0, y: 20 } : false}
      whileInView={enabled ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.section>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export { containerVariants, itemVariants };
