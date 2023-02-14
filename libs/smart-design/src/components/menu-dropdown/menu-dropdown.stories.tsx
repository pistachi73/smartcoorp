import {
  ArgsTable,
  Description,
  PRIMARY_STORY,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import { noCanvas, setPropDocumentation } from '../../helpers';
import { scale300, space4XL, spaceM } from '../../tokens';

import { MenuDropdown } from './menu-dropdown';

export default {
  title: 'Components/MenuDropdown',
  component: MenuDropdown,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>MenuDropdown</Title>
          <Subtitle>MenuDropdown typography Smartcookie component</Subtitle>
          <Description>
            The `MenuDropdown` component is used for common paragraph copies
            arround SC projects.
          </Description>
          <Description>
            `MenuDropdown` component uses a different `font style` from the rest
            of the typograpography components. It uses `Oswald`
          </Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories title="Reference" />
        </>
      ),
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
    children: setPropDocumentation({ control: 'text' }),
    size: setPropDocumentation({ control: 'inline-radio' }),
    sizeConfined: setPropDocumentation({ control: 'inline-radio' }),
    sizeWide: setPropDocumentation({ control: 'inline-radio' }),
  },
} as ComponentMeta<typeof MenuDropdown>;

const Template: ComponentStory<typeof MenuDropdown> = (args) => (
  <MenuDropdown {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
