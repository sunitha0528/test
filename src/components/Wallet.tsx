

import { useState, useEffect } from 'react'
import { Box, Grid, Paper, Button } from '@mui/material';
import Deposit from './Deposit';
import { useGetBalanceQuery } from '@store/apis/users-api-slice';




const options = {
    style: 'decimal',  // Other options: 'currency', 'percent', etc.
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
};

type WalletProps = {
    setAmountReload?: (amountReload: any) => void;
}

const Wallet = ({
    setAmountReload
}: WalletProps) => {
    const [openDeposit, setOpenDeposit] = useState(false);
    const wallet = useGetBalanceQuery();


    useEffect(() => {
        if (wallet.data && wallet.data.data ) {
            setWalletDetails({
                wallet: wallet.data.data.Amount,
                hold: wallet.data.data.HoldAmount
            })
        }
        //! setAmountReload is used to refresh the wallet amount in the header
        //@ts-ignore
        if (setAmountReload){
        setAmountReload(wallet);
        }
    }, [wallet.data])


    const [walletDetails, setWalletDetails] = useState({
        wallet: 0,
        hold: 0
    });
    const refresh = async () => {
        wallet.refetch();
    }

    // const [refresh, setRefresh] = useState(false);
    return (
        <Grid container spacing={2}>
            <Deposit openDeposit={openDeposit} setOpenDeposit={setOpenDeposit} refresh={refresh} />
            <Grid item xs={4}>
                <Paper  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ fontSize: 25, fontWeight: 'bold' }}>Wallet : ₹ {walletDetails.wallet.toLocaleString('en-US', options)}</Box>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ fontSize: 25, fontWeight: 'bold' }}>Hold : ₹ {walletDetails.hold.toLocaleString('en-US', options)}</Box>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                {/* <Paper  > */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button variant="contained" onClick={() => setOpenDeposit(true)} color="success" size='small'>Add Money</Button>
                    {/* <Box sx={{ fontSize: 25, fontWeight: 'bold' }}>Hold : ₹ 0</Box> */}
                </Box>
                {/* </Paper> */}
            </Grid>

        </Grid>

    )
}

export default Wallet;