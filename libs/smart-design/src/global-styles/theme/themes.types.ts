export interface ColorType {
  neutral: string;
  invertedNeutral: string;
}

/** shadows */
export interface Shadow {
  shadowS: string;
  shadowM: string;
  shadowL: string;
  shadowXL: string;
}

/** Common color effects */
export interface Common {
  disabledBackgroundColor: string;
  disabledSurfaceColor: string;
  overBackgroundNeutral: string;
  backgroundColor: string;
  errorColor: string;
}
export interface PrimaryButtonTypes {
  hoverBackgroundColor: string;
}
export interface SecondaryButtonTypes {
  hoverBackgroundColor: string;
}

/** Menu item interface */
type MenuItem = {
  hoverBackgroundColor: string;
};

export interface Menu {
  menuItem: MenuItem;
}

/** Select interface */
type SelectItem = {
  hoverBackgroundColor: string;
  focusBackgroundColor: string;
  selectedBackgroundColor: string;
  selectedHoverBackgroundColor: string;
};
export interface Select {
  selectItem: SelectItem;
}

/** Modal interface */
export interface Modal {
  backgroundColor: string;
}

/** PostEditor interface */
export interface PostEditor {
  linkTool: {
    errorBackgroundColor: string;
  };
  imageTool: {
    hoverBackgroundColor: string;
  };
}

/**Tooltip */
export interface Tooltip {
  contentBackgroundColor: string;
  contentHeadingColor: string;
  contentParagraphColor: string;
  contentSpanColor: string;
}

export interface ThemeType {
  color: ColorType;
  backgroundScreen: string;
  common: Common;
  shadow: Shadow;

  typography: {
    bodyTextColor: string;
    headlineTextColor: string;
    heroTextColor: string;
    captionTextColor: string;
  };

  button: {
    primary: PrimaryButtonTypes;
    secondary: SecondaryButtonTypes;
  };

  menu: Menu;
  select: Select;
  modal: Modal;
  postEditor: PostEditor;
  tooltip: Tooltip;
}
