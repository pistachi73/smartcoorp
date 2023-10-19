'use client';

import { DeviceOnly } from '@smartcoorp/ui/device-only';

import { Illustration as StyledIllustration } from './footer.styles';

export const Illustration = () => (
  <DeviceOnly allowedDevices={['desktop', 'tablet']}>
    <StyledIllustration
      width={208}
      height={236.06}
      src="./illustrations/creative.svg"
      alt="Footer Illustration"
      data-testid="footer-illustration"
    />
  </DeviceOnly>
);
