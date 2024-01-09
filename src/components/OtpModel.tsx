	
import {useEffect,useState} from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { MuiOtpInput } from 'mui-one-time-password-input'


type OtpModelProps = {
    otpModel: {
        isOtpModelOpen: boolean
        errorMessage: string,
        warmMessage?: string,
         otp: string

    },
    setOtpModel: (otpModel:any) => void,
    confirmOtp: () => void
}

const OtpModel = ({
    otpModel,
    setOtpModel,
    confirmOtp

}:OtpModelProps) => {
const [minutes, setMinutes] = useState(2);
const [seconds, setSeconds] = useState(59);

    // const matchIsNumeric = (text:any) => {
    //     const isNumber = typeof text === 'number'
    //     const isString = matchIsString(text)
    //     return (isNumber || (isString && text !== '')) && !isNaN(Number(text))
    //   }
    const isNumeric = (str:string) =>{
        if (typeof str != "string") return false // we only process strings! 
        //@ts-ignore 
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
               !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
      }

    const handleChange = (newValue:any) => {
        setOtpModel({...otpModel,otp:newValue})
    //   setOtp(newValue)
    }
    const validateChar = (value:string) => {
        return isNumeric(value)
      }


      useEffect(() => {
        const interval = setInterval(() => {
          if (seconds > 0) {
            setSeconds(seconds - 1);
          }
      
          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(interval);
            } else {
              setSeconds(59);
              setMinutes(minutes - 1);
            }
          }
        }, 1000);
      
        return () => {
          clearInterval(interval);
        };
      }, [seconds])

  return (
    <Dialog open={otpModel.isOtpModelOpen}>
      <DialogTitle>
        {/* We sent a 6-digit code to your phone number */}
        {/* <Typography variant="h6">Please enter OTP </Typography> */}
        <Box textAlign={'center'}>
        Verify OTP
        </Box>
      </DialogTitle>
      <DialogContent>
        {/* <Typography > */}
          {/* Are you sure you want to delete this user? */}
          <MuiOtpInput color={'red'} length={6} value={otpModel.otp} onChange={handleChange} validateChar={validateChar} />
          {otpModel.warmMessage && <Typography my={2} variant="subtitle2" color={'error'}>{otpModel.warmMessage}</Typography>}
          <Box mt={1}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
              
            
            <Box textAlign={'start'}>
            {minutes === 0 && seconds === 0
              ? null
              : <Typography variant="h6">Resend OTP in {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</Typography>
            }
            </Box>
            {/* <Box justifyContent={"end"} alignItems={'end'}>
            {minutes === 0 && seconds === 0
              ? <Typography variant="h6">Resend OTP</Typography>
              : <Typography variant="h6">Resend OTP</Typography>
            }
            </Box> */}
            </Box>
            </Box>

        {/* </Typography> */}
        {/* <Typography variant="subtitle2">
          You can't undo this operation
        </Typography> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={confirmOtp} variant="contained" disabled={otpModel.otp.length !== 6} color={'success'} fullWidth >Confirm</Button>
        {/* <Button variant="contained">No</Button>
        <Button variant="contained" color="error"> */}
   
      </DialogActions>
    </Dialog>
  );
};
 
export default OtpModel;