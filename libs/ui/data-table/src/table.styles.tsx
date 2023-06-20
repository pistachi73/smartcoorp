import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

import { Button } from '@smartcoorp/ui/button';
import { Headline } from '@smartcoorp/ui/headline';
import {
  blue500,
  borderRadiusM,
  borderRadiusXS,
  gray100,
  gray500,
  gray600,
  green500,
  motionEasingStandard,
  motionTimeXS,
  primary,
  primary600,
  scale060,
  scale070,
  scale110,
  scale140,
  scale220,
  scale370,
  space3XL,
  spaceL,
  spaceM,
  spaceS,
  spaceXL,
  spaceXS,
  yellow500,
} from '@smartcoorp/ui/tokens';

type TableRowProps = {
  $selected?: boolean;
  $uniqueRow?: boolean;
};

export const TableContainer = styled.div`
  width: 100%;
`;
export const Table = styled(motion.table)`
  width: 100%;
  border-spacing: 0px;
  overflow: hidden;
  border-collapse: collapse;
  display: table;

  border-spacing: 0;
  outline: 1px solid ${({ theme }) => theme.form.placeholderColor};
  border-radius: ${borderRadiusXS};
`;

export const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.table.rowHoverColor};
  border-radius: ${borderRadiusM};
`;

export const TableHeader = styled.th`
  height: ${scale110};
  font-size: ${scale060};
  color: ${gray500};
  letter-spacing: 1px;
  font-weight: 600;
  padding: ${spaceXS};

  border-bottom: 1px solid ${({ theme }) => theme.form.placeholderColor};
`;

export const TableHeaderWrapper = styled.div<{ $sortingEnabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 calc(${spaceL} - ${spaceXS});
  border-radius: ${borderRadiusXS};

  transition-property: background-color, color;
  transition-duration: ${motionTimeXS};
  transition-timing-function: ${motionEasingStandard};

  ${({ $sortingEnabled, theme }) =>
    $sortingEnabled &&
    css`
      cursor: pointer;
      &:hover {
        background-color: ${({ theme }) => theme.table.headerHoverColor};
        color: ${theme.color.neutral};
      }
    `}
`;

export const TableHeaderText = styled.div`
  width: 100%;
  height: 40px;
  vertical-align: center;
  display: flex;
  align-items: center;
  position: relative;
`;

export const TableHeaderSortIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  right: -${spaceXL};
  transform: translateY(-50%);
`;

export const TableBody = styled.tbody`
  width: 100%;
`;

export const TableRow = styled.tr<TableRowProps>`
  position: relative;
  width: 100%;

  transition-property: background-color;
  transition-duration: ${motionTimeXS};
  transition-timing-function: ${motionEasingStandard};
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.table.selectedRowColor : theme.backgroundScreen};

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.form.placeholderColor};
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0px;
    width: 2px;
    height: 100%;
    background-color: ${({ $selected, theme }) =>
      $selected && theme.table.selectedRowColor};
  }

  &:hover {
    background-color: ${({ theme }) => theme.table.rowHoverColor};
  }
`;

export const TableCell = styled.td<{ $uniqueCell?: boolean }>`
  color: ${({ theme }) => theme.color.neutral};
  padding: ${spaceL};
  height: ${({ $uniqueCell }) => ($uniqueCell ? scale220 : 'auto')};
  text-align: ${({ $uniqueCell }) => ($uniqueCell ? 'center' : 'left')};
`;

export const TableFooter = styled.tfoot`
  padding: 8px;
  text-align: left;
`;

export const TableActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: ${space3XL};
  margin: ${spaceM} 0;
  width: 100%;
`;

export const LeftTableActionsContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${spaceS};
  min-height: ${scale140};
  flex-wrap: wrap;
`;
export const RightTableActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spaceS};
`;

const FilterContainer = styled.div<{ $type?: 'number' | 'text' }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spaceS};
  ${({ $type }) =>
    $type === 'number' &&
    css`
      display: flex;
      justify-content: space-between;
      gap: ${spaceS};
    `}
`;

const NumberFilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spaceS};
`;

const GlobalFilterContainer = styled.div`
  width: ${scale370};
`;

const StyledButton = styled(Button)<{ variant: 'primary' | 'secondary' }>`
  background-color: ${({ theme, variant }) =>
    variant === 'secondary' && theme.backgroundScreen};
  border-color: ${({ theme, variant }) =>
    variant === 'primary' ? 'transparent' : theme.form.placeholderColor};
`;

const StyledTextButton = styled(Button)<{ $selected?: boolean }>`
  width: 100%;
  justify-content: start;
  font-weight: normal;

  ${({ $selected }) =>
    $selected &&
    css`
      border-color: ${primary};
      background-color: ${({ theme }) =>
        theme.table.selectedRowColor} !important;
    `}
`;

const PopoverDivider = styled.div`
  margin: ${spaceXS} 0;
  width: calc(100% + 24px);
  margin-left: -12px;
  height: 1px;
  background-color: ${({ theme }) => theme.form.placeholderColor};
`;

const RemoveButton = styled(Button)`
  border-color: ${({ theme }) => theme.form.errorColor};
  border-width: 1px;
  color: ${({ theme }) => theme.form.errorColor};

  &:active {
    background-color: ${({ theme }) => theme.form.errorColor};
  }
`;

const InlineFilterButton = styled(StyledButton)<{
  $isFilteredColumn?: boolean;
}>`
  height: ${scale110};
  min-width: ${scale110};

  ${({ $isFilteredColumn }) =>
    $isFilteredColumn &&
    css`
      color: ${primary};
      border-color: ${primary};
      &:hover {
        color: ${primary600};
      }
    `}
`;

const FilterDisplayContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${spaceM};
  border-radius: ${borderRadiusXS};
  color: ${gray600};
  font-size: ${scale070};
  height: ${scale140};

  background-color: ${({ theme }) => theme.table.rowHoverColor};
  border: 1px solid ${({ theme }) => theme.form.placeholderColor};

  & > button {
    height: 100%;
    padding: 0 ${spaceM};
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: ${({ theme }) => theme.form.errorColor};
    }
  }
`;

const FilterDisplayTextSpan = styled.span`
  color: ${gray500};
`;

const FilterDisplayDot = styled.div<{ $type: 'text' | 'number' | 'date' }>`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${({ $type }) =>
    $type === 'text' ? blue500 : $type === 'number' ? yellow500 : green500};
  margin-right: ${spaceS};
`;

const PoppoverContentContainer = styled.div<{ $width?: number }>`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: ${spaceM} ${spaceM};
  /* background-color: ${gray100}; */
  background-color: ${({ theme }) => theme.color.invertedNeutral};
  box-shadow: ${({ theme }) => theme.shadow.shadowM};

  border: 1px solid ${({ theme }) => theme.form.placeholderColor};
  border-radius: ${borderRadiusXS};
  width: ${({ $width }) => ($width ? `${$width}px` : '100%')};
`;

const PoppoverHeadling = styled(Headline)`
  color: ${({ theme }) => theme.form.neutralColor};
  margin-bottom: ${spaceS};
`;

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: ${spaceM} 0;
`;

export const Styled = {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  TableFooter,
  TableHeaderWrapper,
  TableActionsContainer,
  LeftTableActionsContainer,
  RightTableActionsContainer,
  FilterContainer,
  GlobalFilterContainer,
  StyledButton,
  StyledTextButton,
  InlineFilterButton,
  PoppoverContentContainer,
  PoppoverHeadling,
  RemoveButton,
  FilterDisplayContainer,
  FilterDisplayDot,
  FilterDisplayTextSpan,
  FooterContainer,
  PopoverDivider,
  NumberFilterContainer,
  TableHeaderText,
  TableHeaderSortIcon,
};
