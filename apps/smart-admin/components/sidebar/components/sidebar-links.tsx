'use client';

import {
  type SidebarLink,
  SidebarLinkComponent,
  type SidebarLinkGroup,
} from './sidebar-link';

export const SidebarLinks = ({
  links,
}: {
  links: (SidebarLink | SidebarLinkGroup)[];
}) => (
  <ul>
    {links.map((link) => (
      <SidebarLinkComponent key={link.title} {...link} />
    ))}
  </ul>
);
