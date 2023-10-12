import { FC } from 'react';

import { Styled as S } from './tabs.styles';
import type { TabsProps } from './tabs.types';

export const Tabs: FC<TabsProps> = ({ defaultTab, tabs, onTabChange }) => {
  return (
    <S.Tabs
      defaultValue={defaultTab ?? tabs[0].id}
      onValueChange={(t: string) => {
        onTabChange && onTabChange(t);
      }}
    >
      <S.TabsList aria-label="Manage your account">
        {tabs.map(({ id, label, labelIcon: Icon }) => (
          <S.TabTrigger value={id} key={`${id}-trigger`}>
            {Icon && (
              <S.TabTriggerIconContainer>
                <Icon size={16} />
              </S.TabTriggerIconContainer>
            )}
            {label}
          </S.TabTrigger>
        ))}
      </S.TabsList>

      {tabs.map(({ id, content }) => (
        <S.TabsContent value={id} key={`${id}-content`} tabIndex={-1}>
          {content}
        </S.TabsContent>
      ))}
    </S.Tabs>
  );
};
