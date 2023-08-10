import React from 'react';
import styled from 'styled-components';

import {
  motionEasingStandard,
  motionTimeL,
  motionTimeS,
  spaceM,
} from '@smartcoorp/ui/tokens';

import { ColumnBlockProps } from '../blocks.types';

import { ColumnBlockTool } from './column-block-tool';

const Col = styled.div<{ $cols?: number }>`
  display: flex;
`;

const ColumnContainer = styled.div<{ $distribution?: number }>`
  padding-block: ${spaceM};
  flex-grow: ${({ $distribution }) => $distribution ?? 1};
  flex-shrink: 1;
  flex-basis: 0;
  transition-property: flex-grow;
  transition-duration: ${motionTimeL};
  transition-timing-function: ${motionEasingStandard};
`;

export const Column = React.memo<ColumnBlockProps>(
  ({ blockId, children, columns, distribution }) => {
    return (
      <Col $cols={columns}>
        {React.Children.map(children, (child, index) => (
          <React.Fragment key={child?.toString()}>
            <ColumnContainer $distribution={distribution?.[index]}>
              {child}
            </ColumnContainer>
            {index !== columns - 1 && (
              <ColumnBlockTool
                columns={columns}
                blockId={blockId}
                distribution={distribution}
              />
            )}
          </React.Fragment>
        ))}
      </Col>
    );
  }
);
