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
interface ButtonTypes {
  buttonColor: string;
  buttonColorRGBA: string;
  hoverColor: string;
  activeColor: string;
  activeTextColor: string;
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

  toolbar: {
    iconColor: string;
    formattedIconColor: string;
    tooltipCommandBackgroundColor: string;
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
    selectRangeInsideColor: string;
  };
}

interface Table {
  neutralColor: string;
  selectedRowColor: string;
  rowHoverColor: string;
  headerHoverColor: string;
}

interface Command {
  KBDBacgroundColor: string;
  KBDColor: string;
}

interface Skeleton {
  baseColor: string;
  highlightColor: string;
}

interface FileUpload {
  dragActiveColor: string;
  dragActiveBackgroundColor: string;
  dragRejectColor: string;
  dragRejectBackgroundColor: string;

  isSingleFileUploadedColor: string;
  isSingleFileUploadedBackgroundColor: string;
}

export interface ThemeType {
  color: ColorType;
  backgroundScreen: string;
  common: Common;
  shadow: Shadow;

  typography: {
    bodyTextColor: string;
    neutralTextColor: string;
    warningTextColor: string;
    errorTextColor: string;
    successTextColor: string;
    headlineTextColor: string;
    heroTextColor: string;
    captionTextColor: string;
  };

  button: {
    primary: ButtonTypes;
    neutral: ButtonTypes;
    error: ButtonTypes;
    warning: ButtonTypes;
    success: ButtonTypes;
    shared: {
      secondaryHoverColor: string;
    };
  };

  menu: Menu;
  modal: Modal;
  postEditor: PostEditor;
  tooltip: Tooltip;
  scrollArea: ScrollArea;
  form: Form;
  table: Table;
  command: Command;
  skeleton: Skeleton;
  fileUpload: FileUpload;
}
