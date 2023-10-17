import { Toaster } from 'react-hot-toast';
import { Toaster as SoonerToaster } from 'sonner';

import {
  borderRadiusXS,
  green100,
  green400,
  green500,
  red100,
  red400,
  red500,
  spaceS,
} from '@smartcoorp/ui/tokens';

export const ToasterRenderer = () => {
  // const searchParams = useSearchParams();

  // useEffect(() => {
  //   const toastMessage = searchParams.get('t');

  //   if (!toastMessage) return;

  //   const decodedToastMessage = decodeURIComponent;

  //   toast.success(decodeURIComponent(toastMessage));
  // }, [searchParams]);
  return (
    <>
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
      <SoonerToaster
        richColors
        closeButton
        position="top-center"
        toastOptions={{
          style: {
            fontFamily:
              "'Inter', 'Trebuchet MS', Arial, 'Helvetica Neue', sans-serif",
            fontSize: '14px',
          },
        }}
      />
    </>
  );
};
