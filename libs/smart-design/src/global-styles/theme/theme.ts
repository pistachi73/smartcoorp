import {
  dropShadowDarkL,
  dropShadowDarkM,
  dropShadowDarkS,
  dropShadowDarkXL,
  dropShadowL,
  dropShadowM,
  dropShadowS,
  dropShadowXL,
  gray100,
  gray200,
  gray300,
  gray400,
  gray500,
  gray600,
  gray700,
  gray800,
  gray800_RGBA,
  gray900,
  gray900_RGBA,
  primary100,
  primary200,
  primary400,
  primary600,
  primary700,
  primary800,
  red100,
  red400,
  red500,
  red700,
} from '../../tokens';

import type { ThemeType } from './themes.types';

export const lightTheme: ThemeType = {
  common: {
    disabledBackgroundColor: gray200,
    backgroundColor: gray200,
    disabledSurfaceColor: gray300,
    overBackgroundNeutral: gray400,
    errorColor: red500,
  },
  shadow: {
    shadowS: dropShadowS,
    shadowM: dropShadowM,
    shadowL: dropShadowL,
    shadowXL: dropShadowXL,
  },
  color: {
    neutral: 'black',
    invertedNeutral: 'white',
  },
  backgroundScreen: 'white',

  typography: {
    bodyTextColor: 'black',
    headlineTextColor: 'black',
    heroTextColor: 'black',
    captionTextColor: gray700,
  },

  button: {
    primary: {
      hoverBackgroundColor: primary600,
    },
    secondary: {
      hoverBackgroundColor: gray200,
    },
  },

  menu: {
    menuItem: {
      hoverBackgroundColor: gray200,
    },
  },

  select: {
    selectItem: {
      hoverBackgroundColor: gray200,
      focusBackgroundColor: gray300,
      selectedBackgroundColor: primary100,
      selectedHoverBackgroundColor: primary200,
    },
  },

  modal: {
    backgroundColor: `rgba(${gray900_RGBA}, 0.75)`,
  },

  postEditor: {
    linkTool: {
      errorBackgroundColor: red100,
    },
    imageTool: {
      hoverBackgroundColor: gray500,
    },
  },

  tooltip: {
    contentBackgroundColor: gray900,
    contentHeadingColor: gray100,
    contentParagraphColor: gray200,
    contentSpanColor: gray400,
  },
};

export const darkTheme: ThemeType = {
  common: {
    disabledBackgroundColor: gray800,
    backgroundColor: gray700,
    disabledSurfaceColor: gray600,
    overBackgroundNeutral: gray400,
    errorColor: red400,
  },
  shadow: {
    shadowS: dropShadowDarkS,
    shadowM: dropShadowDarkM,
    shadowL: dropShadowDarkL,
    shadowXL: dropShadowDarkXL,
  },
  color: {
    neutral: 'white',
    invertedNeutral: 'black',
  },
  backgroundScreen: gray900,
  typography: {
    bodyTextColor: gray100,
    headlineTextColor: 'white',
    heroTextColor: 'white',
    captionTextColor: gray300,
  },

  button: {
    primary: {
      hoverBackgroundColor: primary400,
    },
    secondary: {
      hoverBackgroundColor: gray800,
    },
  },

  menu: {
    menuItem: {
      hoverBackgroundColor: gray700,
    },
  },
  select: {
    selectItem: {
      hoverBackgroundColor: gray700,
      focusBackgroundColor: gray600,
      selectedBackgroundColor: primary800,
      selectedHoverBackgroundColor: primary700,
    },
  },

  modal: {
    backgroundColor: `rgba(${gray800_RGBA}, 0.80)`,
  },
  postEditor: {
    linkTool: {
      errorBackgroundColor: red700,
    },
    imageTool: {
      hoverBackgroundColor: gray300,
    },
  },
  tooltip: {
    contentBackgroundColor: gray200,
    contentHeadingColor: gray900,
    contentParagraphColor: gray800,
    contentSpanColor: gray600,
  },
};
