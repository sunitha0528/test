import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box, Grid } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircularProgress from '@mui/material/CircularProgress';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const PaymentReceipt = () => {
    // const [open, setOpen] = React.useState(true);
    const open = true;

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    const data = {
        "txnid": "55",
        "operatorname": "BSES Rajdhani Power Limited",
        "canumber": "102277100",
        "amount": "100",
        "ad1": null,
        "ad2": null,
        "ad3": null,
        "comm": "0.21",
        "tds": "0.01",
        "status": 0,
        "refid": "1234567897",
        "operatorid": null,
        "dateadded": "2021-01-11 15:43:20",
        "refunded": "1",
        "refundtxnid": "57",
        "daterefunded": "2021-01-11 15:53:08"
    }

    return (
        <React.Fragment>
            <Dialog
                
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ m: 0, p: 2, backgroundColor: "rgb(100 203 227)", color: "#ffff" }} id="alert-dialog-slide-title">
                    <Box sx={{ alignItems: 'center', justifyContent: 'center'  }}>
                        <Box>Payment Status</Box>

                    </Box>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', my: 4, alignItems: 'center', justifyContent: 'center' }}>
                               {data.status == 0  &&(<CircularProgress size={50} thickness={5} color="success" />)}
                               {data.status == 1 && (<CheckCircleIcon sx={{ fontSize: 100, color: 'green' }} />)}
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box>Transaction ID</Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box>{data.txnid}</Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box>Operator Name</Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box>{data.operatorname}</Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box>CA Number</Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box>{data.canumber}</Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box>Amount</Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box>{data.amount}</Box>
                            </Grid>
                            {/* <Grid item xs={6}>
                                <Box>Commission</Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box>{data.comm}</Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box>TDS</Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box>{data.tds}</Box>
                            </Grid> */}
                            <Grid item xs={6}>
                                <Box>Status</Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box sx={{
                                    color: data.status == 1 ? 'green' : 'red',
                                    fontWeight: 'bold'

                                
                                }}>{data.status == 1 ? 'Completed' : 'Pending'}</Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box>Reference ID</Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box>{data.refid}</Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box>Date Added</Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box>{data.dateadded}</Box>
                            </Grid>


                        </Grid>
                        {data.status == 1 && (<>
                        <Box sx={{ display: 'flex', mt:2, alignItems: 'center', justifyContent: 'center' }}>
                            <Box>Payment Success</Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box>Thank You</Box>
                        </Box>
                        </>)}


                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose}>Agree</Button> */}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default PaymentReceipt;