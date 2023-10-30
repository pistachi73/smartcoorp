import { Toaster } from 'sonner';

export const ToasterRenderer = () => {
  return (
    <>
      <Toaster
        richColors
        closeButton
        position="top-center"
        toastOptions={{
          style: {
            fontFamily:
              '"Inter", "Montserrat", "Trebuchet MS", Arial, "Helvetica Neue", sans-serif',
            fontSize: '14px',
          },
        }}
      />
    </>
  );
};
