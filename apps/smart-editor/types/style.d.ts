import { ThemeType } from '@smartcoorp/ui/global-styles';

import type { SmartEditorThemeType } from '../theme/themes.types';
import 'styled-components';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeType, SmartEditorThemeType {}
}
