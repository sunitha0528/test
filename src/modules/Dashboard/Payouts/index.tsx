import { Box, Typography, Paper, Button, Grid, FormControl, OutlinedInput, InputLabel, InputAdornment } from '@mui/material';
import {
    useGetBankAccountsMutation
} from '@store/apis/users-api-slice';
import { useState, useEffect } from 'react';
import Loader from '@components/Loader';
import Toaster from '@components/Toaster';
import Wallet from '@components/Wallet';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import AddBankDetails from '@components/AddBankDetails';
import useDebounce from '@hooks/useDebounce';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import Transfer from '@components/Transfer';



export type AlertColor = 'success' | 'info' | 'warning' | 'error';


type ToasterProps = {
    message: string,
    type: AlertColor,
    isToastOpen: boolean
}

const Payouts = () => {
    const [toaster, setToaster] = useState<ToasterProps>({
        isToastOpen: false,
        message: '',
        type: 'success'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [openBankModal, setOpenBankModal] = useState(false);
    const [amountReload, setAmountReload] = useState<any>(null);
    const [SearchBankDetails, setSearchBankDetails] = useState('');
    const { debouncedValue: searchWord } = useDebounce(SearchBankDetails, 200);
    const [getBankAccounts] = useGetBankAccountsMutation();
    const [banksList, setBanksList] = useState<any>([]);
    const [bankDetails, setBankDetails] = useState({
        // "RowNum": "1",
        // "BankDetailID": 5,
        // "IFSCCode": "KKBK0000811",
        // "BankName": "Kotak Mahindra Bank",
        // "BankUserName": "PENAMALLI ASHOK P",
        // "DisplayName": "Ashok KKB",
        // "AccountNumber": "43487889790",
        // "CreatedDate": "2024-01-07T15:41:30.857Z",
        // "Phone": "9491538125"
        BankDetailID: 0,
        AccountNumber: '',
        BankName: '',
        BankUserName: '',
        IFSCCode: '',
        Phone: '',
        DisplayName: '',
    });

    const [openPayoutModel, setOpenPayoutModel] = useState(false);

    useEffect(() => {
        // console.log(searchWord);
        getBankAccountsList()
    }, [searchWord])


    const toasterClose = () => {
        setToaster({
            isToastOpen: false,
            message: '',
            type: 'success'
        });
    }
    const refresh = () => {
        if (amountReload) {
            amountReload.refetch();
            getBankAccountsList();
        }
        // setRefresh(!refresh);
    }

    const getBankAccountsList = async () => {
        try {
            setIsLoading(true);
            const response: any = await getBankAccounts({
                SearchText: searchWord
            });
            setIsLoading(false);
            if (response.data.status === 200) {
                setBanksList(response.data.data);
                // setToaster({
                //     isToastOpen: true,
                //     message: response.data.message,
                //     type: 'success'
                // });
            }
            else {
                setToaster({
                    isToastOpen: true,
                    message: response.data.message,
                    type: 'error'
                });
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    return (
        <Box >
            <AddBankDetails openBankModal={openBankModal} setOpenBankModal={setOpenBankModal} refresh={refresh} />
            <Loader isLoading={isLoading} />
            <Toaster {...toaster} toasterClose={toasterClose} />
            <Transfer bankDetails={bankDetails} openPayoutModel={openPayoutModel} setOpenPayoutModel={setOpenPayoutModel} refresh={refresh} />
            <Wallet setAmountReload={setAmountReload} />
            <Grid my={1} container spacing={2}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex' }}>
                            <Grid item xs={4}>
                                <Typography variant="h6">Payouts</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <FormControl variant="outlined" fullWidth size="small">
                                        <InputLabel htmlFor="outlined-adornment-mobile-number">Search</InputLabel>
                                        <OutlinedInput type={'text'} id="Search-bank-details" label={'Search'}
                                            onChange={(e) => setSearchBankDetails(e.target.value)}
                                            value={SearchBankDetails}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            }

                                        />
                                        {/* {error.AccountHolderName && <FormHelperText error>{error.AccountHolderName}</FormHelperText>} */}
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                    <Button variant="contained" onClick={() => setOpenBankModal(true)} color="success" size='small'>Add Bank</Button>
                                </Box>
                            </Grid>

                        </Box>
                        <Box sx={{ display: 'flex', mt: 2, alignItems: 'center', justifyContent: 'content' }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell align="center">Account Holder Name</TableCell>
                                            <TableCell align="center">Nick Name</TableCell>
                                            <TableCell align="center">Bank Name</TableCell>
                                            <TableCell align="center">Account Number</TableCell>
                                            <TableCell align="center">IFSC COde</TableCell>
                                            <TableCell align="center">Mobile Number</TableCell>
                                            <TableCell align="center">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {banksList.map((row: any) => (
                                            <TableRow
                                                key={row.RowNum}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.RowNum}
                                                </TableCell>
                                                <TableCell align="center">{row.BankUserName}</TableCell>
                                                <TableCell align="center">{row.DisplayName}</TableCell>
                                                <TableCell align="center">{row.BankName}</TableCell>
                                                <TableCell align="center">{row.AccountNumber}</TableCell>
                                                <TableCell align="center">{row.IFSCCode}</TableCell>
                                                <TableCell align="center">{row.Phone}</TableCell>
                                                <TableCell align="center">
                                                    <Button variant="contained" onClick={()=>{
                                                        setBankDetails(row);
                                                        setOpenPayoutModel(true);
                                                    }} color="success" size='small' startIcon={<SendIcon />}></Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Paper>
                </Grid>


            </Grid>



        </Box >
    )
}

export default Payouts;