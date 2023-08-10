import { sizes } from './command.styles';

export type CommandSizes = keyof typeof sizes;

export type CommandProps = {
  /** Command Label */
  label: string;
  /** Content of the Command */
  children?: React.ReactNode;
  /** The size on mobile screens or larger */
  size?: CommandSizes;
  /** The size on tablet screens or larger */
  sizeConfined?: CommandSizes;
  /** The size on desktop screens or larger */
  sizeWide?: CommandSizes;
  /** Custom stylung */
  className?: string;
  /** Input placeholder */
  inputPlaceholder?: string;
  /**@callback */
  onKeyDown?: (e: React.KeyboardEvent) => void;
};

export type DefaultCommandItemProps = {
  /** Label of the command */
  label: string;

  /** Icon of the command */
  icon?: JSX.Element;
  /** Keys to be pressed */
  command?: string[];
  /** On Command Press */
  onCommandPress?: () => void;
  /** The size on mobile screens or larger */
  size?: CommandSizes;
  /** The size on tablet screens or larger */
  sizeConfined?: CommandSizes;
  /** The size on desktop screens or larger */
  sizeWide?: CommandSizes;
};
