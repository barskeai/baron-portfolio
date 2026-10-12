import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut", staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

interface ApplicationTransitionProps {
  children: ReactNode;
}

export function ApplicationTransition({ children }: ApplicationTransitionProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -12, transition: { duration: 0.2, ease: "easeOut" } }}
      className="flex flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}
