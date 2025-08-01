import { useRef } from 'react';
import { SnackbarProvider } from 'notistack';

export function NotistackProvider({ children }: any) {
  const notistackRef = useRef<any>(null);

  const onClose = (key: any) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <SnackbarProvider
      ref={notistackRef}
      dense
      maxSnack={5}
      preventDuplicate
      autoHideDuration={4000}
      variant="info"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      action={key => (
        <button
          type="button"
          onClick={onClose(key)}
          style={{ cursor: 'pointer', fontWeight: 'bold' }}
        >
          Close
        </button>
      )}
    >
      {children}
    </SnackbarProvider>
  );
}
