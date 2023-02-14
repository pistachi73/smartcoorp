import React from 'react';

import { IconProps } from './icon.types';
export const UpIcon: React.FC<IconProps> = ({ width }) => (
  <svg
    width={width}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 18 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.85716 8.72914C1.38542 9.13349 0.675205 9.07886 0.270856 8.60712C-0.133493 8.13538 -0.0788613 7.42517 0.392879 7.02082L8.26786 0.270836C8.68916 -0.0902786 9.31084 -0.0902786 9.73214 0.270836L17.6071 7.02082C18.0789 7.42517 18.1335 8.13538 17.7291 8.60712C17.3248 9.07886 16.6146 9.13349 16.1428 8.72914L9 2.60671L1.85716 8.72914Z"
      fill="black"
    />
  </svg>
);
