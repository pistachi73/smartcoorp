import { Posts } from '@smart-editor/components/user-dashboard/posts';

const OverviewPage = () => {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Posts />
    </>
  );
};

export default OverviewPage;
