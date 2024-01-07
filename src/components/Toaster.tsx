import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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
// }) => {
//   const [open, setOpen] = React.useState(false);

//   const handleClick = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
  

//     setOpen(false);
//   };

//   return (
//     <Stack spacing={2} sx={{ width: '100%' }}>
//       <Button variant="outlined" onClick={handleClick}>
//         Open success snackbar
//       </Button>
//       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//         <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
//           This is a success message!
//         </Alert>
//       </Snackbar>
//       <Alert severity="error">This is an error message!</Alert>
//       <Alert severity="warning">This is a warning message!</Alert>
//       <Alert severity="info">This is an information message!</Alert>
//       <Alert severity="success">This is a success message!</Alert>
//     </Stack>
//   );
// }