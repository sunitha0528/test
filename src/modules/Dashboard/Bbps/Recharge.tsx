import { Box, Typography, Paper, Button, Grid, Tab, Tabs, Select, MenuItem, FormControl, FormHelperText, OutlinedInput, InputLabel, InputAdornment } from '@mui/material';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import {
    useGetOperatorAndCircleQuery,
    useGetDefaultOperatorAndCircleMutation,
    useGetRechargePlansMutation,
    useDoRechargeMutation
} from '@store/apis/users-api-slice';
import { useState, useEffect } from 'react';
import Loader from '@components/Loader';
import Toaster from '@components/Toaster';
import Wallet from '@components/Wallet';


export type AlertColor = 'success' | 'info' | 'warning' | 'error';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
type ToasterProps = {
    message: string,
    type: AlertColor,
    isToastOpen: boolean
  }

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Recharge = () => {
    const operatorAndCircleResp = useGetOperatorAndCircleQuery();
    const [operatorAndCircle, setOperatorAndCircle] = useState<any>({
        operators: [],
        circles: []
    })
    const [payload, setPayload] = useState<any>({
        mobileNumber: '',
        operator: '',
        circle: '',
        amount: ''
    })
    const [toaster, setToaster] = useState<ToasterProps>({
        isToastOpen: false,
        message: '',
        type: 'success'
      });
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [rechargePlans, setRechargePlans] = useState<any[]>([]);
    const [rechargeDescription, setRechargeDescription] = useState<string>('');
    const [getDefaultOperatorAndCircle] = useGetDefaultOperatorAndCircleMutation();
    const [getRechargePlans] = useGetRechargePlansMutation();
    const [doRecharge] = useDoRechargeMutation();
    useEffect(() => {
        // if (operatorAndCircleResp.data
        //     && operatorAndCircleResp.data.operator
        //     && operatorAndCircleResp.data.operator.length > 0
        //     && operatorAndCircleResp.data.circle
        //     && operatorAndCircleResp.data.circle.length > 0
        // ) {
        if (operatorAndCircleResp.data) {
            setOperatorAndCircle(operatorAndCircleResp.data)

        }
    }, [operatorAndCircleResp.data])

    const getDefaulOeratorAndCircle = async (mobile: string) => {
        setIsLoading(true);
        const getDefaulOeratorAndCircleResp = await getDefaultOperatorAndCircle({
            mobile
        }).unwrap();
        if (getDefaulOeratorAndCircleResp) {
            setPayload({
                ...payload,
                mobileNumber: mobile,
                operator: getDefaulOeratorAndCircleResp.operator, circle: getDefaulOeratorAndCircleResp.circle
            })
        }
        setIsLoading(false);
    }


    const enterMobileNumber = (e: any) => {


        if (e.target.value.length === 10) {
            getDefaulOeratorAndCircle(e.target.value)

        } else {
            setPayload({
                ...payload,
                mobileNumber: e.target.value,
                operator: '',
                circle: '',
                amount: ''
            })
        }

    }
    useEffect(() => {
        if (payload.operator && payload.circle) {
            setRechargePlans([])
            getPlans()
        }
    }
        , [payload.operator, payload.circle])

    const getPlans = async () => {
        try {
            setIsLoading(true);
            const getPlansResp: any = await getRechargePlans({
                operator: payload.operator,
                circle: payload.circle
            }).unwrap();
            setIsLoading(false);
            if (getPlansResp) {
                let list: any = []
                Object.keys(getPlansResp).map((key: any) => {
                    if (getPlansResp[key]) {
                        list.push({
                            key,
                            list: getPlansResp[key]
                        })
                    }

                })
                setRechargePlans(list)
                // setRechargePlans(getPlansResp)
            }

        }
        catch (e) {
            console.log(e)
        }
    }

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(event)
        setSelectedTab(newValue);
    }

    useEffect(() => {
        setRechargeDescription('')
        if (rechargePlans.length && payload.amount) {
            setPlanDescription()
        }
    }, [payload.amount])

    const setPlanDescription = () => {
        rechargePlans.map((item: any) => {
            item.list.map((plan: any) => {
                if (Number(plan.rs) === Number(payload.amount)) {
                    setRechargeDescription(plan.desc)
                }
            })
        })
    }


    useEffect(() => {
        if (payload.amount) {
            setPlanDescription()
        }
    }, [rechargePlans])

    // doRecharge
    const recharge = async () => {
        try {
            // console.log(operatorAndCircle.operators, 'operatorAndCircle.operators')
            const getOperator: any = operatorAndCircle.operators.find((item: any) => item.OperatorName === payload.operator)
            if (getOperator) {
                let doRechargePayload = {
                    "operator": Number(getOperator.ID),
                    "canumber": Number(payload.mobileNumber),
                    "amount": Number(payload.amount),
                    "circle": payload.circle,
                }
                setIsLoading(true);
                const doRechargeResp: any = await doRecharge(doRechargePayload).unwrap();
                setIsLoading(false);
                // console.log(doRechargeResp)
                if(doRechargeResp.status === 200){
                    setToaster({
                        isToastOpen: true,
                        message: doRechargeResp.message,
                        type: 'success'
                      });
                }
                else {
                    setToaster({
                        isToastOpen: true,
                        message: doRechargeResp.message,
                        type: 'error'
                      });
                }
                // setIsLoading(false);
                // if (doRechargeResp.status === 200) {
                //     setPayload({
                //         ...payload,
                //         mobileNumber: '',
                //         operator: '',
                //         circle: '',
                //         amount: ''
                //     })

                    console.log(doRechargeResp)
                // }

            }


        }
        catch (e) {
            console.log(e)
        }
    }
    const toasterClose = () => {
        setToaster({
          isToastOpen: false,
          message: '',
          type: 'success'
        });
      }


    return (
        <Box >
            <Loader isLoading={isLoading} />
            <Toaster {...toaster} toasterClose={toasterClose} />
            <Wallet />
            {/* <Paper sx={{ p: 2 }}>
                <Typography textAlign={'center'} variant="h6">
                    Recharge
                </Typography>
            </Paper> */}
            <Grid my={1} container spacing={2}>
                <Grid item xs={4}>
                    <Paper sx={{ p: 2 }}>

                        <Typography textAlign={'center'} variant="body1" >
                            Recharge
                        </Typography>
                        <Box mt={2} >
                            <Box>
                                <FormControl variant="outlined" fullWidth required size="small">
                                    <InputLabel htmlFor="outlined-adornment-mobile-number">Mobile Number</InputLabel>
                                    <OutlinedInput type={'number'} id="mobile" label={'Mobile Number'}
                                        onChange={enterMobileNumber}
                                        value={payload.mobileNumber}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <ContactPageIcon />
                                            </InputAdornment>
                                        }
                                    />
                                    {/* <FormHelperText error id="accountId-error-1">{error.email}</FormHelperText> */}
                                </FormControl>
                            </Box>
                            <Box mt={2}>
                                <FormControl variant="outlined" fullWidth required size="small">
                                    <InputLabel htmlFor="outlined-adornment-mobile-number">Operator</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-Operator-label"
                                        id="demo-simple-select-Operator"
                                        label="Operator"
                                        value={payload.operator}
                                        onChange={(e: any) => setPayload({ ...payload, operator: e.target.value })}
                                    >
                                        {operatorAndCircle.operators.map((item: any) => <MenuItem key={item.OperatorName} value={item.OperatorName}>{item.OperatorDisplayName}</MenuItem>)}

                                    </Select>
                                    {/* <FormHelperText error id="accountId-error-1">{error.email}</FormHelperText> */}
                                </FormControl>
                            </Box>
                            <Box mt={2}>
                                <FormControl variant="outlined" fullWidth required size="small">
                                    <InputLabel htmlFor="outlined-adornment-mobile-number">Circle</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-Circle-label"
                                        id="demo-simple-select-Circle"
                                        label="Circle"
                                        value={payload.circle}
                                        onChange={(e: any) => setPayload({ ...payload, circle: e.target.value })}
                                    >
                                        {operatorAndCircle.circles.map((item: any) => <MenuItem key={item.OperatorName} value={item.OperatorName}>{item.OperatorDisplayName}</MenuItem>)}

                                    </Select>
                                    {/* <FormHelperText error id="accountId-error-1">{error.email}</FormHelperText> */}
                                </FormControl>
                            </Box>
                            <Box mt={2}>
                                <FormControl variant="outlined" fullWidth required size="small">
                                    <InputLabel htmlFor="outlined-adornment-Amount">Amount</InputLabel>
                                    <OutlinedInput type={'number'} id="Amount" label={'Amount'}
                                        value={payload.amount}
                                        onChange={(e) => setPayload({ ...payload, amount: e.target.value })}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <ContactPageIcon />
                                            </InputAdornment>
                                        }
                                    />
                                    <FormHelperText sx={{
                                        fontWeight: 'bold',
                                        color: 'green'
                                    }} id="accountId-error-1">{rechargeDescription}</FormHelperText>
                                </FormControl>
                            </Box>
                            <Box mt={2}>
                                <Button disabled={!payload.amount || !payload.circle || !payload.operator}
                                    variant="contained" fullWidth size="small" color={'success'} onClick={recharge}>
                                    Proceed
                                </Button>
                            </Box>

                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper sx={{ p: 2 }}>
                        <Typography textAlign={'center'} variant="body1">
                            Plans
                        </Typography>
                        <Box >
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={selectedTab} onChange={handleTabChange} aria-label="basic tabs example">
                                    {/* <Tab label="Item One" {...a11yProps(0)} />
                                <Tab label="Item Two" {...a11yProps(1)} />
                                <Tab label="Item Three" {...a11yProps(2)} /> */}
                                    {rechargePlans.map((item: any, index: number) => <Tab key={index} label={item.key} {...a11yProps(index)} />)}
                                </Tabs>
                            </Box>
                            {rechargePlans.map((item: any, index: number) => <CustomTabPanel key={index} value={selectedTab} index={index}>
                                {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}> */}
                                {item.list.map((plan: any, subIndex: number) => <Grid key={subIndex} my={1} container spacing={2}>
                                    <Grid item xs={2}>
                                        <Typography variant="body1">
                                            {plan.validity}
                                        </Typography>


                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body1">
                                            {plan.desc}
                                        </Typography>

                                    </Grid>

                                    <Grid item xs={2}>
                                        <Button variant="outlined" size="small" onClick={() => {
                                            setPayload({ ...payload, amount: plan.rs })
                                        }}>
                                            Rs {plan.rs}
                                        </Button>
                                        {/* <Typography variant="body1">
                                                {plan.rs}
                                            </Typography> */}
                                    </Grid>
                                </Grid>)}
                                {/* <Typography variant="body1">
                                    {item.key}
                                </Typography>
                                <Typography variant="body1">
                                   
                                </Typography> */}
                                {/* </Box> */}
                            </CustomTabPanel>)}
                            {/* <CustomTabPanel value={selectedTab} index={0}>
                            Item One
                        </CustomTabPanel>
                        <CustomTabPanel value={selectedTab} index={1}>
                            Item Two
                        </CustomTabPanel>
                        <CustomTabPanel value={selectedTab} index={2}>
                            Item Three
                        </CustomTabPanel> */}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            {/* <Box mt={2} justifyContent={}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6">
                        Recharge
                    </Typography>
                </Paper>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6">
                        Recharge
                    </Typography>
                </Paper>
                </Box> */}


        </Box >
    )
}

export default Recharge