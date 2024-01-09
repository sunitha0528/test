
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Button,
    Box,
    Grid,
    FormControl,
    InputLabel,
    OutlinedInput,
    Select,
    MenuItem,
    InputAdornment,
    FormHelperText
} from "@mui/material";
import Loader from '@components/Loader';
import Toaster from '@components/Toaster';
import { usePayoutsMutation, useGetTransactionsByPayOutIDMutation } from '@store/apis/users-api-slice';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LoopIcon from '@mui/icons-material/Loop';
import styles from './Rotation.module.scss'




type ToasterProps = {
    message: string,
    type: AlertColor,
    isToastOpen: boolean
}

export type AlertColor = 'success' | 'info' | 'warning' | 'error';

type AddBankDetailsProps = {
    bankDetails: {
        BankDetailID: number,
        AccountNumber: string,
        BankName: string,
        BankUserName: string,
        IFSCCode: string,
        Phone: string,
        DisplayName: string,
    },
    openPayoutModel: boolean;
    setOpenPayoutModel: (openAddBankDetails: boolean) => void;
    refresh: () => void;
};

const Transfer = ({
    bankDetails,
    openPayoutModel,
    setOpenPayoutModel,
    refresh
}: AddBankDetailsProps) => {
    const [toaster, setToaster] = useState<ToasterProps>({
        isToastOpen: false,
        message: '',
        type: 'success'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [transferDetails, setTransferDetails] = useState({
        mode: "IMPS",
        amount: 0,
    })

    const [error, setError] = useState({
        amount: '',
        mode: '',
    });

    const [payoutConfirmModel, setPayoutConfirmModel] = useState(false);
    const [payoutResponse, setPayoutResponse] = useState({
        "TransactionID": "",
        "PayOutID": ""
    });

    const [transactionDetails, setTransactionDetails] = useState({
        "TransactionID": "",
        "TransactionTypeID": null,
        "TranCode": "",
        "BankID": null,
        "Amount": null,
        "PaymentGatewayID": null,
        "PayOutID": "",
        "UTR": null,
        "PaymentMode": "",
        "Purpose": "",
        "TranStatus": "",
        "Description": null,
    });
    const [payouts] = usePayoutsMutation();
    const [getTransactionsByPayOutID] = useGetTransactionsByPayOutIDMutation();

    const modes = ["IMPS", "NEFT", "RTGS"]

    const toasterClose = () => {
        setToaster({
            isToastOpen: false,
            message: '',
            type: 'success'
        });
    }


    const validateForm = () => {
        let isValid = true;
        const errorObj = {
            amount: '',
            mode: '',
        }
        if (!transferDetails.amount) {
            errorObj.amount = 'Amount is required';
            isValid = false;
        }
        if (!transferDetails.mode) {
            errorObj.mode = 'Mode is required';
            isValid = false;
        }


        setError(errorObj);
        return isValid;
    }

    const handleSubmit = async () => {
        setError({
            amount: '',
            mode: '',
        });
        if (!validateForm()) {
            return
        }
        setIsLoading(true);
        const resp: any = await payouts({
            BankDetailID: bankDetails.BankDetailID,
            Amount: transferDetails.amount,
            Mode: transferDetails.mode

        }).unwrap();
        setIsLoading(false);
        if (resp.status === 200) {
            setPayoutResponse(resp.data);
            setPayoutConfirmModel(true);
            // setToaster({
            //     isToastOpen: true,
            //     message: resp.message,
            //     type: 'success'
            // });
            // refresh();
            setOpenPayoutModel(false);
         

        }
        else {
            setToaster({
                isToastOpen: true,
                message: resp.message,
                type: 'error'
            });
        }

    }


    useEffect(() => {
        if (payoutResponse.PayOutID) {
            handlePayoutConfirm();
        }
    }, [payoutResponse.PayOutID])

    const handlePayoutConfirm = async () => {
        try {
            const resp: any = await getTransactionsByPayOutID({
                PayOutID: payoutResponse.PayOutID
            }).unwrap();
            setTransactionDetails(resp.data);
            if (resp.status === 200) {

                if(resp.data.TransactionTypeID === 7)
                {
                    setTimeout(() => {
                        handlePayoutConfirm()
                    }, 10000);
                } else  {
                    setTimeout(() => {
                        setPayoutConfirmModel(false);
                    }, 10000);
                    
                    setToaster({
                        isToastOpen: true,
                        message: resp.message,
                        type: 'success'
                    });
                    refresh();

                }
                // setPayoutConfirmModel(false);
                // setToaster({
                //     isToastOpen: true,
                //     message: resp.message,
                //     type: 'success'
                // });
                // refresh();
            }
            else {
                setToaster({
                    isToastOpen: true,
                    message: resp.message,
                    type: 'error'
                });
            }
        }
        catch (err: any) {
            setToaster({
                isToastOpen: true,
                message: err.message,
                type: 'error'
            });
        }
    }


    return (
        <div>
            <Dialog open={payoutConfirmModel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/* <DialogContent>

                </DialogContent> */}
                <DialogActions>
                    <Box sx={{
                        p: 2,
                        color: 'white',
                        display: 'flex',
                        background: '#1b3e1a',
                        justifyContent: 'center'
                    }}>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item md={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                    {/* <Typography  component="div"> */}
                                        <CloseIcon onClick={() => {
                                            setPayoutConfirmModel(false)
                                            refresh();
                                        }} />
                                    {/* </Typography> */}
                                    {/* <Typography  component="div" textAlign={'end'} >
                                        Transfer Status
                                    </Typography> */}
                                </Box>
                            </Grid>

                            <Grid item md={12}>
                                <Box sx={{ display: 'flex', mt: 2, justifyContent: 'center' }}>
                                    <LoopIcon className={styles.rotating} sx={{ fontSize: 70 }} />
                                </Box>
                            </Grid>
                            <Grid item md={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                    <Typography  component="div">
                                        Transaction ID
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item md={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                    <Typography  component="div">
                                        : {transactionDetails.TranCode}
                                    </Typography>
                                </Box>

                            </Grid>
                            <Grid item md={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                    <Typography  component="div">
                                        PayOut ID
                                    </Typography>
                                </Box>

                            </Grid>
                            <Grid item md={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                    <Typography  component="div">
                                        : {transactionDetails.PayOutID}
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item md={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                    <Typography  component="div">
                                        UTR
                                    </Typography>
                                </Box>
                            </Grid>


                            <Grid item md={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                    <Typography  component="div">
                                        : {transactionDetails.UTR ? transactionDetails.UTR : "NA"}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item md={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                    <Typography  component="div">
                                        Amount
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item md={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                    <Typography  component="div">
                                        : {transactionDetails.Amount}/- (With Transfer Charges RS 10/-)
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item md={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                    <Typography  component="div">
                                        Mode
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item md={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                    <Typography  component="div">
                                        : {transactionDetails.PaymentMode}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item md={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                    <Typography  component="div">
                                        Status
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item md={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                    <Typography  component="div">
                                        : {transactionDetails.TranStatus}
                                    </Typography>
                                </Box>
                            </Grid>





                        </Grid>
                    </Box>

                </DialogActions>
            </Dialog>

            <Dialog
                open={openPayoutModel}
                fullWidth
                maxWidth="md"
            >
                <Loader isLoading={isLoading} />
                <DialogTitle id="alert-dialog-title">
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography  variant="h6"  component="div">
                                Transfer
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton
                                aria-label="close"
                                onClick={() => setOpenPayoutModel(false)}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                <Typography component="div">
                                    Name
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                <Typography component="div">
                                    :{bankDetails.DisplayName}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                <Typography component="div">
                                    Account Number
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                <Typography component="div">
                                    :{bankDetails.AccountNumber}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                <Typography component="div">
                                    IFSC Code
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                <Typography component="div">
                                    :{bankDetails.IFSCCode}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                <Typography component="div">
                                    Bank Name
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                <Typography component="div">
                                    :{bankDetails.BankName}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                <Typography component="div">
                                    Mobile Number
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                <Typography component="div">
                                    :{bankDetails.Phone}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{ m: 4, display: 'flex', justifyContent: 'center' }}>
                        <Grid container spacing={2}>
                            <Grid xs={5}>
                                <Box mt={2} >
                                    <Box>
                                        <FormControl variant="outlined" fullWidth required size="small">
                                            <InputLabel htmlFor="outlined-adornment-mobile-number">Amount</InputLabel>
                                            <OutlinedInput type={'text'} id="Amount" label={'Amount'}
                                                onChange={(e) => {
                                                    const regex = /^[0-9\b]+$/;
                                                    if (e.target.value === "" || regex.test(e.target.value)) {
                                                        setTransferDetails({ ...transferDetails, amount: Number(e.target.value) })
                                                    }
                                                }
                                                }
                                                value={transferDetails.amount}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <CurrencyRupeeIcon />
                                                    </InputAdornment>
                                                }
                                            />
                                            {error.amount && <FormHelperText error>{error.amount}</FormHelperText>}
                                        </FormControl>
                                    </Box>
                                </Box>

                            </Grid>
                            <Grid xs={1}></Grid>
                            <Grid xs={5}>
                                <Box mt={2} >
                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Mode</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={transferDetails.mode}
                                                label="Mode"
                                                fullWidth
                                                size="small"
                                                onChange={(e) => {
                                                    setTransferDetails({ ...transferDetails, mode: e.target.value })

                                                }}
                                            >
                                                {modes.map((mode, index) => (
                                                    <MenuItem key={index} value={mode}>{mode}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Box>
                            </Grid>



                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained" fullWidth size="small" color={'success'} onClick={handleSubmit} >
                        Transfer
                    </Button>
                </DialogActions>
                <Toaster {...toaster} toasterClose={toasterClose} />
            </Dialog>
        </div>
    );
}

export default Transfer;