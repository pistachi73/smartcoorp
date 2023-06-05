import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import { Col } from '../col';
import { ColOffset, ColSizes } from '../col/col.types';
import { Row } from '../row';

import { Grid } from '.';

export default {
  title: 'Component/Grid',
  component: Grid,
  parameters: {
    docs: {
      description: {
        component:
          'Inside Grid component, use Row and Col component to build different layouts',
      },
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
    children: { table: { disabled: true } },
  },
} as Meta<typeof Grid>;

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100%;
  background-color: lightblue;
  border-radius: 8px;
`;

const Box: React.FC<{ offset?: ColOffset; size: ColSizes }> = ({
  offset,
  size,
}) => {
  return (
    <StyledBox>
      <div style={{ display: 'flex' }}>
        <p style={{ marginRight: '12px' }}>
          Size: <b>{size}</b>
        </p>
        {offset && (
          <p>
            Offset: <b>{offset}</b>
          </p>
        )}
      </div>
    </StyledBox>
  );
};

const Template: StoryFn<typeof Grid> = (args) => {
  return (
    <Grid {...args}>
      <Row>
        <Col size={6}>
          <Box size={6} />
        </Col>
        <Col size={6}>
          <Box size={6} />
        </Col>
      </Row>
      <Row>
        <Col size={2}>
          <Box size={2} />
        </Col>
        <Col size={7}>
          <Box size={7} />
        </Col>
      </Row>
      <Row>
        <Col offset={4} size={8}>
          <Box offset={4} size={8} />
        </Col>
      </Row>
    </Grid>
  );
};

export const GridTemplate = {
  render: Template,
};
