import { getHeaders } from '@smart-coaching/utils/getHeaders';

import { headers } from 'next/headers';

import { DeviceOnlyProvider } from '@smartcoorp/ui/device-only';

import { Test } from '../components/test-component';

const Page = async () => {
  const { deviceType } = getHeaders(headers());
  return (
    <>
      Hello cookie coaching
      <DeviceOnlyProvider deviceType={deviceType}>
        <Test />
      </DeviceOnlyProvider>
    </>
  );
};

export default Page;
