import { Toaster } from 'sonner';

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
