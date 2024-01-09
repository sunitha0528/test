import React, { useState } from 'react'
import {  Box, Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Typography } from '@mui/material'
import Logo from '@components/Logo';
// import EWallet from '@assets/images/e-wallet.png';
// import CardCoins from '@assets/images/cards.png';
import IllustrationDashboard from '@assets/images/illustration_dashboard.png';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useUserLoginMutation, useUserLoginOtpVerifyMutation } from '@store/apis/users-api-slice';
import Toaster from '@components/Toaster';
import OtpModel from '@components/OtpModel';
import Loader from '@components/Loader';
import { useNavigate } from 'react-router-dom';
import useUserHook from '@hooks/useUserHook';


export type AlertColor = 'success' | 'info' | 'warning' | 'error';

type ToasterProps = {
  message: string,
  type: AlertColor,
  isToastOpen: boolean
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verfyToken, setVerfyToken] = useState('')
  const { setToken } = useUserHook();
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    Email: 'ashokcse505@gmail.com',
    Password: 'Test@123',
  });
  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const [userLogin] = useUserLoginMutation();
  const [userLoginOtpVerify] = useUserLoginOtpVerifyMutation();

  const [otpModel, setOtpModel] = useState({
    isOtpModelOpen: false,
    errorMessage: '',
    warmMessage: '',
    otp: ''
  });
  const [toaster, setToaster] = useState<ToasterProps>({
    isToastOpen: false,
    message: '',
    type: 'success'
  });


  const validateForm = () => {
    let isValid = true;
    const errorObj = {
      email: '',
      password: '',
    }
    if (!loginDetails.Email) {
      errorObj.email = 'Email is required';
      isValid = false;
    }
    if (!loginDetails.Password) {
      errorObj.password = 'Password is required';
      isValid = false;
    }
    setError(errorObj);
    return isValid;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({
      email: '',
      password: '',
    });
    if (!validateForm()) {
      return
    }
    setIsLoading(true);
    const resp: any = await userLogin(loginDetails).unwrap();
    setIsLoading(false);
    console.log(resp);
    if (resp.status === 200) {
      setVerfyToken(resp.data.token)
      setToaster({
        isToastOpen: true,
        message: resp.message,
        type: 'success'
      });
      setOtpModel({
        ...otpModel,
        warmMessage: resp.data.session,
        isOtpModelOpen: true
      });

    }
    else {
      setToaster({
        isToastOpen: true,
        message: resp.message,
        type: 'error'
      });
    }
    // console.log(loginDetails);
  }




  const handleClickShowPassword = () => setShowPassword((show) => !show);


  /* common */
  const toasterClose = () => {
    setToaster({
      isToastOpen: false,
      message: '',
      type: 'success'
    });
  }
  /* common end */

  const confirmOtp = async () => {
    try {
      setIsLoading(true);
      const resp: any = await userLoginOtpVerify({
        token: verfyToken,
        otp: otpModel.otp
      }).unwrap();
      setIsLoading(false);
      if (resp.status === 200) {
        setOtpModel({
          ...otpModel,
          isOtpModelOpen: false
        });
        setToaster({
          isToastOpen: true,
          message: resp.message,
          type: 'success'
        });
        setToken(resp.data.data)
        navigate('/dashboard/overview')

      }
      else {
        setToaster({
          isToastOpen: true,
          message: resp.message,
          type: 'error'
        });
      }

    } catch (err: any) {
      setToaster({
        isToastOpen: true,
        message: err.message,
        type: 'error'
      });
    }
  }

  return (
    <div>
      <Box py={5} px={15}>
        {/* commom files */}
        <Loader isLoading={isLoading} />
        <Toaster {...toaster} toasterClose={toasterClose} />
        <OtpModel otpModel={otpModel} setOtpModel={setOtpModel} confirmOtp={confirmOtp} />
        {/* common files end */}
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Logo />
          </Grid>
          <Grid item xs={9}>
            <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
              <Typography variant="body1" >  New user?  <Link href="/register" underline="none">Create an account.</Link> </Typography>
            </Box>
            
            {/* <Typography variant="h4" > Hi, Welcome back</Typography> */}
          </Grid>
        </Grid>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Box mt={6} height={550} >
                <img src={IllustrationDashboard} alt="wallet" className={'img-fluid'}
                  style={{
                    filter: 'drop-shadow(4px 10px 8px #acacac)'
                  }} />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box mt={6}>
                <Typography variant="h5" > Sign in to UtiliSwift </Typography>
                <Typography variant="body1" mt={2}>  New user?  <Link href="/register" underline="none">Create an account.</Link> </Typography>
              </Box>
              {/* <Box mt={4} >
                <Alert severity="info">
                  <AlertTitle>Use the below demo details to login</AlertTitle>
                  <Typography variant="body1" > Email : <strong>user@example.com</strong> </Typography>
                  <Typography variant="body1" > Password : <strong>Test@123</strong> </Typography>
                </Alert>
              </Box> */}
              <Box mt={4}>
                {/* create email , password, forgot password and login button */}
                <Box component="form" noValidate onSubmit={handleSubmit} autoComplete="off"  >
                  <Box>
                    <FormControl variant="outlined" fullWidth required>
                      <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                      <OutlinedInput type={'email'} id="Email" label={'Email'}
                        onChange={(e) => setLoginDetails({ ...loginDetails, Email: e.target.value })}
                        value={loginDetails.Email}
                        error={error.email ? true : false}
                        endAdornment={
                          <InputAdornment position="end">
                            <MailOutlineIcon />
                          </InputAdornment>
                        }
                      />
                      {error.email && <FormHelperText error id="accountId-error-1">{error.email}</FormHelperText>}
                    </FormControl>
                  </Box>
                  <Box mt={3}>
                    <FormControl variant="outlined" fullWidth required>
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput type={showPassword ? 'text' : 'password'} id="Password" label={'Password'}
                        onChange={(e) => setLoginDetails({ ...loginDetails, Password: e.target.value })}
                        value={loginDetails.Password}
                        error={error.password ? true : false}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {error.password && <FormHelperText error id="accountId-error-2">{error.password}</FormHelperText>}
                    </FormControl>
                  </Box>
                  <Box mt={3} textAlign={'end'}>
                    <Link href="#" underline="none">Forgot password?</Link>
                  </Box>
                  <Box mt={3}>
                    <Button variant="contained" type='submit' color={'success'} fullWidth size={'large'}> Login </Button>
                  </Box>
                </Box>

              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  p: 1,
                  m: 1,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                }}
              >
                <Box p={1}>
                  <Box display={'flex'} flexDirection={'column'}>
                    <Typography variant="body1" >  Useful Links  </Typography>
                    <Link href="#" underline="none">About Us</Link>
                    <Link href="#" underline="none">Contact Us</Link>
                    <Link href="#" underline="none">Privacy Policy</Link>
                    <Link href="#" underline="none">Terms & Conditions</Link>
                    <Link href="#" underline="none">Cancellation & Refund Policy</Link>
                  </Box>
                  
                </Box>
                <Box p={1}>
                  <img width={200} src={"https://aashyatech.com/wp-content/uploads/2022/09/3-e1704450644266.png"} alt="wallet" className={'img-fluid'} />
                </Box>
                <Box p={1}>
                  <img width={200} src={"https://aashyatech.com/wp-content/uploads/2022/09/3-e1704450644266.png"} alt="wallet" className={'img-fluid'} />
                </Box>



              </Box>
              {/* <Box mt={6} display={'flex'} justifyContent={'center'}>
                <img width={200} src={"https://aashyatech.com/wp-content/uploads/2022/09/3-e1704450644266.png"} alt="wallet" className={'img-fluid'} />
              </Box>
              <Box display={'flex'} justifyContent={'center'}>
                <Typography variant="body1" >  Aashya Tech Solutions © 2024. All Rights Reserved. </Typography>

              </Box> */}
              {/*      <Box mt={4} >
                <Alert severity="info">
                  <AlertTitle>Use the below demo details to login</AlertTitle>
                  <Typography variant="body1" > Email : <strong>user@example.com</strong> </Typography>
                  <Typography variant="body1" > Password : <strong>Test@123</strong> </Typography>
                </Alert>
              </Box> */}

            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  )
}

export default Login