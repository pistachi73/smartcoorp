'use client';

import { DeviceOnly } from '@smartcoorp/ui/device-only';
import { scale320 } from '@smartcoorp/ui/tokens';

import { Illustration as StyledIllustration } from './style';

export const Illustration = () => (
  <DeviceOnly allowedDevices={['desktop', 'tablet']}>
    <StyledIllustration
      width={scale320}
      src="./illustrations/creative.svg"
      alt="Footer Illustration"
      data-testid="footer-illustration"
    />
  </DeviceOnly>
);
