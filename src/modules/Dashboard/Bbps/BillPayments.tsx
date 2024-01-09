

// BillPayments

import { Box, Typography, Paper, Button, Grid, Select, MenuItem, FormControl, FormHelperText, OutlinedInput, InputLabel, InputAdornment } from '@mui/material';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import {
    useGetBillsOperatorsQuery,
    useFetchBillerDetailsMutation,
    useBillPaymentMutation
} from '@store/apis/users-api-slice';
import { useState, useEffect } from 'react';
import Loader from '@components/Loader';
import Toaster from '@components/Toaster';
import { useNavigate, useSearchParams } from 'react-router-dom';
import moment from "moment";
import useUserHook from '@hooks/useUserHook';
// import PaymentReceipt from '@components/PaymentReceipt';


export type AlertColor = 'success' | 'info' | 'warning' | 'error';


type ToasterProps = {
    message: string,
    type: AlertColor,
    isToastOpen: boolean
}

const BillPayments = () => {

    const { getDecryptData } = useUserHook();

    const [toaster, setToaster] = useState<ToasterProps>({
        isToastOpen: false,
        message: '',
        type: 'success'
    });
    const [isLoading, setIsLoading] = useState(true);
    const [billers, setBillers] = useState<any[]>([]);
    const [selectedOperator, setSelectedOperator] = useState({
        key: '',
        list: []
    });
    const [payload, setPayload] = useState({
        category: '',
        displayname: '',
        value: '',
        id: '',
        name: '',
        regex: '',
    })

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const bill = searchParams.get('bill');

    // "response_code": 1,
    // "status": true,
    // "amount": 100,
    // "name": "DUMMY NAME",
    // "duedate": "2021-06-16",
    // "bill_fetch": {
    //     "amount": 100,
    //     "name": "DUMMY NAME",
    //     "duedate": "2021-06-16",
    //     "ad2": "HDA47359184",
    //     "ad3": "VDA51827219"
    // },
    // "ad2": "HDA47359184",
    // "ad3": "VDA51827219",
    // "message": "Bill Fetched Success."

    const [billFetch, setBillFetch] = useState<any>({
        amount: null,
        name: null,
        duedate: null,
        ad2: null,
        ad3: null,
    });

    const [fetchBillerDetails] = useFetchBillerDetailsMutation();
    const [billPaymentService] = useBillPaymentMutation();

    const getBillOperators: any = useGetBillsOperatorsQuery();
    useEffect(() => {
        if (bill && billers.length) {
            const billersList = billers.find((item: any) => item.key === bill);
            console.log(billersList);
            setSelectedOperator(billersList);
        }
    }, [bill, billers]);

    useEffect(() => {
        if (getBillOperators.data) {
            setIsLoading(false);
            let list: any = []
            Object.keys(getBillOperators.data).map((key: any) => {
                if (getBillOperators.data[key]) {
                    list.push({
                        key,
                        list: getBillOperators.data[key]
                    })
                }
            })
            setBillers(list)
        }
    }
        , [getBillOperators.data]);

    const toasterClose = () => {
        setToaster({
            isToastOpen: false,
            message: '',
            type: 'success'
        });
    }

    const [error, setError] = useState('');
    const fethbill = async () => {
        setError('')
        const dynamicRegex = new RegExp(payload.regex);
        if (!dynamicRegex.test(payload.value)) {
            return setError('Please enter valid ' + payload.displayname);
        }

        try {
            setIsLoading(true);
            const fetchBillerDetailsResponse: any = await fetchBillerDetails({
                operator: Number(payload.id),
                canumber: payload.value,
                ad1: payload.name
            }).unwrap();
            setIsLoading(false);
            if (fetchBillerDetailsResponse.status === 200) {
                setBillFetch(fetchBillerDetailsResponse.data.bill_fetch);
                setToaster({
                    isToastOpen: true,
                    message: fetchBillerDetailsResponse.message,
                    type: 'success'
                });
            } else {
                setToaster({
                    isToastOpen: true,
                    message: fetchBillerDetailsResponse.message,
                    type: 'error'
                });
            }

            console.log(fetchBillerDetailsResponse);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }


    }

    useEffect(() => {
        userData();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, errorF);
        } else {
            console.log("Geolocation not supported");
        }
    }, []);

    const userData = async () => {
        const user: any = await getDecryptData();
        console.log(user)
    }

    const [geolocation, setGeolocation] = useState<any>({
        latitude: null,
        longitude: null
    });

    const success = (position: any) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setGeolocation({
            latitude,
            longitude
        })
        // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`)
    }

    const errorF = (err: any) => {
        console.log(err);
        console.log("Unable to retrieve your location");
    }

    const doPay = async () => {
        try {
            const user: any = await getDecryptData();
            // console.log(user)
            // console.log(billFetch)
            // console.log(moment().format("DDMMMYYYY"))
            // console.log(payload)
            const billPayPayload = {
                "operator": Number(payload.id),
                "canumber": payload.value,
                "amount": billFetch.amount,
                // "referenceid": "20018575947",
                "latitude": geolocation.latitude,
                "longitude": geolocation.longitude,
                // "mode": "online",
                "bill_fetch": {
                    "billAmount": billFetch.amount,
                    "billnetamount": billFetch.amount,
                    "billdate": moment().format("DDMMMYYYY"),
                    "dueDate": billFetch.duedate,
                    "acceptPayment": true,
                    "acceptPartPay": false,
                    "cellNumber": user.Phone,
                    "userName": billFetch.name,
                }
            }
            const billPaymentServiceResponse: any = await billPaymentService(billPayPayload).unwrap();
            console.log(billPaymentServiceResponse)
            if (billPaymentServiceResponse.status === 200) {
                setToaster({
                    isToastOpen: true,
                    message: billPaymentServiceResponse.message,
                    type: 'success'
                });
                // navigate('/dashboard/overview')
            } else {
                setToaster({
                    isToastOpen: true,
                    message: billPaymentServiceResponse.message,
                    type: 'error'
                });
            }

            // console.log(billPayPayload)

        }
        catch (error) {

        }
    }


    return (<Box >
        <Loader isLoading={isLoading} />
        <Toaster {...toaster} toasterClose={toasterClose} />
        {/* <PaymentReceipt /> */}
        {!bill && (<Paper sx={{ p: 2, backgroundColor: 'grey.300' }}>
            <Grid my={1} justifyContent={'center'} container>
                {billers.map((item: any) => (<Grid key={item.key}
                    onClick={() => {
                        navigate('/dashboard/bbps/BillPayments?bill=' + item.key)
                    }}
                    sx={{
                        backgroundColor: '#fff',
                        margin: 1,
                        borderRadius: 2,
                        padding: 1,
                        cursor: 'pointer',
                    }}
                    item xs={2}>
                    <Typography textAlign={'center'} variant="body1">
                        <img width={30} src={'https://m.media-amazon.com/images/G/31/img22/Apay/Icons/APD_NewIcons/V1_Filledicons/icon_set_Pratima_Elec._CB616315948_.png'} alt={item.key} />
                    </Typography>
                    <Typography textAlign={'center'} variant="body1">
                        {item.key}
                    </Typography>
                </Grid>))}

            </Grid>

        </Paper>)}
        {bill && (<Box>
            <Paper sx={{ p: 2 }}>
                <Typography textAlign={'center'} variant="h6">
                    {bill} Bill Payment
                </Typography>
            </Paper>
            <Grid my={1} container spacing={2}>
                {!billFetch.name && (<Grid item xs={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography textAlign={'center'} variant="body1" >
                            {selectedOperator.key}
                        </Typography>
                        <Box mt={2} >
                            <Box>
                                <FormControl variant="outlined" fullWidth required size="small">
                                    <InputLabel htmlFor="outlined-adornment-email">{selectedOperator.key}</InputLabel>
                                    <Select
                                        id="operator"
                                        value={payload.name}
                                        onChange={(e) => {
                                            const selectedData: any = selectedOperator.list.find((item: any) => item.name === e.target.value);
                                            console.log(selectedData)
                                            setPayload({
                                                ...payload,
                                                category: selectedData.category,
                                                displayname: selectedData.displayname,
                                                id: selectedData.id,
                                                name: selectedData.name,
                                                regex: selectedData.regex,
                                                value: ''
                                            })

                                        }}
                                        label={selectedOperator.key}
                                    >
                                        {selectedOperator.list.map((item: any) => (
                                            <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            {payload.name && (<Box mt={2}>
                                <FormControl variant="outlined" fullWidth required size="small">
                                    <InputLabel htmlFor="outlined-adornment-email">{payload.displayname}</InputLabel>
                                    <OutlinedInput type={'text'} id="Email" label={payload.displayname}
                                        onChange={(e) => {
                                            setPayload({ ...payload, value: e.target.value })
                                        }}
                                        value={payload.value}
                                        error={false}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <ContactPageIcon />
                                            </InputAdornment>
                                        }
                                    />
                                    {error && <FormHelperText error id="accountId-error-1">{error}</FormHelperText>}
                                </FormControl>
                            </Box>)}
                            <Box mt={2} textAlign={'center'}>
                                <Button
                                    variant="contained" size="small" color={'success'} onClick={fethbill}>
                                    Fetch
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>)}
                {billFetch.name && (<Grid item xs={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography textAlign={'center'} variant="body1" >
                            {selectedOperator.key} - {payload.name}
                        </Typography>
                        <Box mt={2} >
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <Typography>Biller Name</Typography>
                                <Typography textAlign={'center'} variant="body1" >
                                    {billFetch.name}
                                </Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <Typography>Amount</Typography>
                                <Typography textAlign={'center'} variant="body1" >
                                    {billFetch.amount}
                                </Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <Typography>Due Date</Typography>
                                <Typography textAlign={'center'} variant="body1" >
                                    {billFetch.duedate}
                                </Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <Typography>Ad</Typography>
                                <Typography textAlign={'center'} variant="body1" >
                                    {billFetch.ad2}
                                </Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <Typography>Ad3</Typography>
                                <Typography textAlign={'center'} variant="body1" >
                                    {billFetch.ad3}
                                </Typography>
                            </Box>

                            <Box mt={2} textAlign={'center'}>
                                <Button
                                    variant="contained" size="small" color={'success'} onClick={doPay}>
                                    Bill Pay Now ({billFetch.amount})
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>)}
            </Grid>
        </Box>)}





    </Box>
    );
}

export default BillPayments;
