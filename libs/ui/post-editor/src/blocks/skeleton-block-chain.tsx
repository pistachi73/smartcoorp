import { Skeleton } from '@smartcoorp/ui/skeleton';

export const SkeletonBlockChain = () => {
  return (
    <>
      <Skeleton width="55%" height="36px" />
      <Skeleton width="100%" height="18px" number={2} />
      <Skeleton width="40%" height="18px" number={1} />
      <Skeleton width="100%" height="300px" />
    </>
  );
};
