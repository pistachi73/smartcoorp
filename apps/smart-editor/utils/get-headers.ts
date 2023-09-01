import { DeviceType } from '@smart-editor/types';

export const getHeaders = (headers: Readonly<Headers>) => {
  const countryCode = headers.get('x-geo-country-code');
  const deviceType = headers.get('x-device-type') as DeviceType;

  return {
    countryCode,
    deviceType,
  };
};
