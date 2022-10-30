import React from 'react';

import { Styled } from './container.styles';
import { ContainerProps } from './container.types';

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return <Styled.Container className={className}>{children}</Styled.Container>;
};

Container.displayName = 'Container';
