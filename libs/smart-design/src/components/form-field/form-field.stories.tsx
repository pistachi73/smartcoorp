import {
  ArgsTable,
  Description,
  PRIMARY_STORY,
  Primary,
  Source,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs';
import { Meta, StoryFn } from '@storybook/react';
import React, { ChangeEvent, useState } from 'react';
import { IoCaretUpCircle } from 'react-icons/io5';

import { iconArgs, noCanvas, setPropDocumentation } from '../../helpers';

import { FormField as FormFieldComponent } from './form-field';
import { FormFieldSize } from './form-field.types';

export default {
  title: 'Component/FormField',
  component: FormFieldComponent,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>FormField</Title>
          <Subtitle>FormField component for SC projects</Subtitle>
          <Description>##Overview</Description>
          <Description>
            `FormField` component is used as **Input** field for forms
          </Description>

          <Description>##Usage</Description>
          <Source
            language="tsx"
            code={`import { FormField } from @smart-design/components`}
          />
          <Description>###Example</Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories title="References" />
        </>
      ),
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onBlur: { table: { disable: true } },
    onFocus: { table: { disable: true } },
    innerRef: { table: { disable: true } },
    icon: iconArgs,
    size: setPropDocumentation({ control: 'inline-radio' }),
    sizeConfined: setPropDocumentation({ control: 'inline-radio' }),
    sizeWide: setPropDocumentation({ control: 'inline-radio' }),
  },
} as Meta<typeof FormFieldComponent>;

const Template: StoryFn<typeof FormFieldComponent> = ({
  id,
  label,
  size,
  error,
  errorMessage,
  icon: Icon,
  sizeConfined,
  sizeWide,
  variant,
  multiline,
  disabled,
  value: templateValue,
}) => {
  const [value, setValue] = useState<string>('');

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    <FormFieldComponent
      value={templateValue ?? value}
      id={`${size}_${id}`}
      label={label}
      size={size as FormFieldSize}
      error={error}
      errorMessage={errorMessage}
      icon={Icon}
      sizeWide={sizeWide}
      sizeConfined={sizeConfined}
      variant={variant}
      multiline={multiline}
      disabled={disabled}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
    />
  );
};

export const Default = {
  render: Template,

  args: {
    label: 'Default label',
    id: 'default',
    size: 'medium',
  },
};

export const WithValueDisabled = {
  render: Template,

  args: {
    label: 'Default label',
    id: 'disabled',
    size: 'medium',
    value: 'I am disabled',
    disabled: true,
  },

  parameters: {
    ...noCanvas,
    docs: {
      description: {
        story:
          '`FormField` component **primary** variant with **value** and **disabled**.',
      },
    },
  },
};

export const WithIcon = {
  render: Template,

  args: {
    label: 'With Icon',
    id: 'wIcon',
    size: 'medium',
    icon: IoCaretUpCircle,
  },

  parameters: {
    ...noCanvas,
    docs: {
      description: {
        story: '`FormField` component **primary** variant with **Icon**.',
      },
    },
  },
};

export const WithError = {
  render: Template,

  args: {
    label: 'With Error',
    id: 'wError',
    size: 'medium',
    error: true,
    errorMessage: 'this is an error message',
  },

  parameters: {
    ...noCanvas,
    docs: {
      description: {
        story: '`FormField` component **primary** variant with **Error**.',
      },
    },
  },
};

export const WithErrorAndIcon = {
  render: Template,

  args: {
    label: 'With Error',
    id: 'wErrorIcon',
    size: 'medium',
    error: true,
    errorMessage: 'this is an error message',
    icon: IoCaretUpCircle,
  },

  parameters: {
    ...noCanvas,
    docs: {
      description: {
        story:
          '`FormField` component **primary** variant with **Error** and **Icon**.',
      },
    },
  },
};

export const Password = {
  render: Template,

  args: {
    label: 'Password variant',
    id: 'passwordVariuant',
    size: 'medium',
    variant: 'password',
  },

  parameters: {
    ...noCanvas,
    docs: {
      description: {
        story: '`FormField` component **password** variant.',
      },
    },
  },
};

export const Textarea = {
  render: Template,

  args: {
    label: 'Add your message here',
    id: 'multiline',
    size: 'medium',
    multiline: true,
  },

  parameters: {
    ...noCanvas,
    docs: {
      description: {
        story:
          '`FormField` **textarea** component. Used for large multiline blocks of texts like descriptions, messages etc...',
      },
    },
  },
};
