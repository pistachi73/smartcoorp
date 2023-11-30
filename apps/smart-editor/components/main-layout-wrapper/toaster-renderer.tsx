import { Toaster } from 'sonner';

export const ToasterRenderer = () => {
  return (
    <Toaster
      richColors
      closeButton
      position="top-center"
      toastOptions={{
        style: {
          fontFamily: "'__Inter_e66fe9', '__Inter_Fallback_e66fe9'",
          fontSize: '14px',
        },
      }}
    />
  );
};
