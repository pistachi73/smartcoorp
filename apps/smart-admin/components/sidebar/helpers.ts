import { BiBook, BiHomeAlt, BiUserCircle } from 'react-icons/bi';

import { SidebarLinkProps } from './components/sidebar-link';

export const tabs: SidebarLinkProps[] = [
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
    title: 'Blog Posts',
    icon: BiBook,
    to: '/blog-post',
  },
];
