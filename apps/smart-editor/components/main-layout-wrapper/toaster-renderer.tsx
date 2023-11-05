import { Toaster } from 'sonner';

export const ToasterRenderer = () => {
  return (
    <Toaster
      richColors
      closeButton
      position="top-center"
      toastOptions={{
        style: {
          fontFamily: "'__Inter_a64ecd', '__Inter_Fallback_a64ecd'",
          fontSize: '14px',
        },
      }}
    />
  );
};
