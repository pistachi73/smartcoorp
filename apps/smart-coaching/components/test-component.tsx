'use client';

import { DeviceOnly } from '@smartcoorp/ui/device-only';

export const Test = () => {
  return (
    <div>
      <DeviceOnly allowedDevices="mobile">
        <div>Mobile</div>
      </DeviceOnly>
      <DeviceOnly allowedDevices={['mobile', 'tablet']}>
        <div> Mobile and tablet</div>
      </DeviceOnly>
      <DeviceOnly allowedDevices="desktop">
        <div>Desktop</div>
      </DeviceOnly>
    </div>
  );
};
