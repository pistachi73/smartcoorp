export type FocusableElement =
  | HTMLParagraphElement
  | HTMLHeadingElement
  | HTMLOListElement
  | HTMLUListElement
  | any;

export type BlockRefs = HTMLDivElement[];

export type FieldRefs = FocusableElement[][];

export type GetNextFocusableField = (
  blockIndex: number,
  fieldIndex: number,
  direction: 1 | -1
) => [number, number];

export type FocusField = (
  /** [blockIndex, fieldIndex] */
  indexes: [number, number],
  caretPosition: 'start' | 'end' | number
) => void;

export type AddFieldRef = (
  blockIndex: number,
  fieldIndex: number
) => (ref: FocusableElement) => void;

export type AddBlockRef = (blockIndex: number) => (ref: HTMLDivElement) => void;
