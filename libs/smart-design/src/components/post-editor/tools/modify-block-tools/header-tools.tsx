import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

import { primary, spaceS } from '@smartcoorp/smart-design/tokens';

import { useUpdateBlocks } from '../../contexts/block-context';
import { useRefs } from '../../hooks';

import * as S from './modify-block.styles';

type HeaderToolsProps = {
  blockIndex: number;
  menuRefs: any;
};

const StyledMenuItem = styled(S.MenuItem)<{ $selected: boolean }>`
  color: ${({ $selected }) => $selected && primary} !important;
`;

const ColumnToolContainer = styled(S.ToolContainer)`
  flex-direction: column;
`;

const HSpan = styled.span`
  font-size: 16px;
`;

const LevelSpan = styled.span`
  margin-top: ${spaceS};
  font-size: 12px;
`;

export const HeaderTools = memo<HeaderToolsProps>(
  ({ blockIndex, menuRefs }) => {
    const { refs } = useRefs();
    const { modifyHeaderLevel } = useUpdateBlocks();
    const [triggerChange, setTriggerChange] = useState(false);
    const [level, setLevel] = useState<number>(
      parseInt(refs.current[blockIndex].nodeName.substring(1))
    );

    useEffect(() => {
      setLevel(parseInt(refs.current[blockIndex].nodeName.substring(1)));
    }, [blockIndex, refs, triggerChange]);

    return (
      <ColumnToolContainer>
        <S.ToolContainer>
          {Array.from(Array(3), (e, i) => {
            return (
              <StyledMenuItem
                key={`header_tool_${i + 1}`}
                ref={(el: HTMLElement) => (menuRefs.current[i] = el)}
                $selected={level === i + 1}
                onClick={() => {
                  setTriggerChange(!triggerChange);
                  modifyHeaderLevel(blockIndex, (i + 1) as 1 | 2 | 3);
                }}
              >
                <HSpan>H</HSpan>
                <LevelSpan>{i + 1}</LevelSpan>
              </StyledMenuItem>
            );
          })}
        </S.ToolContainer>
        <S.ToolContainer>
          {Array.from(Array(3), (e, i) => {
            return (
              <StyledMenuItem
                key={`header_tool_${i + 1}`}
                ref={(el: HTMLElement) => (menuRefs.current[i + 3] = el)}
                $selected={level === i + 4}
                onClick={() => {
                  setTriggerChange(!triggerChange);
                  modifyHeaderLevel(blockIndex, (i + 4) as 4 | 5 | 6);
                }}
              >
                <HSpan>H</HSpan>
                <LevelSpan>{i + 4}</LevelSpan>
              </StyledMenuItem>
            );
          })}
        </S.ToolContainer>
      </ColumnToolContainer>
    );
  }
);
