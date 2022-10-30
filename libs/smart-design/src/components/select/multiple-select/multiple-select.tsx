import { AnimatePresence } from 'framer-motion';
import React, { AriaAttributes, useCallback, useEffect, useState } from 'react';
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
import { MultipleSelectProps, SelectOption } from '../select.types';

export const MultipleSelect: React.FC<MultipleSelectProps> = ({
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
  selectAllOption,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<number[]>();
  const activeElement = useActiveElement();

  const labelId = `${id}-label`;
  const valueContainerId = `${id}-value-container`;
  const optionsContainerId = `${id}-options-container`;

  const isFilled = Boolean(selectedOptions?.length);

  const closeSelect = () => setIsOpen(false);
  const toggleSelect = () => setIsOpen(!isOpen);

  /** Get Initial Select Option */
  useEffect(() => {
    if (!defaultValue) return;

    const initialSelection = options.filter(({ value }) =>
      defaultValue.includes(value)
    );

    if (!initialSelection.length) return;

    const initialSelectionIndex = initialSelection.map(({ value }) =>
      options.findIndex(({ value: optionsValue }) => value === optionsValue)
    );

    onChange(defaultValue);
    setSelectedOptions(initialSelectionIndex);
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
    let newSelectedOptions: number[] | undefined;

    if (selectedOptions?.includes(index)) {
      newSelectedOptions = selectedOptions
        .filter((optionIndex) => optionIndex !== index)
        .map((index) => index);
    } else {
      newSelectedOptions = [...(selectedOptions ?? []), index];
    }

    const newValue = [...newSelectedOptions]
      .sort((a, b) => a - b)
      .map((index) => options[index].value);

    onChange(newValue);
    setSelectedOptions(newSelectedOptions);
  };

  const selectAllOptions = () => {
    const optionsIndex = Array.from(Array(options.length), (_, i) => i);
    if (selectedOptions?.length !== optionsIndex.length) {
      const values = optionsIndex.map((i) => options[i].value);
      setSelectedOptions(optionsIndex);
      onChange(values);
    } else {
      setSelectedOptions(undefined);
      onChange([]);
    }
  };

  const deselectOption = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onChange([]);
      setSelectedOptions(undefined);
      e.stopPropagation();
    },
    [onChange, setSelectedOptions]
  );

  const handleOptionsContainerKeyDown = (
    e: React.KeyboardEvent<HTMLUListElement | HTMLDivElement>
  ) => {
    const key = e.key;
    let nextFocusedElementIndex = -1;

    const focusableOptions: SelectOption[] = selectAllOption
      ? [
          { label: 'Select all', value: `selectAll_${optionsContainerId}` },
          ...options,
        ]
      : options;

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
          options: focusableOptions,
        });

        break;
      case key === 'ArrowDown':
      case key === 'ArrowRight':
        e.preventDefault();
        nextFocusedElementIndex = getNextFocusedElementIndex({
          direction: 1,
          options: focusableOptions,
        });
        break;

      case /[a-zA-Z0-9]/.test(key):
        nextFocusedElementIndex = getFocusedElementByInitialCharIndex({
          char: key.toLowerCase(),
          options: focusableOptions,
        });
        break;
      default:
        break;
    }

    document
      .getElementById(focusableOptions[nextFocusedElementIndex]?.value)
      ?.focus();
  };

  const handleOptionKeyDown =
    (index: number, options?: { selectAll?: boolean }) => (e: any) => {
      switch (e.key) {
        case ' ':
        case 'SpaceBar':
        case 'Enter':
          e.preventDefault();
          options?.selectAll ? selectAllOptions() : selectOption(index);
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

  const getSelectedOptionsLabels = () =>
    selectedOptions?.map((index) => options[index].label).join(', ');

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
          {getSelectedOptionsLabels()}
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
                aria-multiselectable={true}
              >
                {selectAllOption && (
                  <SelectItem
                    id={`selectAll_${optionsContainerId}`}
                    tabIndex={0}
                    multiple
                    selected={selectedOptions?.length === options.length}
                    semiSelected={isFilled}
                    onClick={() => selectAllOptions()}
                    onKeyDown={handleOptionKeyDown(0, { selectAll: true })}
                    role="option"
                    aria-selected={selectedOptions?.length === options.length}
                  >
                    Select all
                  </SelectItem>
                )}
                {options.map(
                  ({ value: optionValue, label: optionLabel }, index) => {
                    const selected = selectedOptions?.includes(index) ?? false;

                    return (
                      <SelectItem
                        key={optionValue}
                        id={optionValue}
                        tabIndex={0}
                        selected={selected}
                        onClick={() => selectOption(index)}
                        onKeyDown={handleOptionKeyDown(index)}
                        multiple
                        role="option"
                        aria-selected={selected}
                        size={size}
                        sizeConfined={sizeConfined}
                        sizeWide={sizeWide}
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

MultipleSelect.displayName = 'MultipleSelect';
