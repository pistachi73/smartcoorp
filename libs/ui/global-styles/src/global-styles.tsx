import React from 'react';

import { BaseStyles } from './base-styles';
import { NormalizeStyles } from './normalized-styles';

export const GlobalStyles: React.FC = () => {
  return (
    <>
      <NormalizeStyles />
      <BaseStyles />
    </>
  );
};
