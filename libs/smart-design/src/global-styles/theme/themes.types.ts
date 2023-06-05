interface ColorType {
  neutral: string;
  invertedNeutral: string;
}

/** shadows */
interface Shadow {
  shadowS: string;
  shadowM: string;
  shadowL: string;
  shadowXL: string;
}

/** Common color effects */
interface Common {
  disabledBackgroundColor: string;
  disabledSurfaceColor: string;
  overBackgroundNeutral: string;
  backgroundColor: string;
  errorColor: string;
}
interface PrimaryButtonTypes {
  hoverBackgroundColor: string;
  activeBackgroundColor: string;
}
interface SecondaryButtonTypes {
  hoverBackgroundColor: string;
}

/** Menu item interface */
type MenuItem = {
  hoverBackgroundColor: string;
};

interface Menu {
  menuItem: MenuItem;
}

/** Modal interface */
interface Modal {
  backgroundColor: string;
}

/** PostEditor interface */
interface PostEditor {
  linkTool: {
    errorBackgroundColor: string;
  };
  imageTool: {
    hoverBackgroundColor: string;
  };
}

/**Tooltip */
interface Tooltip {
  contentBackgroundColor: string;
  contentHeadingColor: string;
  contentParagraphColor: string;
  contentSpanColor: string;
}

interface ScrollArea {
  thumbColor: string;
  scrollbarBackground: string;
  scrollbarBackgroundHover: string;
}

interface Form {
  hoverColor: string;
  placeholderColor: string;
  neutralColor: string;
  errorColor: string;
  backgroundColor: string;
  select: {
    selectedItemColor: string;
    groupDividerColor: string;
  };
  multipleSelect: {
    selectedValueBackgroundColor: string;
    selectedValueTextColor: string;
    deleteValueHoverBackgroundColor: string;
  };
  calendar: {
    selectedItemBackgroundColor: string;
    selectedRangeLimitBackgroundColor: string;
  };
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
  modal: Modal;
  postEditor: PostEditor;
  tooltip: Tooltip;
  scrollArea: ScrollArea;
  form: Form;
}
