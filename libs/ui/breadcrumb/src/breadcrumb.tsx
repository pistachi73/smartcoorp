import React, { FC, useEffect, useState } from 'react';
import { BiChevronRight, BiHomeAlt } from 'react-icons/bi';

import { useRouter } from 'next/router';

import { Styled as S } from './breadcrumb.styles';
import { BreadcrumbProps } from './breadcrumb.types';

const convertBreadcrumb = (string: string) => {
  return string
    .replace(/-/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü')
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
};

type Breadcrumb = {
  breadcrumb: string;
  href: string;
};
export const Breadcrumb: FC<BreadcrumbProps> = ({ homeUrl }) => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[] | null>(null);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: '/' + linkPath.slice(0, i + 1).join('/'),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return <div>No breadcrumb</div>;
  }

  return (
    <nav aria-label="breadcrumbs">
      <S.OrderedList className="breadcrumb">
        <S.BreadcrumbItem>
          <S.BreadcrumbButton
            to={homeUrl}
            variant="text"
            icon={BiHomeAlt}
            size="small"
            color={'neutral'}
          />
        </S.BreadcrumbItem>
        {breadcrumbs.length > 1 && (
          <S.Separator size="small" variant="neutral" noMargin>
            <BiChevronRight size={18} />
          </S.Separator>
        )}
        {breadcrumbs.map((breadcrumb, i) => {
          return (
            <React.Fragment key={breadcrumb.href}>
              <S.BreadcrumbItem>
                <S.BreadcrumbButton
                  to={breadcrumb.href}
                  variant="text"
                  size="small"
                  color={i === breadcrumbs.length - 1 ? 'primary' : 'neutral'}
                >
                  {convertBreadcrumb(breadcrumb.breadcrumb)}
                </S.BreadcrumbButton>
              </S.BreadcrumbItem>
              {i !== breadcrumbs.length - 1 && (
                <S.Separator size="small" variant="neutral" noMargin>
                  <BiChevronRight size={18} />
                </S.Separator>
              )}
            </React.Fragment>
          );
        })}
      </S.OrderedList>
    </nav>
  );
};
