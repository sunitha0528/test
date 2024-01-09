
import  { useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Box,
    Grid,
    FormControl,
    InputLabel,
    OutlinedInput,
    FormHelperText,
} from "@mui/material";
import Loader from '@components/Loader';
import Toaster from '@components/Toaster';
import { useAccountVerificationMutation, useAddBankAccountMutation } from '@store/apis/users-api-slice';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export type AlertColor = 'success' | 'info' | 'warning' | 'error';

type AddBankDetailsProps = {
    openBankModal: boolean;
    setOpenBankModal: (openDeposit: boolean) => void;
      refresh: () => void;
};

type ToasterProps = {
    message: string,
    type: AlertColor,
    isToastOpen: boolean
}

const AddBankDetails = ({
    openBankModal,
    setOpenBankModal,
    refresh
}: AddBankDetailsProps) => {
    const [toaster, setToaster] = useState<ToasterProps>({
        isToastOpen: false,
        message: '',
        type: 'success'
    });
    const [isLoading, setIsLoading] = useState(false);

    const [bankDetails, setBankDetails] = useState({
        AccountHolderName: 'PENAMALLI ASHOK KUMAR',
        AccountNumber: '4348788972',
        IFSCCode: 'KKBK0000811',
        NickName: 'Ashok KKB',
        MobileNumber: ''
    });

    const [error, setError] = useState({
        AccountHolderName: '',
        AccountNumber: '',
        IFSCCode: '',
        NickName: '',
        MobileNumber: ''
    });

    const [addBankDetailsService] = useAddBankAccountMutation();
    const [accountVerification] = useAccountVerificationMutation();


    const toasterClose = () => {
        setToaster({
            isToastOpen: false,
            message: '',
            type: 'success'
        });
    }

    const bankAccountValidation = () => {
        let isValid = true;
        const errorObj = {
            AccountHolderName: '',
            AccountNumber: '',
            IFSCCode: '',
            NickName: '',
            MobileNumber: ''
        };
        if (!bankDetails.AccountHolderName) {
            errorObj.AccountHolderName = 'Account Holder Name is required';
            isValid = false;
        }
        if (!bankDetails.AccountNumber) {
            errorObj.AccountNumber = 'Account Number is required';
            isValid = false;
        }
        if (!bankDetails.IFSCCode) {
            errorObj.IFSCCode = 'IFSC Code is required';
            isValid = false;
        }
        if (!bankDetails.NickName) {
            errorObj.NickName = 'Nick Name is required';
            isValid = false;
        }
        if (!bankDetails.MobileNumber) {
            errorObj.MobileNumber = 'Mobile Number is required';
            isValid = false;
        }

        if (isValid) {
            let regex = new RegExp(/^[0-9]{9,18}$/);
            if (!regex.test(bankDetails.AccountNumber)) {
                errorObj.AccountNumber = 'Account Number is invalid';
                isValid = false;
            }

            regex = new RegExp(/^[A-Za-z]{4}[0][A-Za-z0-9]{6}$/);
            if (!regex.test(bankDetails.IFSCCode)) {
                errorObj.IFSCCode = 'IFSC Code is invalid';
                isValid = false;
            }

            regex = new RegExp(/^[A-Za-z ]{3,}$/);
            if (!regex.test(bankDetails.AccountHolderName)) {
                errorObj.AccountHolderName = 'Account Holder Name is invalid';
                isValid = false;
            }

            regex = new RegExp(/^[A-Za-z ]{3,}$/);
            if (!regex.test(bankDetails.NickName)) {
                errorObj.NickName = 'Nick Name is invalid';
                isValid = false;
            }

            regex = new RegExp(/^[0-9]{10}$/);
            if (!regex.test(bankDetails.MobileNumber)) {
                errorObj.MobileNumber = 'Mobile Number is invalid';
                isValid = false;
            }



        }
        setError(errorObj);
        return isValid;
    }

    const handleSubmit = async () => {
        setError({
            AccountHolderName: '',
            AccountNumber: '',
            IFSCCode: '',
            NickName: '',
            MobileNumber: ''
        });
        if (!bankAccountValidation()) {
            return
        }
        setIsLoading(true);
        const resp: any = await addBankDetailsService(bankDetails).unwrap();
        setIsLoading(false);
        console.log(resp);
        if (resp.status === 200) {
            resetDetails()
            setOpenBankModal(false);
            refresh();
            setToaster({
                isToastOpen: true,
                message: resp.message,
                type: 'success'
            });


        }
        else {
            setToaster({
                isToastOpen: true,
                message: resp.message,
                type: 'error'
            });
        }
        // console.log(loginDetails);

    }

    const accountVerificationValidation = () => {
        let isValid = true;
        const errorObj = {
            AccountHolderName: '',
            AccountNumber: '',
            IFSCCode: '',
            NickName: '',
            MobileNumber: ''
        };
        if (!bankDetails.AccountNumber) {
            errorObj.AccountNumber = 'Account Number is required';
            isValid = false;
        }
        if (!bankDetails.IFSCCode) {
            errorObj.IFSCCode = 'IFSC Code is required';
            isValid = false;
        }

        if (isValid) {
            let regex = new RegExp(/^[0-9]{9,18}$/);
            if (!regex.test(bankDetails.AccountNumber)) {
                errorObj.AccountNumber = 'Account Number is invalid';
                isValid = false;
            }

            regex = new RegExp(/^[A-Za-z]{4}[0][A-Za-z0-9]{6}$/);
            if (!regex.test(bankDetails.IFSCCode)) {
                errorObj.IFSCCode = 'IFSC Code is invalid';
                isValid = false;
            }

        }
        setError(errorObj);
        return isValid;
    }


    const handleVerify = async () => {
        setError({
            AccountHolderName: '',
            AccountNumber: '',
            IFSCCode: '',
            NickName: '',
            MobileNumber: ''
        });
        if (!accountVerificationValidation()) {
            return
        }
        setIsLoading(true);
        const resp: any = await accountVerification({
            AccountNumber: bankDetails.AccountNumber,
            IFSCCode: bankDetails.IFSCCode

        }).unwrap();
        refresh();
        setIsLoading(false);
        if (resp.status === 200) {
            setBankDetails({
                ...bankDetails,
                AccountHolderName: resp.data.full_name
            })
            setToaster({
                isToastOpen: true,
                message: resp.message,
                type: 'success'
            });

        }
        else {
            refresh();
            setToaster({
                isToastOpen: true,
                message: resp.message,
                type: 'error'
            });
        }


    }


    const resetDetails = () => {
        setBankDetails({
            AccountHolderName: '',
            AccountNumber: '',
            IFSCCode: '',
            NickName: '',
            MobileNumber: ''
        });
    }





    return (
        <Dialog open={openBankModal}>
            <Loader isLoading={isLoading} />
            <Toaster {...toaster} toasterClose={toasterClose} />
            <DialogTitle>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ flexGrow: 1 }}>Bank Details</Box>
                </Box>
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => {
                    setOpenBankModal(false);
                    resetDetails()
                }}
                sx={{
                    position: 'absolute',
                    right: 8,
                    // top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box >
                            <Box>
                                <FormControl variant="outlined" fullWidth required size="small">
                                    <InputLabel htmlFor="outlined-adornment-mobile-number">Account Holder Name</InputLabel>
                                    <OutlinedInput type={'text'} id="AccountHolderName" label={'Account Holder Name'}
                                        onChange={(e) => {
                                            setBankDetails({
                                                ...bankDetails,
                                                AccountHolderName: e.target.value
                                            })
                                        }
                                        }
                                        value={bankDetails.AccountHolderName}
                                    />
                                    {error.AccountHolderName && <FormHelperText error>{error.AccountHolderName}</FormHelperText>}
                                </FormControl>
                            </Box>
                            <Box mt={2}>
                                <FormControl variant="outlined" fullWidth required size="small">
                                    <InputLabel htmlFor="outlined-adornment-mobile-number">Nick Name</InputLabel>
                                    <OutlinedInput type={'text'} id="NickName" label={'Nick Name'}
                                        onChange={(e) => {
                                            setBankDetails({
                                                ...bankDetails,
                                                NickName: e.target.value
                                            })
                                        }
                                        }
                                        value={bankDetails.NickName}
                                    />
                                    {error.NickName && <FormHelperText error>{error.NickName}</FormHelperText>}
                                </FormControl>
                            </Box>
                            <Box mt={2}>
                                <FormControl variant="outlined" fullWidth required size="small">
                                    <InputLabel htmlFor="outlined-adornment-mobile-number">Mobile Number</InputLabel>
                                    <OutlinedInput type={'text'} id="MobileNumber" label={'Mobile Number'}
                                        onChange={(e) => {
                                            setBankDetails({
                                                ...bankDetails,
                                                MobileNumber: e.target.value
                                            })
                                        }
                                        }
                                        value={bankDetails.MobileNumber}
                                    />
                                    {error.MobileNumber && <FormHelperText error>{error.MobileNumber}</FormHelperText>}
                                </FormControl>
                            </Box>
                            <Box mt={2}>
                                <FormControl variant="outlined" fullWidth required size="small">
                                    <InputLabel htmlFor="outlined-adornment-mobile-number">Account Number</InputLabel>
                                    <OutlinedInput type={'text'} id="AccountNumber" label={'Account Number'}
                                        onChange={(e) => {
                                            setBankDetails({
                                                ...bankDetails,
                                                AccountNumber: e.target.value
                                            })
                                        }
                                        }
                                        value={bankDetails.AccountNumber}
                                    />
                                    {error.AccountNumber && <FormHelperText error>{error.AccountNumber}</FormHelperText>}
                                </FormControl>
                            </Box>
                            <Box mt={2}>
                                <FormControl variant="outlined" fullWidth required size="small">
                                    <InputLabel htmlFor="outlined-adornment-mobile-number">IFSC Code</InputLabel>
                                    <OutlinedInput type={'text'} id="IFSCCode" label={'IFSC Code'}
                                        onChange={(e) => {
                                            setBankDetails({
                                                ...bankDetails,
                                                IFSCCode: e.target.value
                                            })
                                        }
                                        }
                                        value={bankDetails.IFSCCode}
                                    />
                                    {error.IFSCCode && <FormHelperText error>{error.IFSCCode}</FormHelperText>}
                                </FormControl>
                            </Box>



                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained" onClick={handleSubmit} fullWidth size="small" color={'success'}  >
                            Add
                        </Button>
                        <Button sx={{
                            mt: 1
                        }} variant="contained" onClick={handleVerify} fullWidth size="small" color={'error'}  >
                            Verify
                        </Button>
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog>
    );
};

export default AddBankDetails;