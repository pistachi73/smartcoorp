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
  primary,
  primary100,
  primary200,
  primary300,
  primary400,
  primary600,
  primary700,
  primary800,
  primary900,
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
    neutral: gray900,
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
      activeBackgroundColor: primary700,
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

  scrollArea: {
    thumbColor: gray300,
    scrollbarBackgroundHover: gray200,
    scrollbarBackground: gray100,
  },

  form: {
    neutralColor: gray400,
    placeholderColor: gray300,
    hoverColor: gray200,
    errorColor: red500,
    backgroundColor: 'white',
    select: {
      selectedItemColor: primary100,
      groupDividerColor: gray200,
    },
    multipleSelect: {
      selectedValueBackgroundColor: primary200,
      selectedValueTextColor: primary800,
      deleteValueHoverBackgroundColor: primary400,
    },
    calendar: {
      selectedItemBackgroundColor: primary400,
      selectRangeInsideColor: primary200,
    },
  },

  table: {
    neutralColor: gray400,
    selectedRowColor: primary100,
    rowHoverColor: gray100,
    headerHoverColor: gray200,
  },

  command: {
    KBDBacgroundColor: primary100,
    KBDColor: primary,
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
    invertedNeutral: gray900,
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
      activeBackgroundColor: primary300,
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

  scrollArea: {
    thumbColor: gray600,
    scrollbarBackgroundHover: gray700,
    scrollbarBackground: gray800,
  },

  form: {
    neutralColor: gray500,
    placeholderColor: gray600,
    hoverColor: gray800,
    errorColor: red700,
    backgroundColor: gray900,

    select: {
      selectedItemColor: primary800,
      groupDividerColor: gray700,
    },
    multipleSelect: {
      selectedValueBackgroundColor: primary800,
      selectedValueTextColor: primary200,
      deleteValueHoverBackgroundColor: primary700,
    },
    calendar: {
      selectedItemBackgroundColor: primary600,
      selectRangeInsideColor: primary800,
    },
  },

  table: {
    neutralColor: gray500,
    selectedRowColor: primary900,
    rowHoverColor: gray800,
    headerHoverColor: gray700,
  },
  command: {
    KBDBacgroundColor: primary800,
    KBDColor: primary300,
  },
};
