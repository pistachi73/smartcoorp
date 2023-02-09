import React from 'react';

import * as S from './modify-block-tool-item.styles';
import { ModifyBlockTool } from './modify-block-tool.types';

type ModifyBlockToolItemProps = {
  tool: ModifyBlockTool;
  current?: boolean;
};

export const ModifyBlockToolItem: React.FC<ModifyBlockToolItemProps> = ({
  tool: { label, command, icon },
  current,
}) => {
  return (
    <S.ItemContainer>
      <S.IconContainer $current={current}>{icon}</S.IconContainer>
      <S.Label>{label}</S.Label>
      {command && (
        <S.CommandContainer>
          {command.map((key) => (
            <S.KBD
              key={`${label}-${key}`}
              dangerouslySetInnerHTML={{ __html: key }}
            />
          ))}
        </S.CommandContainer>
      )}
    </S.ItemContainer>
  );
};
