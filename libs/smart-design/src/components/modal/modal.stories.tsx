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
import React, { useState } from 'react';
import styled from 'styled-components';

import { noCanvas } from '../../helpers';
import { mediaConfined, spaceS } from '../../tokens';
import { Body } from '../body';
import { Button } from '../button';
import { Col, Grid, Row } from '../grid-layout';
import { Headline } from '../headline/headline';

import { Modal as ModalComponent } from './modal';

export default {
  title: 'Layout/Modal',
  component: ModalComponent,
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
            language="js"
            code={`import { Modal } from @smart-design/components`}
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
    onClose: { type: 'function' },
    onBackgroundClick: { type: 'function' },
  },
} as ComponentMeta<typeof ModalComponent>;

const CustomButton = styled(Button)`
  width: 100%;

  margin-bottom: ${spaceS};

  @media ${mediaConfined} {
    margin: 0;
  }
`;

const Template: ComponentStory<typeof ModalComponent> = (args) => {
  const [show, setShow] = useState(false);

  const closeModal = () => setShow(false);

  return (
    <>
      <Button onClick={() => setShow(true)}>Open Modal</Button>
      <ModalComponent
        {...args}
        show={show}
        onClose={closeModal}
        onBackgroundClick={closeModal}
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
      </ModalComponent>
    </>
  );
};

export const Modal = Template.bind({});
Modal.args = {
  rootId: 'docs-root',
};

Modal.parameters = {
  ...noCanvas,
};
