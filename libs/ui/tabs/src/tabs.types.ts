import { IconType } from 'react-icons';

type Tab = {
  id: string;
  label: string;
  labelIcon?: IconType;
  content: React.ReactNode;
  disabled?: boolean;
};

export type TabsProps = {
  /**The value of the tab that should be active when initially rendered. Use when you do not need to control the state of the tabs. */
  defaultTab?: string;
  /**Event handler called when the value changes. */
  onTabChange?: (tab: string) => void;
  /** Tabs */
  tabs: Tab[];
};
