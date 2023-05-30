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

/** Select interface */
type SelectItem = {
  hoverBackgroundColor: string;
  focusBackgroundColor: string;
  selectedBackgroundColor: string;
  selectedHoverBackgroundColor: string;
};
interface Select {
  selectItem: SelectItem;
}

/** SingleSelect interface */
interface SingleSelect {
  unSelectedColor: string;
  selectedColor: string;
  disabledColor: string;
  errorColor: string;
  selectedItemColor: string;
  triggerHoverColor: string;
  groupDividerColor: string;
  groupLabelColor: string;
}

/** MultipleSelect specific interface   */
interface MultipleSelect {
  selectedValueBackgroundColor: string;
  selectedValueTextColor: string;
  deleteValueHoverBackgroundColor: string;
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
  singleSelect: SingleSelect;
  multipleSelect: MultipleSelect;
  scrollArea: ScrollArea;
}
