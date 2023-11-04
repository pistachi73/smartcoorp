'use client';

import type { IconType } from 'react-icons';
import {
  BsBook,
  BsCodeSlash,
  BsLock,
  BsPerson,
  BsTerminal,
} from 'react-icons/bs';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Body } from '@smartcoorp/ui/body';

import { Nav, NavGroup, NavItem } from './user-dashboard.layout.styles';

type NavItem = {
  name: string;
  icon: IconType;
  href: string;
};

type NavGroup = {
  name: string;
  items: NavItem[];
};

const navList: (NavItem | NavGroup)[] = [
  {
    name: 'MAIN',
    items: [
      {
        name: 'Posts',
        icon: BsBook,
        href: '/posts',
      },
      {
        name: 'API Keys',
        icon: BsLock,
        href: '/api-keys',
      },
    ],
  },
  {
    name: 'DOCUMENTATION',
    items: [
      {
        name: 'API Reference',
        icon: BsTerminal,
        href: '/api-reference',
      },
      {
        name: 'JSON Rendering',
        icon: BsCodeSlash,
        href: '/json-rendering',
      },
    ],
  },
];

export const SidebarNav = () => {
  const pathname = usePathname();

  const onItemClick = () => {
    const toggle = document.getElementById('toggle') as HTMLInputElement;
    toggle.checked = false;
  };
  return (
    <Nav>
      {navList.map((navItemOrGroup) => {
        if ('items' in navItemOrGroup) {
          return (
            <NavGroup key={navItemOrGroup.name}>
              <Body size="xsmall" noMargin variant="neutral" fontWeight="bold">
                {navItemOrGroup.name}
              </Body>
              {navItemOrGroup.items.map((navItem) => {
                const isActive = pathname.includes(navItem.href);

                return (
                  <NavItem key={navItem.name} onClick={onItemClick}>
                    <Link
                      href={navItem.href}
                      className={isActive ? 'active' : ''}
                    >
                      <navItem.icon size={18} />
                      {navItem.name}
                    </Link>
                  </NavItem>
                );
              })}
            </NavGroup>
          );
        }

        const isActive = pathname.includes(navItemOrGroup.href);

        return (
          <NavItem key={navItemOrGroup.name} onClick={onItemClick}>
            <Link href={navItemOrGroup.href}>
              <navItemOrGroup.icon
                size={18}
                className={isActive ? 'active' : ''}
              />
              {navItemOrGroup.name}
            </Link>
          </NavItem>
        );
      })}
    </Nav>
  );
};
