// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { createGlobalStyle, css } from 'styled-components';

import { primary, primary300, scale080, scale100 } from '@smartcoorp/ui/tokens';

export const BaseStyles = createGlobalStyle`
  
  *,
  *::before,
  *::after {
    box-sizing: border-box;
        /* width */
       
  }
  *::-webkit-scrollbar {
      width: 9px;
    }

    /* Track */
    *::-webkit-scrollbar-track {
      ${({ theme }) => css`
        border-left: 1px solid ${theme.scrollArea.scrollbarBackgroundHover};
        background: ${theme.scrollArea.scrollbarBackground};
      `};

      &:hover {
        ${({ theme }) => css`
          background: ${theme.scrollArea.scrollbarBackgroundHover};
        `};
      }
    }

    /* Handle */
    *::-webkit-scrollbar-thumb {
      border: 2px solid rgba(0, 0, 0, 0);
      background-clip: padding-box;
      border-radius: 9999px;
      background-color: ${({ theme }) => theme.scrollArea.thumbColor};
      /* background: ${({ theme }) => theme.scrollArea.thumbColor}; */
    }
  

  ::-moz-selection { /* Code for Firefox */
    background: rgba(179, 212, 252, 0.75);
  }

  ::selection {
    background: rgba(179, 212, 252, 0.75);
  }

  body {
    font-family: "Inter", 'Montserrat', 'Trebuchet MS', Arial, 'Helvetica Neue', sans-serif;
    background: white;
    color: black;
    font-size: ${scale080};
    line-height: ${scale100};
    min-width: 320px;
    margin: 0;

    user-select: text !important;
  }
  
  html{
    scroll-behavior: smooth;
  }
  body {
    visibility: visible;
  }
  
  main {
    width: 100%;
  }
  
  a {
    text-decoration: none;
    color: ${primary};
    &:hover {
      text-decoration: underline;
    }
  
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
