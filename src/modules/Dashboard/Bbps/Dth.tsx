import { Box, Typography, Paper, Button, Grid, Select, MenuItem, FormControl, FormHelperText, OutlinedInput, InputLabel } from '@mui/material';
;
import {
    useGetDTHOperatorsQuery,
    useDoRechargeMutation
} from '@store/apis/users-api-slice';
import { useState, useEffect } from 'react';
import Loader from '@components/Loader';
import Toaster from '@components/Toaster';


export type AlertColor = 'success' | 'info' | 'warning' | 'error';

type ToasterProps = {
    message: string,
    type: AlertColor,
    isToastOpen: boolean
}

const Dth = () => {

    const [toaster, setToaster] = useState<ToasterProps>({
        isToastOpen: false,
        message: '',
        type: 'success'
    });

    const [dthList, setDthList] = useState<any[]>([]);
    const [payload, setPayload] = useState({
        operator:'',
        amount:'',
        canumber:''
    });

    const dthOperators:any = useGetDTHOperatorsQuery();
    const [doRecharge] = useDoRechargeMutation();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (dthOperators.data) {
            console.log(dthOperators.data);
            setDthList(dthOperators.data.operators);
        }
    }, [dthOperators.data]);



    const toasterClose = () => {
        setToaster({
          isToastOpen: false,
          message: '',
          type: 'success'
        });
      }

    const recharge = async () => {
        setIsLoading(true);
        try {
            const getOperator: any = dthList.find((item: any) => item.OperatorName === payload.operator)
            if (!getOperator) {
                throw new Error('Please select operator');
            }
            let payloadObj:any = {
                    "operator": Number(getOperator.ID),
                    "amount": payload.amount,
                    "canumber": payload.canumber
                }
            const response:any = await doRecharge(payloadObj);
            if (response.status === 200) {
                setToaster({
                    isToastOpen: true,
                    message: response.data.message,
                    type: 'success'
                });
            } else {
                setToaster({
                    isToastOpen: true,
                    message: response.data.message,
                    type: 'error'
                });
            }

            // if (response.data) {
            //     setToaster({
            //         isToastOpen: true,
            //         message: response.data.message,
            //         type: 'success'
            //     });
            // }
        } catch (error:any) {
            console.log(error);
            setToaster({
                isToastOpen: true,
                message: error.message,
                type: 'error'
            });
        }
        setIsLoading(false);
    }

    return (<Box >
        <Loader isLoading={isLoading} />
        <Toaster {...toaster} toasterClose={toasterClose} />
        <Paper sx={{ p: 2 }}>
            <Typography textAlign={'center'} variant="h6">
               Wallet
            </Typography>
        </Paper>
        <Grid my={1} container spacing={6}>
        <Grid item xs={3}>
            </Grid>
        
            <Grid item xs={6}>
                <Paper sx={{ p: 2 }}>

                    <Typography textAlign={'center'} variant="body1" >
                        DTH Recharge
                    </Typography>
                    
                    <Box mt={2} >
                            <Box>
                            <FormControl variant="outlined" fullWidth required size="small">
                                <InputLabel htmlFor="outlined-adornment-email">Operator</InputLabel>
                                <Select
                                    id="operator"
                                    value={payload.operator}
                                    onChange={(e) => setPayload({...payload,operator:e.target.value})}
                                    label="Operator"
                                >
                                    {dthList.map((item:any) => (
                                        <MenuItem key={item.OperatorName} value={item.OperatorName}>{item.OperatorDisplayName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            </Box>
                            <Box mt={2}>
                                <FormControl variant="outlined" fullWidth required size="small">
                                    <InputLabel htmlFor="outlined-adornment-email">CA Number</InputLabel>
                                    <OutlinedInput type={'number'} id="canumber" label={'CA Number'}
                                    onChange={(e) => setPayload({ ...payload, canumber: e.target.value })}
                                    value={payload.canumber}
                                    />
                                </FormControl>
                                <FormHelperText sx={{
                                    color:'#1a0b99',
                                    fontWeight: 600,
                                    marginLeft: 1
                                }} id="my-helper-text">Enter your customer ID / Mobile number</FormHelperText>
                                </Box>
                            <Box mt={2}>
                                <FormControl variant="outlined" fullWidth required size='small'>
                                    <InputLabel htmlFor="outlined-adornment-email">Amount</InputLabel>
                                    <OutlinedInput type={'number'} id="amount" label={'Amount'}
                                    onChange={(e) => setPayload({ ...payload, amount: e.target.value })}
                                    value={payload.amount}
                                    />
                                </FormControl>
                                </Box>
                                <Box mt={2}>
                                <Button 
                                    variant="contained" fullWidth size="small" color={'success'} onClick={recharge}>
                                    Proceed
                                </Button>
                            </Box>
                         
                            


                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={3}>
            </Grid>
            {/* <Grid item xs={6}>
                <Paper sx={{ p: 2 }}>
                    <Typography textAlign={'center'} variant="body1">
                        Plans
                    </Typography>
                </Paper>
            </Grid> */}
        </Grid>
    </Box>
    );
}

export default Dth;
