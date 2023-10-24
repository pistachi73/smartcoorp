'use client';

import React, { FC } from 'react';
import { BiChevronRight, BiHomeAlt } from 'react-icons/bi';

import {
  BreadcrumbButton,
  BreadcrumbItem,
  OrderedList,
  Separator,
} from './breadcrumb.styles';
import type { BreadcrumbProps } from './breadcrumb.types';

export const Breadcrumb: FC<BreadcrumbProps> = ({
  breadcrumbs,
  homeUrl,
  ...props
}) => {
  return (
    <nav aria-label="breadcrumbs" {...props}>
      <OrderedList className="breadcrumb">
        <BreadcrumbItem>
          <BreadcrumbButton
            to={homeUrl}
            variant="text"
            icon={BiHomeAlt}
            size="small"
            color={'neutral'}
          />
        </BreadcrumbItem>
        {breadcrumbs.length >= 1 && (
          <Separator size="small" variant="neutral" noMargin>
            <BiChevronRight size={18} />
          </Separator>
        )}
        {breadcrumbs.map((breadcrumb, i) => {
          return (
            <React.Fragment key={breadcrumb.href}>
              <BreadcrumbItem>
                <BreadcrumbButton
                  forwardedAs={
                    i === breadcrumbs.length - 1 ? 'span' : undefined
                  }
                  to={breadcrumb.href}
                  variant="text"
                  size="small"
                  color={i === breadcrumbs.length - 1 ? 'primary' : 'neutral'}
                  $isLastItem={i === breadcrumbs.length - 1}
                >
                  {breadcrumb.label}
                </BreadcrumbButton>
              </BreadcrumbItem>
              {i !== breadcrumbs.length - 1 && (
                <Separator size="small" variant="neutral" noMargin>
                  <BiChevronRight size={18} />
                </Separator>
              )}
            </React.Fragment>
          );
        })}
      </OrderedList>
    </nav>
  );
};
