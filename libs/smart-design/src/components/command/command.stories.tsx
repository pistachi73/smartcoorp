import { Meta, StoryFn } from '@storybook/react';
import {
  BiDownArrowAlt,
  BiDuplicate,
  BiTrash,
  BiUpArrowAlt,
} from 'react-icons/bi';

import { TemplateProps } from '../../helpers';

import {
  Command,
  CommandGroup,
  CommandItem,
  DefaultCommandItemContent,
} from './command';
import { CommandProps, DefaultCommandItemProps } from './command.types';

export default {
  title: 'Component/Command',
  description: 'Command component for SC projects',
  component: Command,
  subcomponents: { CommandGroup, CommandItem },

  parameters: {
    maxWidth: true,
    docs: {
      description: {
        component:
          'The command component is a versatile and powerful tool for executing specific actions or tasks within a React application. This command component provides a user-friendly interface for users to interact with and trigger various functionalities. The command component incorporates a text input field where users can enter commands or keywords to perform specific actions. It utilizes a combination of input parsing, matching algorithms, and event handling to interpret user input and execute the corresponding command or task.',
      },
    },
  },
  argTypes: {},
} as Meta<CommandProps>;

const Template: StoryFn<CommandProps> = (args: CommandProps) => {
  const commandItems: DefaultCommandItemProps[] = [
    {
      label: 'Move up',
      command: ['&#8984;', '&#8593;'], // ⌘ ↑
      icon: <BiUpArrowAlt size={16} />,
      onCommandPress: () => console.log('Move up'),
    },
    {
      label: 'Move down',

      command: ['&#8984;', '&#8595;'], // ⌘ ↓
      icon: <BiDownArrowAlt size={16} />,
      onCommandPress: () => console.log('Move down'),
    },
    {
      label: 'Delete',
      command: ['&#8984;', '&#8592;'], // ⌘ ←
      icon: <BiTrash size={16} />,
      onCommandPress: () => console.log('Delete'),
    },
    {
      label: 'Duplicate block',
      command: ['&#8984;', 'd'], // ⌘ d
      icon: <BiDuplicate size={16} />,
      onCommandPress: () => console.log('Duplicate block'),
    },
  ];

  return (
    <Command {...args}>
      <CommandGroup heading={'List block actions'}>
        {commandItems.map((item, index) => (
          <CommandItem key={index}>
            <DefaultCommandItemContent size={args.size} {...item} />
          </CommandItem>
        ))}
      </CommandGroup>{' '}
    </Command>
  );
};

export const Default: TemplateProps<CommandProps> = {
  render: Template,
  args: {
    size: 'medium',
    inputPlaceholder: 'Filter actions...',
  },
};
