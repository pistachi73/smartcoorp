import { Skeleton } from '@smartcoorp/ui/skeleton';
import { spaceM } from '@smartcoorp/ui/tokens';

import { FieldContainer, FieldContent, FieldFooter } from '../account.styles';

export const SkeletonFormField = () => {
  return (
    <FieldContainer>
      <FieldContent>
        <div
          style={{
            paddingBottom: spaceM,
          }}
        >
          <Skeleton width="100px" height="24px" />
        </div>
        <Skeleton width="360px" height="14px" />
        <Skeleton width="140px" height="14px" />
      </FieldContent>
      <FieldFooter>
        <Skeleton width="240px" height="14px" />
        <Skeleton width="70px" height="24px" />
      </FieldFooter>
    </FieldContainer>
  );
};
