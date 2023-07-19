import React from 'react';

import { BaseStyles } from './base-styles';
import { NormalizeStyles } from './normalized-styles';

import './fonts.css';
export const GlobalStyles: React.FC = () => {
  return (
    <>
      <NormalizeStyles />
      <BaseStyles />
    </>
  );
};
