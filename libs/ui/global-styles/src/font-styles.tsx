import { createGlobalStyle } from 'styled-components';

import fontInterBoldWoff from './assets/Inter-Bold.woff';
import fontInterBoldWoff2 from './assets/Inter-Bold.woff2';
import fontInterBoldItalicWoff from './assets/Inter-BoldItalic.woff';
import fontInterRegularItalicWoff2 from './assets/Inter-BoldItalic.woff2';
import fontInterRegularItalicWoff from './assets/Inter-Italic.woff';
import fontInterBoldItalicWoff2 from './assets/Inter-Italic.woff2';
import fontInterRegularWoff from './assets/Inter-Regular.woff';

const fonts = [
  {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontStyle: 'normal',
    woff2: fontInterRegularItalicWoff2,
    woff: fontInterRegularWoff,
  },
  {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontStyle: 'italic',
    woff2: fontInterRegularItalicWoff2,
    woff: fontInterRegularItalicWoff,
  },
  {
    fontFamily: 'Inter',
    fontWeight: 700,
    fontStyle: 'normal',
    woff2: fontInterBoldWoff2,
    woff: fontInterBoldWoff,
  },
  {
    fontFamily: 'Inter',
    fontWeight: 700,
    fontStyle: 'italic',
    woff2: fontInterBoldItalicWoff2,
    woff: fontInterBoldItalicWoff,
  },
];

const fontsString = fonts
  .map(({ fontFamily, fontWeight, fontStyle, woff, woff2 }) => {
    return `
      @font-face {
        font-family: ${fontFamily};
        font-display: block;
        font-style: ${fontStyle};
        font-weight: ${fontWeight};
        src: url(${woff}) format("woff");
      }`;
  })
  .join('')
  .replace(/\n|^\s+/gm, '');

export const FontStyles = createGlobalStyle`
${fontsString}
`;
