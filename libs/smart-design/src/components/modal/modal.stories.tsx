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
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';

import { mediaConfined, spaceS } from '../../tokens';
import { Body } from '../body';
import { Button } from '../button';
import { Col, Grid, Row } from '../grid-layout';
import { Headline } from '../headline/headline';

import { Modal, ModalContent, ModalTrigger } from './modal';

export default {
  title: 'Layout/Modal',
  component: Modal,
  subcomponents: { ModalContent, ModalTrigger },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Modal</Title>
          <Subtitle>Modal layout component</Subtitle>
          <Description>##Overview</Description>
          <Description>
            A Modal component presents content within a container on top of the
            application's main UI. Modals can have multiple instances, in which
            case they will overlay on top of each other. This component supports
            `react-router`.
          </Description>
          <Description>##Usage</Description>
          <Source
            language="jsx"
            code={`import { Modal, ModalContent, ModalTrigger } from @smart-design/components

                  <Modal>
                    <ModalTrigger>
                      <Button>Open Modal</Button>
                    </ModalTrigger>
                    <ModalContent title="Content title" description="Content description">
                      <h1>Content</h1>
                    </ModalContent>
                  </Modal>`}
            format={true}
          />
          <Description>###Example</Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories title="References" />
          <div id="portal" />
        </>
      ),
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
  },
} as ComponentMeta<typeof Modal>;

const CustomButton = styled(Button)`
  width: 100%;

  margin-bottom: ${spaceS};

  @media ${mediaConfined} {
    margin: 0;
  }
`;

const Template: ComponentStory<typeof Modal> = (args) => {
  const [show, setShow] = useState(false);

  return (
    <Modal open={show} onOpenChange={setShow}>
      <ModalTrigger>
        <Button>Open Modal</Button>
      </ModalTrigger>
      <ModalContent
        title="Example Modal"
        description="Example modal content description"
      >
        <Headline size="xlarge">Modal header</Headline>
        <Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum
          ante sed ultrices consectetur. Fusce accumsan nulla ac consequat
          maximus. Nulla feugiat et lacus nec euismod. Mauris vel cursus enim.
          Nullam pharetra molestie mi eget sodales.{' '}
        </Body>
        <Grid>
          <Row noMargin>
            <Col size={12} sizeConfined={6}>
              <CustomButton>Primary action</CustomButton>
            </Col>
            <Col size={12} sizeConfined={6}>
              <CustomButton variant="secondary">Secondary action</CustomButton>
            </Col>
          </Row>
        </Grid>
      </ModalContent>
    </Modal>
  );
};

export const Default = Template.bind({});
Default.args = {};

Default.parameters = {
  // ...noCanvas,
};
