import { Meta, StoryFn } from '@storybook/react';
import { IoBarChartSharp } from 'react-icons/io5';
import styled from 'styled-components';

import { iconArgs, noCanvas } from '../../helpers';
import { spaceXL } from '../../tokens';

import { Button } from './button';
import { ButtonProps } from './button.types';

export default {
  title: 'Component/Button',
  description: 'Button component for SC projects',
  component: Button,

  parameters: {
    docs: {
      description: {
        component:
          'Basic Button component to perform navigation inside / outside the project or to perform onClick events',
      },
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
    innerRef: { table: { disable: true } },
    icon: iconArgs,
  },
} as Meta<typeof Button>;

export const Default = {
  args: {
    children: 'Login',
    variant: 'primary',
    size: 'medium',
  },
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${spaceXL};
`;

const ReferenceTemplate: StoryFn<ButtonProps> = (args: any) => {
  return (
    <Container>
      <Button size="medium" variant={args.variant}>
        {args.variant!.charAt(0).toUpperCase() + args.variant!.slice(1)}
      </Button>
      <Button
        size="medium"
        variant={args.variant}
        icon={args.icon}
        iconSize={args.iconSize}
      >
        {args.variant!.charAt(0).toUpperCase() + args.variant!.slice(1)}
      </Button>
      <Button
        size="medium"
        variant={args.variant}
        icon={args.icon}
        iconSize={args.iconSize}
      />
      <Button size="medium" variant={args.variant} loading icon={args.icon}>
        {args.variant!.charAt(0).toUpperCase() + args.variant!.slice(1)}
      </Button>
      <Button size="medium" variant={args.variant} disabled>
        {args.variant!.charAt(0).toUpperCase() + args.variant!.slice(1)}
      </Button>
    </Container>
  );
};

export const SecondaryVariant = {
  render: ReferenceTemplate,

  args: {
    variant: 'secondary',
    icon: IoBarChartSharp,
    iconSize: 18,
  },

  parameters: {
    ...noCanvas,
    docs: {
      description: {
        story: "`Button` component **secondary** variant with it's states",
      },
    },
  },
};

export const TextVariant = {
  render: ReferenceTemplate,

  args: {
    variant: 'text',
    icon: IoBarChartSharp,
    iconSize: 18,
  },

  parameters: {
    ...noCanvas,
    docs: {
      description: {
        story: "`Button` component **text** variant with it's states",
      },
    },
  },
};
