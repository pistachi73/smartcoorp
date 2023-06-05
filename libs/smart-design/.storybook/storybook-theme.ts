import { create } from '@storybook/theming/create';

import { gray100, gray200, gray300, primary, red400 } from '../src';

export default create({
  base: 'light',
  // Typography
  fontBase: '"Inter", Montserrat',
  fontCode: 'monospace',

  brandTitle: 'My custom Storybook',
  brandUrl: 'https://google.com',
  brandImage: 'https://storybook.js.org/images/placeholders/350x150.png',
  brandTarget: '_blank',

  //
  colorPrimary: primary,
  colorSecondary: '#585C6D',

  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appBorderColor: gray300,
  appBorderRadius: 8,

  // Text colors
  textColor: '#10162F',
  textInverseColor: red400,

  // Toolbar default and active colors
  barTextColor: '#9E9E9E',
  barSelectedColor: '#585C6D',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: gray300,
  inputTextColor: '#10162F',
  inputBorderRadius: 4,
});
