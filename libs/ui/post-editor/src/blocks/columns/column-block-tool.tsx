import { useCallback, useState } from 'react';
import { css, styled } from 'styled-components';

import { isNumber } from '@smartcoorp/smart-types';
import {
  Command,
  CommandGroup,
  CommandItem,
  DefaultCommandItemContent,
} from '@smartcoorp/ui/command';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@smartcoorp/ui/dropdown-menu';
import {
  borderRadiusXXS,
  scale020,
  scale180,
  spaceS,
  spaceXXS,
} from '@smartcoorp/ui/tokens';

import { useBlocksDBUpdaterContext } from '../../contexts/blocks-context';

import { OneOneOneRatioIcon } from './icons/1-1-1-ratio';
import { OneOneTwoRatioIcon } from './icons/1-1-2-ratio';
import { OneOneRatioIcon } from './icons/1-1-ratio';
import { OneTwoOneRatioIcon } from './icons/1-2-1-ratio';
import { OneTwoRatioIcon } from './icons/1-2-ratio';
import { TwoOneOneRatioIcon } from './icons/2-1-1-ratio';
import { TwoOneRatioIcon } from './icons/2-1-ratio';

const ColSeparator = styled.div<{ $isOpen?: boolean }>`
  width: ${scale020}; /* 4px */
  height: 100%;
  border-radius: ${borderRadiusXXS};
  opacity: 0.5;

  ${({ $isOpen, theme }) =>
    $isOpen &&
    css`
      background-color: ${theme.form.placeholderColor};
    `}

  transition: background-color 0.2s ease-in-out;
`;
const ColSeparatorContainer = styled.button`
  display: flex;
  justify-content: center;
  min-width: 48px;
  margin-inline: ${spaceS};

  outline: none;

  &:hover ${ColSeparator} {
    background-color: ${({ theme }) => theme.form.placeholderColor};
  }
`;

const ColumnIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: ${scale180};
  padding: ${spaceXXS};
`;

type TwoColTools = '1-1' | '2-1' | '1-2';
type ThreeColTools = '1-1-1' | '2-1-1' | '1-2-1' | '1-1-2';

type ColumnMapping = {
  2: Record<
    TwoColTools,
    {
      label: string;
      icon: JSX.Element;
    }
  >;
  3: Record<
    ThreeColTools,
    {
      label: string;
      icon: JSX.Element;
    }
  >;
};

const columnBlockToolMapping: ColumnMapping = {
  2: {
    '1-1': {
      label: '1-1 column ratio',
      icon: (
        <ColumnIconContainer>
          <OneOneRatioIcon width={50} />
        </ColumnIconContainer>
      ),
    },
    '2-1': {
      label: '2-1 column ratio',
      icon: (
        <ColumnIconContainer>
          <TwoOneRatioIcon width={50} />
        </ColumnIconContainer>
      ),
    },
    '1-2': {
      label: '1-2 column ratio',
      icon: (
        <ColumnIconContainer>
          <OneTwoRatioIcon width={50} />
        </ColumnIconContainer>
      ),
    },
  },
  3: {
    '1-1-1': {
      label: '1-1-1 column ratio',
      icon: (
        <ColumnIconContainer>
          <OneOneOneRatioIcon width={50} />
        </ColumnIconContainer>
      ),
    },
    '2-1-1': {
      label: '2-1-1 column ratio',
      icon: (
        <ColumnIconContainer>
          <TwoOneOneRatioIcon width={50} />
        </ColumnIconContainer>
      ),
    },
    '1-2-1': {
      label: '1-2-1 column ratio',
      icon: (
        <ColumnIconContainer>
          <OneTwoOneRatioIcon width={50} />
        </ColumnIconContainer>
      ),
    },
    '1-1-2': {
      label: '1-1-2 column ratio',
      icon: (
        <ColumnIconContainer>
          <OneOneTwoRatioIcon width={50} />
        </ColumnIconContainer>
      ),
    },
  },
};

type ColumnBlockToolProps = {
  columns: 2 | 3;
  blockId: string;
  distribution?: number[];
};

const getDistributionArray = (distribution: string) =>
  distribution.split('-').map((s) => {
    if (isNumber(s)) {
      return parseInt(s);
    }
    return 1;
  });

export const ColumnBlockTool = ({
  columns,
  blockId,
  distribution,
}: ColumnBlockToolProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const columnTools = columnBlockToolMapping[columns];

  const { setFieldValue } = useBlocksDBUpdaterContext();

  const updateColumnDistribution = useCallback(
    (distribution: string) => {
      const distributionArray = getDistributionArray(distribution);
      setFieldValue({
        blockId,
        blockType: 'columns',
        field: 'distribution',
        value: distributionArray,
      });
    },
    [blockId, setFieldValue]
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <ColSeparatorContainer aria-label="Column block tool">
          <ColSeparator $isOpen={isOpen} />
        </ColSeparatorContainer>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="top" sideOffset={8}>
        <Command label="Command block tool" size="small">
          <CommandGroup heading={'Column ratio settings'}>
            {Object.entries(columnTools)?.map(([key, { icon, label }]) => {
              const distributionArray = getDistributionArray(key);
              const current =
                JSON.stringify(distribution) ==
                JSON.stringify(distributionArray);

              return (
                <CommandItem
                  key={key}
                  onSelect={() => {
                    setIsOpen(false);
                    updateColumnDistribution(key);
                  }}
                  aria-current={current ? 'true' : 'false'}
                >
                  <DefaultCommandItemContent
                    label={label}
                    icon={icon}
                    size="small"
                  />
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
