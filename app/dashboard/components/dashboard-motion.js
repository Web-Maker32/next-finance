"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function DashboardMotion({ children }) {
  const reduce = useReducedMotion();
  const items = Array.isArray(children) ? children : [children];

  return (
    <motion.div
      className="space-y-8 pb-10"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.04 },
        },
      }}
    >
      {items.map((child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 16 },
            show: {
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 90, damping: 16 },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}