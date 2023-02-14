import React from 'react';

import { IconProps } from './icon.types';
export const DownIcon: React.FC<IconProps> = ({ width }) => (
  <svg
    width={width}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 18 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.1428 0.270857C16.6146 -0.133492 17.3248 -0.0788611 17.7291 0.392879C18.1335 0.86462 18.0789 1.57483 17.6071 1.97918L9.73214 8.72916C9.31084 9.09028 8.68916 9.09028 8.26786 8.72916L0.39288 1.97918C-0.0788603 1.57483 -0.133493 0.864618 0.270856 0.392878C0.675205 -0.0788625 1.38542 -0.133494 1.85716 0.270855L9 6.39329L16.1428 0.270857Z"
      fill="black"
    />
  </svg>
);
