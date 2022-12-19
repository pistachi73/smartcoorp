import { memo, useEffect, useState } from 'react';
import { BiListOl, BiListUl } from 'react-icons/bi';
import styled from 'styled-components';

import { primary } from '@smartcoorp/smart-design/tokens';

import { useUpdateBlocks } from '../../contexts/block-context';
import { useRefs } from '../../hooks';

import * as S from './modify-block.styles';

type ListToolsProps = {
  blockIndex: number;
  menuRefs: any;
};

const StyledMenuItem = styled(S.MenuItem)<{ $selected: boolean }>`
  color: ${({ $selected }) => $selected && primary} !important;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledToolContainer = styled(S.ToolContainer)`
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export const ListTools = memo<ListToolsProps>(({ blockIndex, menuRefs }) => {
  const { refs } = useRefs();
  const { modifyListStyle } = useUpdateBlocks();
  const [triggerChange, setTriggerChange] = useState(false);
  const [style, setStyle] = useState<'ordered' | 'unordered'>(
    refs.current[blockIndex].nodeName === 'OL' ? 'ordered' : 'unordered'
  );

  useEffect(() => {
    setStyle(
      refs.current[blockIndex].nodeName === 'OL' ? 'ordered' : 'unordered'
    );
  }, [blockIndex, refs, triggerChange]);

  return (
    <StyledToolContainer>
      <StyledMenuItem
        ref={(el: HTMLElement) => (menuRefs.current[0] = el)}
        $selected={style === 'unordered'}
        onClick={() => {
          setTriggerChange(!triggerChange);
          modifyListStyle(blockIndex, 'unordered');
        }}
      >
        <BiListUl size={24} />
      </StyledMenuItem>
      <StyledMenuItem
        ref={(el: HTMLElement) => (menuRefs.current[1] = el)}
        $selected={style === 'ordered'}
        onClick={() => {
          setTriggerChange(!triggerChange);
          modifyListStyle(blockIndex, 'ordered');
        }}
      >
        <BiListOl size={24} />
      </StyledMenuItem>
    </StyledToolContainer>
  );
});
