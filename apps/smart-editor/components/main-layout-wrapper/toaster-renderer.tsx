import { Toaster } from 'react-hot-toast';

import {
  borderRadiusXS,
  gray900,
  green100,
  green400,
  green500,
  red100,
  red200,
  red300,
  red400,
  red500,
  scale190,
  spaceM,
  spaceS,
} from '@smartcoorp/ui/tokens';

export const ToasterRenderer = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          padding: spaceS,
          borderRadius: borderRadiusXS,
        },
        error: {
          style: {
            backgroundColor: red100,
            border: `1px solid ${red400}`,
          },
          iconTheme: {
            primary: red500,
            secondary: 'white',
          },
        },
        success: {
          style: {
            backgroundColor: green100,
            border: `1px solid ${green400}`,
          },
          iconTheme: {
            primary: green500,
            secondary: 'white',
          },
        },
      }}
    />
  );
};
