import {
  ArgsTable,
  Description,
  PRIMARY_STORY,
  Primary,
  Source,
  Subtitle,
  Title,
} from '@storybook/addon-docs';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import { noCanvas } from '../../../helpers';
import { Grid } from '../grid';
import { Row } from '../row';

import { ColOffset, ColProps, ColSizes } from './col.types';

import { Col } from './index';
export default {
  title: 'Component/Grid/Column',
  component: Col,
  parameters: {
    docs: {
      description: {
        component:
          'Column component goes inside `Row` component. It is used to determine how much space is going to be used by some content inside the row. It goes from `1` to `12` columns',
      },
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
    children: { table: { disabled: true } },
  },
} as Meta<ColProps>;

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
const Template: StoryFn<ColProps> = (args) => {
  return (
    <Grid gridRuler>
      <Row noMargin>
        <Col {...args}>
          <Box size={args.size} offset={args.offset} />
        </Col>
      </Row>
    </Grid>
  );
};

export const Column = {
  render: Template,

  args: {
    size: 6,
  },

  parameters: {
    ...noCanvas,
  },
};
