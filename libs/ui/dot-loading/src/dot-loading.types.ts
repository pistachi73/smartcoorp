import { sizes } from './dot-loading.styles';

export type DotLoadingSizes = keyof typeof sizes;
export type DotLoadingProps = {
  /** Custom styles */
  className?: string;
  /** Loader dimensions */
  size?: DotLoadingSizes;
  /** Loader for disabled components */
  disabled?: boolean;
};
