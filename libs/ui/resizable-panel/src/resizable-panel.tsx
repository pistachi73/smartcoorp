import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';
import useMeasure from 'react-use-measure';
import styled from 'styled-components';

import { ResizablePanelProps } from './resizable-panel.types';

const ResizableContainer = styled(motion.div)`
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const RefContainer = styled.div<{ $hasHeight?: boolean }>`
  width: 100%;
`;

export const ResizablePanel: FC<ResizablePanelProps> = ({
  children,
  variants,
}) => {
  const [ref, { height }] = useMeasure();

  return (
    <ResizableContainer
      animate={{
        height: height || 'auto',
      }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={JSON.stringify(children, ignoreCircularReferences())}
          {...variants}
          style={{
            width: '100%',
            position: height ? 'absolute' : 'relative',
          }}
        >
          <RefContainer ref={ref}>{children}</RefContainer>
        </motion.div>
      </AnimatePresence>
    </ResizableContainer>
  );
};

const ignoreCircularReferences = () => {
  const seen = new WeakSet();
  return (key: any, value: any) => {
    if (key.startsWith('_')) return; // Don't compare React's internal props.
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return;
      seen.add(value);
    }
    return value;
  };
};
