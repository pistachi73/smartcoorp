import React from 'react';

import { BaseStyles } from './base-styles';
import { FontStyles } from './font-styles';
import { NormalizeStyles } from './normalized-styles';

interface Props {
  children: React.ReactNode;
}
export const GlobalStyles: React.FC<Props> = ({ children }) => {
  return (
    <>
      <NormalizeStyles />
      <BaseStyles />
      <FontStyles />
      {children}
    </>
  );
};
