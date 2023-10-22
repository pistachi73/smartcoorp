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
    offset: 70,
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

            return (
              <TableOfContentsListItem
                key={heading.id}
                $selected={selected}
                className="sb-unstyled"
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
