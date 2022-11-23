import { AnimatePresence } from 'framer-motion';
import React, {
  AriaAttributes,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoCloseSharp,
} from 'react-icons/io5';

import { useActiveElement } from '../../../hooks';
import { ClickOutside } from '../../click-outside';
import { SelectItem, SelectValue } from '../components';
import { getFocusedElementByInitialCharIndex } from '../helpers/get-focused-element-by-initial-char-index';
import { getNextFocusedElementIndex } from '../helpers/get-next-focused-element-index';
import { Styled } from '../select.styles';
import { SingleSelectProps } from '../select.types';

export const SingleSelect: FC<SingleSelectProps> = ({
  className,
  options,
  id,
  disabled = false,
  error = false,
  errorMessage,
  label,
  labelDescription,
  innerRef,
  onChange,
  size = 'medium',
  sizeConfined,
  sizeWide,
  defaultValue,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number>();
  const activeElement = useActiveElement();

  const labelId = `${id}-label`;
  const valueContainerId = `${id}-value-container`;
  const optionsContainerId = `${id}-options-container`;

  const isFilled = Boolean(selectedOption || selectedOption === 0);

  const closeSelect = () => setIsOpen(false);
  const toggleSelect = () => setIsOpen(!isOpen);

  /** Get Initial Select Option */
  useEffect(() => {
    if (!defaultValue) return;

    const initialSelection = options.find(
      ({ value }) => value === defaultValue
    );

    if (!initialSelection) return;

    onChange(initialSelection.value);
    setSelectedOption(options.indexOf(initialSelection));
  }, []);

  /** Focus select select options container on open */
  useEffect(() => {
    if (!isOpen) return;
    document.getElementById(optionsContainerId)?.focus();
  }, [isOpen]);

  /** Close select if focused out */
  useEffect(() => {
    if (!isOpen) return;
    const select: HTMLElement | null = document.getElementById(id);
    if (!select?.contains(activeElement)) {
      closeSelect();
    }
  }, [activeElement, id]);

  const selectOption = (index: number) => {
    setSelectedOption(index);
    onChange(options[index].value);
    closeSelect();
    document.getElementById(valueContainerId)?.focus();
  };

  const deselectOption = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onChange('');
      setSelectedOption(undefined);
      e.stopPropagation();
    },
    [onChange, setSelectedOption]
  );

  const handleOptionsContainerKeyDown = (
    e: React.KeyboardEvent<HTMLUListElement | HTMLDivElement>
  ) => {
    const key = e.key;
    let nextFocusedElementIndex = -1;
    switch (true) {
      case key === 'Escape':
        e.preventDefault();
        closeSelect();
        document.getElementById(valueContainerId)?.focus();
        break;
      case key === 'ArrowUp':
      case key === 'ArrowLeft':
        e.preventDefault();
        nextFocusedElementIndex = getNextFocusedElementIndex({
          direction: -1,
          options,
        });

        break;
      case key === 'ArrowDown':
      case key === 'ArrowRight':
        e.preventDefault();
        nextFocusedElementIndex = getNextFocusedElementIndex({
          direction: 1,
          options,
        });
        break;

      case /[a-zA-Z0-9]/.test(key):
        nextFocusedElementIndex = getFocusedElementByInitialCharIndex({
          char: key.toLowerCase(),
          options,
        });
        break;
      default:
        break;
    }

    document.getElementById(options[nextFocusedElementIndex]?.value)?.focus();
  };

  const handleOptionKeyDown = (index: number) => (e: any) => {
    switch (e.key) {
      case ' ':
      case 'SpaceBar':
      case 'Enter':
        e.preventDefault();
        selectOption(index);
        closeSelect();
        break;
      default:
        break;
    }
  };

  const removeSelectedOptions = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    deselectOption(event);
    isOpen
      ? document.getElementById(optionsContainerId)?.focus()
      : document.getElementById(valueContainerId)?.focus();
  };

  const selectValueContainerAria: AriaAttributes = {
    ...(label
      ? { 'aria-labelledby': labelId }
      : { 'aria-label': labelDescription }),
    'aria-expanded': isOpen,
    'aria-haspopup': 'listbox',
    'aria-controls': optionsContainerId,
    'aria-invalid': Boolean(error),
  };

  return (
    <ClickOutside id={id} callback={closeSelect}>
      <Styled.SelectContainer
        $isOpen={isOpen}
        $isFilled={isFilled}
        $isDisabled={disabled}
        $error={error}
        data-xds="Select"
        className={className}
        ref={innerRef}
        {...props}
      >
        {label && (
          <Styled.Label
            $error={error}
            $isDisabled={disabled}
            $size={size}
            $sizeConfined={sizeConfined}
            $sizeWide={sizeWide}
            $isFilled={isFilled}
            $isOpen={isOpen}
            id={labelId}
          >
            {label}
          </Styled.Label>
        )}
        <SelectValue
          id={valueContainerId}
          data-testid="select-value-container"
          disabled={disabled}
          size={size}
          sizeConfined={sizeConfined}
          sizeWide={sizeWide}
          onClick={toggleSelect}
          {...selectValueContainerAria}
        >
          {options[selectedOption ?? -1]?.label}
        </SelectValue>

        <Styled.SelectIconsContainer>
          {isFilled && (
            <Styled.SelectIcon
              onClick={removeSelectedOptions}
              data-testid="remove-selection"
              disabled={disabled}
            >
              <IoCloseSharp size={16} />
            </Styled.SelectIcon>
          )}
          |
          {
            <Styled.SelectIcon
              onClick={toggleSelect}
              data-testid="open-select-icon"
              disabled={disabled}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-controls={optionsContainerId}
            >
              {isOpen ? (
                <IoChevronUpOutline size={16} />
              ) : (
                <IoChevronDownOutline size={16} />
              )}
            </Styled.SelectIcon>
          }
        </Styled.SelectIconsContainer>
      </Styled.SelectContainer>

      <Styled.RelativeContainer>
        <Styled.OptionsContainer
          $error={error}
          $isOpen={isOpen}
          aria-hidden={!isOpen}
          data-testid="select-options-container"
        >
          <AnimatePresence>
            {isOpen && (
              <Styled.OptionsWrapper
                $isOpen={isOpen}
                id={optionsContainerId}
                tabIndex={-1}
                onKeyDown={handleOptionsContainerKeyDown}
                initial={{ maxHeight: 0 }}
                animate={{ maxHeight: 252 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                role="listbox"
              >
                {options.map(
                  ({ value: optionValue, label: optionLabel }, index) => {
                    const selected = selectedOption === index;

                    return (
                      <SelectItem
                        key={optionValue}
                        id={optionValue}
                        selected={selected}
                        onClick={() => selectOption(index)}
                        onKeyDown={handleOptionKeyDown(index)}
                        role="option"
                        aria-selected={selected}
                      >
                        {optionLabel}
                      </SelectItem>
                    );
                  }
                )}
              </Styled.OptionsWrapper>
            )}
          </AnimatePresence>
        </Styled.OptionsContainer>
      </Styled.RelativeContainer>

      {error && errorMessage && (
        <Styled.SelectErrorCaption noMargin>
          {errorMessage}
        </Styled.SelectErrorCaption>
      )}
    </ClickOutside>
  );
};

SingleSelect.displayName = 'SingleSelect';
