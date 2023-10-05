import { FC, useState } from 'react';

import { Styled as S } from './tabs.styles';
import type { TabsProps } from './tabs.types';

const duration = 0.3;

export const Tabs: FC<TabsProps> = ({ defaultTab, tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab ?? tabs[0].id);

  return (
    <S.Tabs
      defaultValue={defaultTab ?? tabs[0].id}
      onValueChange={(t: string) => {
        setActiveTab(t);
        onTabChange && onTabChange();
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
      {/* <S.VisibleResizablePanel
        // animationKey={activeTab}
        // duration={duration}
        // variants={{
        //   initial: { x: '-20%', opacity: 0 },
        //   animate: {
        //     x: 0,
        //     opacity: 1,
        //     transition: { duration: duration / 2, delay: duration / 2 },
        //   },
        //   exit: {
        //     x: '20%',
        //     opacity: 0,
        //     transition: { duration: duration / 2 },
        //   },
        //   transition: {
        //     type: 'spring',
        //     damping: 20,
        //     stiffness: 100,
        //     mass: 0.8,
        //   },
        // }}
      > */}
      {tabs.map(({ id, content }) => (
        <S.TabsContent
          value={id}
          key={`${id}-content`}
          forceMount
          tabIndex={-1}
        >
          {activeTab === id && content}
        </S.TabsContent>
      ))}
      {/* </S.VisibleResizablePanel> */}
    </S.Tabs>
  );
};
