import { Meta, StoryFn } from '@storybook/react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { useState } from 'react';
import { IoBarChartSharp } from 'react-icons/io5';
import styled from 'styled-components';

import { iconArgs, noCanvas } from '../../helpers';
import { TemplateProps } from '../../helpers/storybook.types';
import { gray300, spaceM, spaceXL, spaceXXL } from '../../tokens';
import { Body } from '../body';
import { Button } from '../button';
import { Headline } from '../headline';

import { ResizablePanel } from './resizable-panel';
import { ResizablePanelProps } from './resizable-panel.types';

export default {
  title: 'Component/Resizable Panel',
  description: 'Resizable Panel component for SC projects',
  component: ResizablePanel,

  parameters: {
    maxWidth: true,
    docs: {
      description: {
        component:
          'This component is a Panel used to animate the resizing of a panel. It is used in the `ResizablePanel` component.',
      },
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
  },
} as Meta<typeof ResizablePanel>;

const duration = 0.25;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  width: 75%;
  height: 100%;
  border: 1px solid ${gray300};
  padding: ${spaceXXL};
`;

const Template: StoryFn<ResizablePanelProps> = (args: any) => {
  const [foo, setFoo] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <MotionConfig transition={{ duration }}>
      <Container>
        <Wrapper className="mx-auto mt-8 h-full w-full max-w-sm border border-zinc-500 pt-8">
          <Headline size="medium">Resizable Panel</Headline>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: `${spaceM} 0`,
              marginBottom: spaceM,
            }}
          >
            <Button
              variant="primary"
              size="small"
              onClick={() => setCount(count + 1)}
            >
              Toggle
            </Button>
            <Button
              variant="secondary"
              size="small"
              onClick={() => setFoo(!foo)}
            >
              Rerender ({foo ? 'y' : 'n'})
            </Button>
          </div>

          <ResizablePanel
            variants={{
              initial: {
                opacity: 0,
              },
              animate: {
                opacity: 1,
                transition: { duration: 0.25 / 2, delay: 0.25 / 2 },
              },
              exit: {
                opacity: 0,
                transition: { duration: 0.25 / 2 },
              },
            }}
          >
            {count % 3 === 2 ? (
              <Body noMargin>
                And something longer. Sed ut perspiciatis unde omnis iste natus
                error sit voluptatem accusantium doloremque laudantium, totam
                rem aperiam, eaque ipsa quae ab illo inventore veritatis et
                quasi architecto beatae vitae dicta sunt explicabo.
              </Body>
            ) : count % 3 === 1 ? (
              <Body noMargin>
                Something a bit longer. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Repudiandae modi vel odio.
              </Body>
            ) : (
              <Body noMargin>Something short.</Body>
            )}
          </ResizablePanel>
        </Wrapper>{' '}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: `${spaceM} 0`,
            margin: '0 auto',
            width: '75%',
          }}
        >
          <Body>
            Some other content. Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Eveniet distinctio voluptatum dolore, nobis
            debitis sequi error nisi! Eveniet consectetur consequatur, vero sint
            doloribus ducimus laudantium officiis nam recusandae soluta aliquam?
          </Body>
        </div>
      </Container>
    </MotionConfig>
  );
};

export const Default: TemplateProps<ResizablePanelProps> = {
  render: Template,
  args: {},
};
