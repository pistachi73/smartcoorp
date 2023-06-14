import {
  AnimationControls,
  Target,
  TargetAndTransition,
  VariantLabels,
} from 'framer-motion';
export type ResizablePanelProps = {
  /** The content to be rendered in the left panel */
  children: React.ReactNode;
  /** Framer motion animation */
  variants?: ResizablePanelVariants;
};

export type ResizablePanelVariants = {
  initial?: boolean | Target | VariantLabels;
  animate?: AnimationControls | TargetAndTransition | VariantLabels | boolean;
  exit?: TargetAndTransition | VariantLabels;
};
