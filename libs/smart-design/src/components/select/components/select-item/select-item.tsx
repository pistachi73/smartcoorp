import React from 'react';
import { FaCheck, FaMinus } from 'react-icons/fa';

import { Styled } from './select-item.styles';
import { SelectItemProps } from './select-item.types';

export const SelectItem: React.FC<SelectItemProps> = ({
  children,
  selected,
  size = 'medium',
  sizeConfined,
  sizeWide,
  multiple,
  semiSelected,
  ...props
}) => {
  const selectedIcon = () => {
    if (selected) return <FaCheck size={10} />;
    if (semiSelected) return <FaMinus data-testid="semiselected" size={10} />;
  };

  const checked = selected ? true : semiSelected ? 'mixed' : false;

  return (
    <Styled.SelectItem
      $size={size}
      $sizeConfined={sizeConfined}
      $sizeWide={sizeWide}
      $selected={selected}
      tabIndex={0}
      {...props}
    >
      {multiple && (
        <Styled.MultipleSelectCheckbox
          $selected={selected || semiSelected}
          role="checkbox"
          aria-checked={checked}
        >
          {selectedIcon()}
        </Styled.MultipleSelectCheckbox>
      )}
      {children}
    </Styled.SelectItem>
  );
};
