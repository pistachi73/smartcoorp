import { serverTRPC } from '@smart-admin/trpc';

import { Headline } from '@smartcoorp/ui/headline';

const Home = async () => {
  const { url } = await serverTRPC.media.createPresignedUrl.mutate({
    folder: 'test',
    fileExtension: 'jpg',
  });
  return (
    <div>
      <Headline size="xlarge">Welcome to Smartcoorp</Headline>
      {url}
    </div>
  );
};

export default Home;
