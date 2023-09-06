import { DeviceType } from '@smart-coaching/types';

import { headers } from 'next/headers';

export const getHeaders = () => {
  const parsedHeaders = headers();
  const countryCode = parsedHeaders.get('x-geo-country-code');
  const deviceType = parsedHeaders.get('x-device-type') as DeviceType;

  return {
    countryCode,
    deviceType,
  };
};
