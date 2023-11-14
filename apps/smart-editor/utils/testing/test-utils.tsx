/* eslint-disable import/export */
import { DeviceType } from '@smart-editor/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RenderOptions, render, renderHook } from '@testing-library/react';
import React, { ReactElement } from 'react';

import { DeviceOnlyProvider, SCREENS } from '@smartcoorp/ui/device-only';
import { ThemeProvider } from '@smartcoorp/ui/global-styles';

import { darkTheme, lightTheme } from '../../theme/theme';

import { queryClientWrapper } from './react-query-utils';

const AllTheProviders = ({
  children,
  deviceType,
}: {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  deviceType: DeviceType;
}) => {
  const queryClient = new QueryClient();

  if (deviceType === 'mobile') {
    window.innerWidth = SCREENS.SMALL;
  } else if (deviceType === 'tablet') {
    window.innerWidth = SCREENS.CONFINED;
  } else {
    window.innerWidth = SCREENS.WIDE;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <DeviceOnlyProvider deviceType={deviceType}>
        <ThemeProvider
          theme={'light'}
          darkTheme={darkTheme}
          lightTheme={lightTheme}
        >
          {children}
        </ThemeProvider>
      </DeviceOnlyProvider>
    </QueryClientProvider>
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

const customHookRender = <Result, Props>(
  render: (initialProps: Props) => Result
) => {
  return renderHook(render, {
    wrapper: queryClientWrapper,
  });
};

export * from '@testing-library/react';
export { customRender as render, customHookRender as renderHook };
