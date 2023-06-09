import { format } from 'date-fns';
import { useRef } from 'react';
import {
  CaptionProps,
  DayPicker as DayPickerPrimitive,
  DayProps,
  useDayRender,
  useNavigation,
} from 'react-day-picker';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import styled, { css } from 'styled-components';

import {
  borderRadiusXS,
  focusShadow,
  motionEasingStandard,
  motionTimeS,
  motionTimeXS,
  scale110,
  scale140,
  spaceL,
  spaceM,
  spaceS,
  spaceXXS,
} from '@smartcoorp/ui/tokens';

const DayPicker = styled(DayPickerPrimitive)`
  .rdp-months {
    display: flex;
    width: 100%;
  }
  .rdp-month {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .rdp-caption {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .rdp-day {
    width: ${scale140};
    height: ${scale140};
    border-radius: ${borderRadiusXS};
    font-size: 14px;

    border-style: solid;
    border-width: 1px;
    border-color: transparent;

    transition-property: background-color;
    transition-duration: ${motionTimeS};
    transition-timing-function: ${motionEasingStandard};
    color: ${({ theme }) => theme.color.neutral};

    &:hover {
      background-color: ${({ theme }) => theme.form.hoverColor};
    }

    &:focus-visible {
      ${focusShadow}
    }
  }
  .rdp-day_today {
    font-weight: 500;
    background-color: ${({ theme }) => theme.form.hoverColor};
    color: ${({ theme }) => theme.color.neutral};
  }

  .rdp-day_outside {
    color: ${({ theme }) => theme.form.placeholderColor};
  }
  .rdp-day_selected {
    font-weight: 500 !important;

    background-color: ${({ theme }) =>
      theme.form.calendar.selectedItemBackgroundColor} !important;
    color: ${({ theme }) => theme.color.neutral} !important;
  }
  .rdp-day_range_start,
  .rdp-day_range_end {
    background-color: ${({ theme }) =>
      theme.form.calendar.selectedItemBackgroundColor} !important;
  }

  .rdp-day_range_middle {
    background-color: ${({ theme }) =>
      theme.form.calendar.selectRangeInsideColor} !important;
  }

  .rdp-row {
    width: 100%;
    display: flex;
    gap: ${spaceXXS};
    margin-top: ${spaceXXS};
  }
  .rdp-head {
    display: flex;
    gap: ${spaceM};

    .rdp-head_cell {
      font-weight: 500;
      width: calc(2px + ${scale140});
      font-size: 14px;
      color: ${({ theme }) => theme.form.neutralColor} !important;
    }
  }
`;

const Container = styled.div<{ $withBorder?: boolean }>`
  width: 100%;
  height: 100%;
  max-width: 298px;
  display: flex;
  flex-direction: column;

  border-radius: ${borderRadiusXS};
  background-color: ${({ theme }) => theme.form.backgroundColor};

  ${({ theme, $withBorder }) =>
    $withBorder &&
    css`
      padding: ${spaceL} calc(${spaceL} - ${spaceS});
      padding-bottom: calc(${spaceL} - ${spaceS});
      border: 1px solid ${theme.form.placeholderColor};
    `}
`;

const CaptionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: ${spaceS};
  padding: 0 ${spaceS};
`;

const CaptionButtonContainer = styled.button`
  width: ${scale110};
  height: ${scale110};

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.form.neutralColor};
  border-radius: ${borderRadiusXS};
  border: 1px solid ${({ theme }) => theme.form.placeholderColor};

  transition-property: border, background-color, color;
  transition-duration: ${motionTimeXS};
  transition-timing-function: ${motionEasingStandard};

  &:hover {
    color: ${({ theme }) => theme.color.neutral};
    border-color: ${({ theme }) => theme.form.neutralColor};
    background-color: ${({ theme }) => theme.form.hoverColor};
  }

  &:focus-visible {
    ${focusShadow}
    background-color: ${({ theme }) => theme.form.hoverColor};
    color: ${({ theme }) => theme.color.neutral};
  }
`;

const CaptionLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  color: ${({ theme }) => theme.color.neutral};
`;

export const SelectContainer = styled.div`
  margin-bottom: ${spaceM};
  padding: 0 ${spaceS};
`;

export const Styled = {
  DayPicker,
  Container,
  SelectContainer,
};

export const Caption = (props: CaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <CaptionContainer>
      <CaptionButtonContainer
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
      >
        <BiChevronLeft size={16} />
      </CaptionButtonContainer>
      <CaptionLabel>{format(props.displayMonth, 'MMMM yyy')}</CaptionLabel>
      <CaptionButtonContainer
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
      >
        <BiChevronRight size={16} />
      </CaptionButtonContainer>
    </CaptionContainer>
  );
};

export const Day = (props: DayProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { date, displayMonth } = props;
  const { divProps, isButton, buttonProps } = useDayRender(
    date,
    displayMonth,
    buttonRef
  );

  const t = format(date, 'dd');
  return isButton ? (
    <button ref={buttonRef} {...buttonProps}>
      {t}
    </button>
  ) : (
    <div {...divProps}>{t}</div>
  );
};
