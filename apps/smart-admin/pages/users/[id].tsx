import { useRouter } from 'next/router';

import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceXS } from '@smartcoorp/ui/tokens';

const EditUser = () => {
  const router = useRouter();
  return (
    <>
      <Headline
        as="h1"
        size="xxxlarge"
        noMargin
        style={{ marginBottom: spaceXS }}
      >
        Edit user {router.query.id}
      </Headline>
      <Body variant="neutral" size="small">
        Edit user info.
      </Body>
    </>
  );
};

export default EditUser;
