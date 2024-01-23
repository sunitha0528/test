import { useParams } from 'react-router-dom';
import useDataConverter from '@hooks/useDataConverter';
import { useGetBillerCategoryListMutation } from '@store/apis/bbps-api-slice';
import { useEffect, useState } from 'react';
import Loader from '@components/Loader';
import Toaster from '@components/Toaster';
import { Box, Typography, Paper, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

// import { Box, Typography, Paper, Button, Grid, Select, MenuItem, FormControl, FormHelperText, OutlinedInput, InputLabel } from '@mui/material';

export type AlertColor = 'success' | 'info' | 'warning' | 'error';

type ToasterProps = {
    message: string,
    type: AlertColor,
    isToastOpen: boolean
}

const BillerView = () => {
    const { decryptString } = useDataConverter();
    const { name } = useParams();
    const categoryName = decryptString(name || '');
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [getBillerCategoryList] = useGetBillerCategoryListMutation();
    const [payload, setPayload] = useState({
        operator: '',
        canumber: '',
        amount: ''
    });
    const [toaster, setToaster] = useState<ToasterProps>({
        isToastOpen: false,
        message: '',
        type: 'success'
    });

    useEffect(() => {
        if (categoryName) {
            getBillerList();
        }
    }, [categoryName])

    const getBillerList = async() => {
        setIsLoading(true);
        const resp:any =await getBillerCategoryList({ category: categoryName }).unwrap();
        setIsLoading(false);
            if (resp && resp.status === 200) {
                setCategoryList(resp.data.billers);
                console.log(resp.data.billers)
            }
            
        }
    
        const toasterClose = () => {
            setToaster({
              isToastOpen: false,
              message: '',
              type: 'success'
            });
          }
    // console.log(categoryName)
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
                        {categoryName}
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
                                    {categoryList.map((item:any) => (
                                        <MenuItem key={item.billerId} value={item.billerId}>{item.billerName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                           </Box>
                          {/*    <Box mt={2}>
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
                            </Box> */}
                         
                            


                    </Box>
                </Paper>
            </Grid>
           
       
        </Grid>
    </Box>
    );
}
export default BillerView;