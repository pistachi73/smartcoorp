import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';

import { mediaConfined, spaceS } from '../../tokens';
import { Body } from '../body';
import { Button } from '../button';
import { Col, Grid, Row } from '../grid-layout';
import { Headline } from '../headline/headline';

import { Modal, ModalContent, ModalTrigger } from './modal';

export default {
  title: 'Component/Modal',
  component: Modal,
  subcomponents: { ModalContent, ModalTrigger },
  parameters: {
    docs: {
      description: {
        component:
          "A Modal component presents content within a container on top of the application's main UI. Modals can have multiple instances, in which case they will overlay on top of each other. This component supports `react-router`",
      },
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
  },
} as Meta<typeof Modal>;

const CustomButton = styled(Button)`
  width: 100%;

  margin-bottom: ${spaceS};

  @media ${mediaConfined} {
    margin: 0;
  }
`;

const Template: StoryFn<typeof Modal> = (args) => {
  const [show, setShow] = useState(false);

  return (
    <Modal open={show} onOpenChange={setShow}>
      <ModalTrigger asChild>
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

export const Default = {
  render: Template,
  args: {},

  parameters: {
    // ...noCanvas,
  },
};
