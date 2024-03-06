
import { useState } from "react";
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
  InputAdornment,
  Select,
  MenuItem
} from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useWalletDetailsMutation } from '@store/apis/users-api-slice';
import Loader from '@components/Loader';
import Toaster from '@components/Toaster';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export type AlertColor = 'success' | 'info' | 'warning' | 'error';

type DepositProps = {
  openDeposit: boolean;
  setOpenDeposit: (openDeposit: boolean) => void;
  refresh: () => void;
};

type ToasterProps = {
  message: string,
  type: AlertColor,
  isToastOpen: boolean
}

const Deposit = ({
  openDeposit,
  setOpenDeposit,
  refresh
}: DepositProps) => {
  const [amount, setAmount] = useState(0);
  const [pg, setPg] = useState('Phone Pe' as string);
  const [userWalletDetails] = useWalletDetailsMutation();
  const [toaster, setToaster] = useState<ToasterProps>({
    isToastOpen: false,
    message: '',
    type: 'success'
  });
  const [isLoading, setIsLoading] = useState(false);

  const deposit = async () => {
    try {
      setIsLoading(true);
      const data = {
        amount: amount,
        MUID: "MUID" + Date.now(),
        pg: pg,
        transactionId: 'T' + Date.now(),
      }
      const response: any = await userWalletDetails({
        ...data
        // amount: amount
      });
      setIsLoading(false);
      if (response.data.status === 200) {
        setToaster({
          isToastOpen: true,
          message: response.data.message,
          type: 'success'
        });
        // console.log(response.data.data)
        if (pg === 'Razorpay') {
          openRazorpay(response.data.data)
        }
        else {
          window.open(response.data.data.data.instrumentResponse.redirectInfo.url,"_self")
        }
        // refresh();
        // setOpenDeposit(false);
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

  const toasterClose = () => {
    setToaster({
      isToastOpen: false,
      message: '',
      type: 'success'
    });
  }
  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const openRazorpay = async (data: any) => {
    try {
      await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      // const { amount, id: order_id, currency } = result.data;

      const options = {
        key: data.key, // Enter the Key ID generated from the Dashboard
        // amount: amount.toString(),
        // currency: currency,
        name: "aashyatech",
        description: "Test Transaction",
        image: { logo: 'https://blog.aashyatech.com/wp-content/uploads/2023/12/cropped-Aashya_Tech_Solutions__2_-removebg-preview.png' },
        order_id: data.id,
        handler: async function (response: any) {
          setOpenDeposit(false);
          refresh()
          console.log(response);
          // const data = {
          //     orderCreationId: order_id,
          //     razorpayPaymentId: response.razorpay_payment_id,
          //     razorpayOrderId: response.razorpay_order_id,
          //     razorpaySignature: response.razorpay_signature,
          // };

          // const result = await axios.post("http://localhost:5000/payment/success", data);

          // alert(result.data.msg);
        },
        prefill: {
          name: "Soumya Dey",
          email: "SoumyaDey@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Soumya Dey Corporate Office",
        },
        theme: {
          color: "#61dafb",
        },
      };
      //@ts-ignore
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
    catch (e: any) {
      console.log(e.message)
    }
  }


  return (
    <Dialog open={openDeposit}>
      <Loader isLoading={isLoading} />
      <Toaster {...toaster} toasterClose={toasterClose} />
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ flexGrow: 1 }}>Deposit</Box>
        </Box>

        {/* <Typography variant="h4">Lorem ipsum dolor sit amet consectetuer</Typography> */}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => {
          setOpenDeposit(false);
          setAmount(0);
        }}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box mt={2} >
              <Box>
                <FormControl variant="outlined" fullWidth required size="small">
                  <InputLabel htmlFor="outlined-adornment-mobile-number">Amount</InputLabel>
                  <OutlinedInput type={'text'} id="Amount" label={'Amount'}
                    onChange={(e) => {
                      const regex = /^[0-9\b]+$/;
                      if (e.target.value === "" || regex.test(e.target.value)) {
                        setAmount(Number(e.target.value))
                      }
                    }
                    }
                    value={amount}
                    endAdornment={
                      <InputAdornment position="end">
                        <CurrencyRupeeIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Box mt={2}>
                  <FormControl fullWidth required size="small">
                    <InputLabel id="demo-simple-select-label">PG</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="PG"
                      value={pg}
                      onChange={(e) => setPg(e.target.value as string)}
                    >
                      <MenuItem value={'Phone Pe'}>Phone Pe</MenuItem>
                      <MenuItem value={'Razorpay'}>Razorpay</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained" fullWidth size="small" color={'success'} onClick={deposit} >
              Proceed
            </Button>
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions>

      </DialogActions>
    </Dialog>
  );
};

export default Deposit;