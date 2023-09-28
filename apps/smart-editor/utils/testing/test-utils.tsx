/* eslint-disable import/export */
import { DeviceType } from '@smart-editor/types';
import { RenderOptions, render } from '@testing-library/react';
import React, { ReactElement } from 'react';

import { DeviceOnlyProvider, SCREENS } from '@smartcoorp/ui/device-only';
import { ThemeProvider } from '@smartcoorp/ui/global-styles';

import { darkTheme, lightTheme } from '../../theme/theme';

const AllTheProviders = ({
  children,
  deviceType,
}: {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  deviceType: DeviceType;
}) => {
  if (deviceType === 'mobile') {
    window.innerWidth = SCREENS.SMALL;
  } else if (deviceType === 'tablet') {
    window.innerWidth = SCREENS.CONFINED;
  } else {
    window.innerWidth = SCREENS.WIDE;
  }

  return (
    <DeviceOnlyProvider deviceType={deviceType}>
      <ThemeProvider
        theme={'light'}
        darkTheme={darkTheme}
        lightTheme={lightTheme}
      >
        {children}
      </ThemeProvider>
    </DeviceOnlyProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { deviceType: DeviceType }
) =>
  render(ui, {
    wrapper: (props) => (
      <AllTheProviders
        deviceType={options?.deviceType ?? 'desktop'}
        {...props}
      />
    ),
    ...options,
  });

export * from '@testing-library/react';
export { customRender as render };
