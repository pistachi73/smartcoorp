import {
  AnimationControls,
  Target,
  TargetAndTransition,
  Transition,
  VariantLabels,
} from 'framer-motion';
export type ResizablePanelProps = {
  /** Custom css */
  className?: string;
  /** The content to be rendered in the left panel */
  children: React.ReactNode;
  /** Framer motion animation */
  variants?: ResizablePanelVariants;
  /** The width of the left panel */
  minHeight?: number;
  /** Animation duration */
  duration?: number;
  /** Animation key*/
  animationKey?: string;
};

export type ResizablePanelVariants = {
  initial?: boolean | Target | VariantLabels;
  animate?: AnimationControls | TargetAndTransition | VariantLabels | boolean;
  exit?: TargetAndTransition | VariantLabels;
  transition?: Transition;
};
