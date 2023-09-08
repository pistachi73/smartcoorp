'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

type CountProviderProps = { children: React.ReactNode; deviceType: DeviceType };

const DeviceTypeContext = createContext<{ deviceType: DeviceType } | undefined>(
  undefined
);

export const SCREENS = {
  SMALL: 576,
  CONFINED: 768,
  WIDE: 992,
  XWIDE: 1200,
} as const;

const getIsMobileUsingViewport = (viewportWidth: number): DeviceType => {
  return viewportWidth < SCREENS.CONFINED
    ? 'mobile'
    : viewportWidth < SCREENS.WIDE
    ? 'tablet'
    : 'desktop';
};

export const DeviceOnlyProvider = ({
  children,
  deviceType,
}: CountProviderProps) => {
  const [deviceTypeState, setDeviceType] = useState<DeviceType>(deviceType);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth) {
        setDeviceType(getIsMobileUsingViewport(Number(window.innerWidth)));
      }
    };

    setDeviceType(getIsMobileUsingViewport(Number(window.innerWidth)));

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const value = useMemo(
    () => ({ deviceType: deviceTypeState }),
    [deviceTypeState]
  );
  return (
    <DeviceTypeContext.Provider value={value}>
      {children}
    </DeviceTypeContext.Provider>
  );
};

export const useDeviceType = () => {
  const context = useContext(DeviceTypeContext);
  if (context === undefined) {
    throw new Error('useDeviceType must be used within a DeviceTypeProvider');
  }
  return context;
};
