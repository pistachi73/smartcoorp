'use client';

import { useScrollspy } from '@smartcoorp/smart-hooks';
import { Body } from '@smartcoorp/ui/body';
import { DeviceOnly } from '@smartcoorp/ui/device-only';

import {
  TableOfCntentsList,
  TableOfContentsLink,
  TableOfContentsListItem,
  TableOfContentsNav,
} from './table-of-contents.styles';

export type Heading = {
  id: string;
  text: string;
  level: number;
};

export const TableOfContent = ({ headings }: { headings: Heading[] }) => {
  const ids = headings.map(({ id }) => id);
  const [currentActiveIndex] = useScrollspy(ids, {
    offset: 300,
  });

  return (
    <DeviceOnly allowedDevices={['tablet', 'desktop']}>
      <TableOfContentsNav>
        <Body size="xsmall" fontWeight="bold" noMargin>
          ON THIS PAGE
        </Body>
        <TableOfCntentsList>
          {headings.map((heading, i) => {
            const selected = i === currentActiveIndex;
            const lader = heading.level !== headings[i - 1]?.level && i !== 0;
            const laderDirection =
              heading.level > headings[i - 1]?.level ? 'up' : 'down';

            return (
              <TableOfContentsListItem
                key={heading.id}
                className="sb-unstyled"
                $selected={selected}
                $level={heading.level}
                $lader={lader}
                $laderDirection={laderDirection}
              >
                <TableOfContentsLink
                  href={`#${heading.id}`}
                  target="_self"
                  $selected={selected}
                >
                  {heading.text}
                </TableOfContentsLink>
              </TableOfContentsListItem>
            );
          })}
        </TableOfCntentsList>
      </TableOfContentsNav>
    </DeviceOnly>
  );
};
