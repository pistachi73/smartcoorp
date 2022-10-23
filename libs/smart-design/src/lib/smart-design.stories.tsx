import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SmartDesign } from './smart-design';

const Story: ComponentMeta<typeof SmartDesign> = {
  component: SmartDesign,
  title: 'SmartDesign',
};
export default Story;

const Template: ComponentStory<typeof SmartDesign> = (args) => (
  <SmartDesign {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
