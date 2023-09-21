'use client';

import { AnimatePresence, type AnimationProps, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { usePathname } from 'next/navigation';

type LayoutTransitionProps = {
  children: React.ReactNode;
  initial: AnimationProps['initial'];
  animate: AnimationProps['animate'];
  exit: AnimationProps['exit'];
  transition: AnimationProps['transition'];
  duration?: number;
};

export const LayoutTransition = ({
  children,
  initial,
  animate,
  exit,
  transition,
  duration = 250,
}: LayoutTransitionProps) => {
  const pathname = usePathname();

  const effectTransition = {
    ...transition,
    duration: duration / 200,
  };

  return (
    <AnimatePresence initial={false} mode="sync">
      <motion.div
        // key={pathname}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={{
          ...effectTransition,
          // delay: duration / 2000,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
