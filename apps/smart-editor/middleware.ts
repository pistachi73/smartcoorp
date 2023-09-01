import { DeviceType } from '@smart-editor/types';

import { NextRequest, NextResponse, userAgent } from 'next/server';

const middleware = async (request: NextRequest) => {
  const country = request.geo?.country ?? 'US';
  const {
    device: { type },
  } = userAgent(request);

  const deviceType: DeviceType =
    type === 'mobile' ? 'mobile' : type === 'tablet' ? 'tablet' : 'desktop';

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-geo-country-code', country);
  requestHeaders.set('x-device-type', deviceType);
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  return response;
};

export default middleware;
