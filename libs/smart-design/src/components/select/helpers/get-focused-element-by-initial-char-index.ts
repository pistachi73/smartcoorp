import { SelectOption } from '../select.types';

type Props = {
  char: string;
  options: SelectOption[];
  activeElementId?: string;
};

export const getFocusedElementByInitialCharIndex = ({
  char,
  options,
  activeElementId = document.activeElement?.id,
}: Props): number => {
  if (!activeElementId) return -1;

  const focusableOptions = options.filter(({ label }) =>
    label.toLowerCase().startsWith(char)
  );

  if (!focusableOptions.length) return -1;

  const optionsValues = options.map(({ value }) => value);
  const focusableOptionsValues = focusableOptions.map(({ value }) => value);
  const activeElementIndex = focusableOptionsValues.indexOf(activeElementId);

  let nextFocusedElementIndex;
  if (activeElementIndex === -1) {
    nextFocusedElementIndex = optionsValues.indexOf(focusableOptions[0].value);
  } else {
    const index =
      activeElementIndex + 1 <= focusableOptionsValues.length - 1
        ? activeElementIndex + 1
        : 0;
    nextFocusedElementIndex = optionsValues.indexOf(
      focusableOptions[index].value
    );
  }

  return nextFocusedElementIndex;
  document.getElementById(options[nextFocusedElementIndex].value)?.focus();
};
