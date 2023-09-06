import { gray100, gray300, gray700 } from '@smartcoorp/ui/tokens';

import type { SmartEditorThemeType } from './themes.types';

export const lightTheme: SmartEditorThemeType = {
  SmartEditor: {
    header: {
      borderColor: gray300,
      backgroundColor: gray100,
    },
    footer: {
      backgroundColor: gray100,
    },
  },
};

export const darkTheme: SmartEditorThemeType = {
  SmartEditor: {
    header: {
      borderColor: gray700,
      backgroundColor: gray100,
    },
    footer: {
      backgroundColor: gray700,
    },
  },
};
