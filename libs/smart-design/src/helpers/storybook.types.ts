import { ArgTypes, Parameters, StoryFn } from '@storybook/react';

export type TemplateProps<Props> = {
  render: StoryFn<Props>;
  args?: Partial<Props> | undefined;
  parameters?: Parameters | undefined;
};
