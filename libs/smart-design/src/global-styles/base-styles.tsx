import { createGlobalStyle } from 'styled-components';

import { borderRadiusXS, scale030, scale080, scale100 } from '../tokens';

export const BaseStyles = createGlobalStyle`
  
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  
  &::-webkit-scrollbar {
    width: ${scale030};
  }
  &::-webkit-scrollbar-track {
    background:  ${({ theme }) => theme.common.backgroundColor};
  }
  
  &::-webkit-scrollbar-thumb {
    border-radius: ${borderRadiusXS};
    background:  ${({ theme }) => theme.common.disabledSurfaceColor};
  }

  &::-webkit-scrollbar-thumb:hover {
    background:${({ theme }) => theme.common.overBackgroundNeutral};
  }

  body {
    font-family: "Inter", 'Montserrat', 'Trebuchet MS', Arial, 'Helvetica Neue', sans-serif;
    background: white;
    color: black;
    font-size: ${scale080};
    line-height: ${scale100};
    min-width: 320px;
    margin: 0;
  }
  
  body {
    visibility: visible;
  }
  
  main {
    width: 100%;
  }
  
  a {
    text-decoration: none;
  }
  
  button{
    padding:0;
    margin:0;
    background: transparent;
    border:none;
    cursor: pointer;
  }

  a:hover,
  a:focus {
  }
  p,
  li {
    font-size: ${scale080};
    line-height: ${scale100};
  }
  
  /* due to https://github.com/necolas/normalize.css/blob/master/CHANGELOG.md#500-october-3-2016 */
  button,
  input,
  select,
  textarea {
    font-family: inherit;
    line-height: inherit;
  }`;
