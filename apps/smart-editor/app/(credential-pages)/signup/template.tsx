'use client';

import { AnimatePresence, motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
          x: -50,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{
          opacity: 0,
          x: 50,
        }}
        transition={{
          pmass: 0.5,
          damping: 10,
          stiffness: 100,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
