import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  // Typography
  fontBase: '"Inter", Montserrat',
  fontCode: 'monospace',

  brandTitle: 'My custom Storybook',
  brandUrl: 'https://google.com',
  brandImage:
    'https://storage.googleapis.com/smartcookie_logos/SmartDesignLogo.svg',
  brandTarget: '_blank',

  //
  colorSecondary: '#FF5E0E',

  // UI
  appBg: '#fff8f5',
  appContentBg: '#ffffff',
  appBorderColor: '#D3D4DA',
  appBorderRadius: 8,

  // Text colors
  textColor: '#1F2028',
  textInverseColor: '#ffffff',
  textMutedColor: '#9E9E9E',

  // Toolbar default and active colors
  barTextColor: '#9E9E9E',
  barSelectedColor: '#FF5E0E',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#D3D4DA',
  inputTextColor: '#10162F',
  inputBorderRadius: 4,
});

addons.setConfig({
  theme,
});
