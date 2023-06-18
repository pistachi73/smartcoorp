import React from 'react';

import { IconProps } from './icon.types';
export const ImageIcon: React.FC<IconProps> = ({ width }) => (
  <svg
    width={width}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.5195 21.4375C22.6397 21.014 23.0794 20.7684 23.5017 20.8889C23.924 21.0094 24.1689 21.4504 24.0488 21.8739C23.6624 23.2357 22.5831 24.303 21.1884 24.6526L8.26571 27.8922C6.08124 28.3984 3.93843 27.0741 3.44227 24.9181L0.102625 10.4056C-0.384681 8.28803 0.909291 6.16924 3.01174 5.64215L6.01528 4.88916C6.44124 4.78237 6.87287 5.04208 6.97936 5.46923C7.08585 5.89638 6.82687 6.32923 6.40091 6.43601L3.39737 7.18901C2.1359 7.50526 1.35952 8.77653 1.6519 10.0471L4.99155 24.5595C5.28922 25.8531 6.57479 26.6476 7.89391 26.342L20.8027 23.1057C21.6401 22.8958 22.2873 22.2559 22.5195 21.4375ZM26.41 16.4116V3.98615C26.41 2.66526 25.3422 1.59446 24.025 1.59446H9.71506C8.39787 1.59446 7.33007 2.66526 7.33007 3.98615V13.2227L10.7429 9.80027C11.0534 9.48893 11.5567 9.48893 11.8672 9.80027L17.7663 15.716L21.994 12.8896C22.3093 12.6788 22.7292 12.7205 22.9972 12.9892L26.41 16.4116ZM26.3901 18.6466L22.3337 14.5788L18.106 17.4052C17.7907 17.616 17.3709 17.5743 17.1029 17.3056L11.3051 11.4915L7.33007 15.4776V18.3363C7.33007 19.6572 8.39787 20.728 9.71506 20.728H24.025C25.2374 20.728 26.2384 19.8209 26.3901 18.6466ZM9.71506 0H24.025C26.2203 0 28 1.78466 28 3.98615V18.3363C28 20.5378 26.2203 22.3225 24.025 22.3225H9.71506C7.51974 22.3225 5.74008 20.5378 5.74008 18.3363V3.98615C5.74008 1.78466 7.51974 0 9.71506 0ZM20.05 3.18892H23.23C24.1081 3.18892 24.82 3.90279 24.82 4.78338V7.9723C24.82 8.8529 24.1081 9.56677 23.23 9.56677H20.05C19.1719 9.56677 18.46 8.8529 18.46 7.9723V4.78338C18.46 3.90279 19.1719 3.18892 20.05 3.18892ZM20.05 4.78338V7.9723H23.23V4.78338H20.05Z"
      fill="black"
    />
  </svg>
);