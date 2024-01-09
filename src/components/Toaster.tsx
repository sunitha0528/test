import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export type AlertColor = 'success' | 'info' | 'warning' | 'error';

type ToasterProps = {
    message: string,
    type: AlertColor,
    isToastOpen: boolean,
    toasterClose: () => void,
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});




const Toaster = ({
    message,
    type,
    isToastOpen,
    toasterClose,
    }:ToasterProps) => {
    return (
        <Snackbar   anchorOrigin={{ vertical:'top', horizontal:"right" }} open={isToastOpen} autoHideDuration={6000} onClose={toasterClose}>
        <Alert onClose={toasterClose} severity={type} sx={{ width: '100%' }}>
            {message}
        </Alert>
        </Snackbar>
    );
}

export default Toaster;
