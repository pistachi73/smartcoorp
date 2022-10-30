import { SelectOption } from '../select.types';

type Props = {
  direction: -1 | 1;
  options: SelectOption[];
  activeElementId?: string;
};

export const getNextFocusedElementIndex = ({
  direction,
  options,
  activeElementId = document.activeElement?.id,
}: Props): number => {
  if (!activeElementId) return -1;

  const optionsValues = options.map(({ value }) => value);
  const activeElementIndex = optionsValues.indexOf(activeElementId);

  let nextFocusedElementIndex;

  if (direction === -1) {
    nextFocusedElementIndex =
      activeElementIndex - 1 >= 0 ? activeElementIndex - 1 : options.length - 1;
  } else {
    nextFocusedElementIndex =
      activeElementIndex + 1 <= options.length - 1 ? activeElementIndex + 1 : 0;
  }

  return nextFocusedElementIndex;
};
