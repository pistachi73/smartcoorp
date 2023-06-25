import { BiBook, BiHomeAlt, BiUserCircle } from 'react-icons/bi';

import { SidebarLink, SidebarLinkGroup } from './components/sidebar-link';

export const tabs: (SidebarLink | SidebarLinkGroup)[] = [
  {
    title: 'Home',
    icon: BiHomeAlt,
    to: '/home',
  },
  {
    title: 'Users',
    icon: BiUserCircle,
    to: '/user',
  },
  {
    title: 'Blog',
    icon: BiBook,
    links: [
      {
        title: 'Posts',
        to: '/blog/posts',
      },
      {
        title: 'Authors',
        to: '/blog/authors',
      },
    ],
  },
];
