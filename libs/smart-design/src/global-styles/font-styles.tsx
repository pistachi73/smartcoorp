import { createGlobalStyle } from 'styled-components';

import fontInterBoldWoff from '../assets/Inter-Bold.woff';
import fontInterBoldWoff2 from '../assets/Inter-Bold.woff2';
import fontInterBoldItalicWoff from '../assets/Inter-BoldItalic.woff';
import fontInterRegularItalicWoff2 from '../assets/Inter-BoldItalic.woff2';
import fontInterRegularItalicWoff from '../assets/Inter-Italic.woff';
import fontInterBoldItalicWoff2 from '../assets/Inter-Italic.woff2';
import fontInterRegularWoff from '../assets/Inter-Regular.woff';
import fontInterRegularWoff2 from '../assets/Inter-Regular.woff2';
import fontMontserratBoldWoff from '../assets/Montserrat-Bold.woff';
import fontMontserratBoldWoff2 from '../assets/Montserrat-Bold.woff2';
import fontMontserratBoldItalicWoff from '../assets/Montserrat-BoldItalic.woff';
import fontMontserratBoldItalicWoff2 from '../assets/Montserrat-BoldItalic.woff2';
import fontMontserratItalicWoff from '../assets/Montserrat-Italic.woff';
import fontMontserratItalicWoff2 from '../assets/Montserrat-Italic.woff2';
import fontMontserratRegularWoff from '../assets/Montserrat-Regular.woff';
import fontMontserratRegularWoff2 from '../assets/Montserrat-Regular.woff2';
import fontOswaldRegularWoff from '../assets/Oswald-Regular.woff';
import fontOswaldRegularWoff2 from '../assets/Oswald-Regular.woff2';
import fontOswaldSemiBoldWoff from '../assets/Oswald-SemiBold.woff';
import fontOswaldSemiBoldWoff2 from '../assets/Oswald-SemiBold.woff2';

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
  // {
  //   fontFamily: 'Montserrat',
  //   fontWeight: 400,
  //   fontStyle: 'normal',
  //   woff2: fontMontserratRegularWoff2,
  //   woff: fontMontserratRegularWoff,
  // },
  // {
  //   fontFamily: 'Montserrat',
  //   fontWeight: 400,
  //   fontStyle: 'italic',
  //   woff2: fontMontserratItalicWoff2,
  //   woff: fontMontserratItalicWoff,
  // },
  // {
  //   fontFamily: 'Montserrat',
  //   fontWeight: 700,
  //   fontStyle: 'normal',
  //   woff2: fontMontserratBoldWoff2,
  //   woff: fontMontserratBoldWoff,
  // },
  // {
  //   fontFamily: 'Montserrat',
  //   fontWeight: 700,
  //   fontStyle: 'italic',
  //   woff2: fontMontserratBoldItalicWoff2,
  //   woff: fontMontserratBoldItalicWoff,
  // },

  // {
  //   fontFamily: 'Oswald',
  //   fontWeight: 400,
  //   fontStyle: 'normal',
  //   woff2: fontOswaldRegularWoff2,
  //   woff: fontOswaldRegularWoff,
  // },
  // {
  //   fontFamily: 'Oswald',
  //   fontWeight: 600,
  //   fontStyle: 'normal',
  //   woff2: fontOswaldSemiBoldWoff2,
  //   woff: fontOswaldSemiBoldWoff,
  // },
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
/* ${fontsString} */
`;
