import { useState } from 'react'
import { FormHelperText, Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Typography } from '@mui/material'
import Logo from '@components/Logo';
// import EWallet from '@assets/images/e-wallet.png';
// import CardCoins from '@assets/images/cards.png';
import IllustrationDashboard from '@assets/images/illustration_dashboard.png';

import Visibility from '@mui/icons-material/Visibility';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import PersonIcon from '@mui/icons-material/Person';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { useAddUserMutation,useAddUserVerifyOtpMutation } from '@store/apis/users-api-slice';
import Loader from '@components/Loader';
import Toaster from '@components/Toaster';
import OtpModel from '@components/OtpModel';
import Diversity3Icon from '@mui/icons-material/Diversity3';


export type AlertColor = 'success' | 'info' | 'warning' | 'error';

type ToasterProps = {
  message: string,
  type: AlertColor,
  isToastOpen: boolean
}


const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toaster, setToaster] = useState<ToasterProps>({
    isToastOpen: false,
    message: '',
    type: 'success'
  });
  // FirstName, LastName, Email, Phone, DOB, Password
  const [SignUp] = useAddUserMutation();
  const [SignUpVerifyOtp] = useAddUserVerifyOtpMutation();

  const [formData, setFormData] = useState({
    FirstName: 'Ashok',
    LastName: 'Reddy',
    Email: 'ashokcse505@gmail.com',
    Phone: '9491538125',
    DOB: '2010-11-25',
    Password: 'Test@123',
    CofirmPassword: 'Test@123',
    ReferralCode: ''
  })



  const [errors, setErrors] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    DOB: '',
    Password: '',
    CofirmPassword: ''
  });

  const [otpModel, setOtpModel] = useState({
    isOtpModelOpen: false,
    errorMessage: '',
    otp: ''

  });

  const [verfyToken, setVerfyToken] = useState('')


  const validatePassword = (value: string) => {
    if (!value) {
      return 'Password is required';
    }

    // Check for minimum length
    if (value.length < 8) {
      return 'Password must be at least 8 characters long';
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(value)) {
      return 'Password must contain at least one uppercase letter';
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(value)) {
      return 'Password must contain at least one lowercase letter';
    }

    // Check for at least one digit
    if (!/\d/.test(value)) {
      return 'Password must contain at least one digit';
    }

    // Check for at least one special character
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value)) {
      return 'Password must contain at least one special character';
    }

    return '';
  };
  const validateForm = () => {
    let valid = true;
    let error = {
      FirstName: '',
      LastName: '',
      Email: '',
      Phone: '',
      DOB: '',
      Password: '',
      CofirmPassword: '',
      ReferralCode: ''
    };
    if (formData.FirstName === '') {
      valid = false;
      error.FirstName = 'First Name is required';
    }

    if (formData.FirstName) {
      if (formData.FirstName.trim().length < 4) {
        valid = false;
        error.FirstName = 'First Name should be atleast 4 characters';
      }
    }
    if (formData.LastName === '') {
      valid = false;
      error.LastName = 'Last Name is required';
    }
    if (formData.LastName) {
      if (formData.LastName.trim().length < 4) {
        valid = false;
        error.LastName = 'Last Name should be atleast 4 characters';
      }
    }
    if (formData.Email === '') {
      valid = false;
      error.Email = 'Email is required';
    }
    if (formData.Email) {
      if (!formData.Email.includes('@')) {
        valid = false;
        error.Email = 'Email should be valid';
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.Email)) {
        valid = false;
        error.Email = 'Email should be valid';
      }
    }
    if (formData.Phone === '') {
      valid = false;
      error.Phone = 'Phone is required';
    }
    if (formData.Phone) {

      if (formData.Phone.length !== 10) {
        valid = false;
        error.Phone = 'Phone should be 10 digits';
      }
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(formData.Phone)) {
        valid = false;
        error.Phone = 'Phone should be valid';
      }
    }
    if (formData.DOB === '') {
      valid = false;
      error.DOB = 'DOB is required';
    }
    if (validatePassword(formData.Password)) {
      valid = false;
      error.Password = validatePassword(formData.Password);
    }
    if (formData.CofirmPassword === '') {
      valid = false;
      error.CofirmPassword = 'Cofirm Password is required';
    }
    if (!error.CofirmPassword && !error.Password) {
      if (formData.Password !== formData.CofirmPassword) {
        valid = false;
        error.CofirmPassword = 'Password and Confirm Password should be same';
      }
    }
    setErrors(error);
    return valid;
  }


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (!validateForm()) {
        return;
      }

      setIsLoading(true);
      const res: any = await SignUp(formData).unwrap()
      setIsLoading(false);
      if (res.status === 400) {
        setToaster({
          isToastOpen: true,
          message: res.message,
          type: 'error'
        });
        return;
      } else if (res.status === 200) {
        setVerfyToken(res.data.token);
        setToaster({
          isToastOpen: true,
          message: res.message,
          type: 'success'
        });
        setOtpModel({
          isOtpModelOpen: true,
          errorMessage: '',
          otp: ''
        });
      } else {
        setToaster({
          isToastOpen: true,
          message: res.message,
          type: 'error'
        });
        return;
      }
      console.log('formData', res);
    } catch (err) {
      setIsLoading(false);
      console.log('err', err);

    }

  }

  const toasterClose = () => {
    setToaster({
      isToastOpen: false,
      message: '',
      type: 'success'
    });
  }




  const confirmOtp = async () => {
    try {
        // console.log('verfyToken',verfyToken);
        // console.log('otpModel.otp',otpModel.otp);
      setIsLoading(true);
      const res: any = await SignUpVerifyOtp({
        token: verfyToken,
        otp: otpModel.otp
      
      }).unwrap()
      setIsLoading(false);

      if (res.status === 200) {
        setOtpModel({
          isOtpModelOpen: false,
          errorMessage: '',
          otp: ''
        });
        setToaster({
          isToastOpen: true,
          message: res.message,
          type: 'success'
        });
      }
      else {
        setToaster({
          isToastOpen: true,
          message: res.message,
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
        <Loader isLoading={isLoading} />
        <Toaster {...toaster} toasterClose={toasterClose} />
        <OtpModel otpModel={otpModel} setOtpModel={setOtpModel} confirmOtp={confirmOtp} />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Logo />
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h4" > Hi, Welcome back</Typography>
          </Grid>
        </Grid>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box mt={6} height={550} >
                <img src={IllustrationDashboard} alt="wallet" className={'img-fluid'}
                  style={{
                    filter: 'drop-shadow(4px 10px 8px #acacac)'
                  }} />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box mt={6}>
                <Typography align='center' variant="h5" > SignUp </Typography>
                {/* <Typography variant="body1" mt={2}>  New user?  <Link href="#" underline="none">Create an account.</Link> </Typography> */}
              </Box>
              <Box mt={4}>
                {/* create email , password, forgot password and login button */}
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off"  >
                  <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <FormControl variant="outlined" fullWidth required>
                      <InputLabel htmlFor="outlined-adornment-name1">First Name</InputLabel>
                      <OutlinedInput type={'text'} id="first_Name" label={'First Name'}
                        onChange={(e) => setFormData({ ...formData, FirstName: e.target.value })}
                        value={formData.FirstName}
                        error={errors.FirstName ? true : false}
                        endAdornment={
                          <InputAdornment position="end">
                            <PersonIcon />
                          </InputAdornment>
                        }
                      />
                      {errors.FirstName && (
                        <FormHelperText error id="accountId-error">
                          {errors.FirstName}
                        </FormHelperText>)}
                    </FormControl>
                    <FormControl variant="outlined" fullWidth required>
                      <InputLabel htmlFor="outlined-adornment-name2">Last Name</InputLabel>
                      <OutlinedInput type={'text'} id="last_Name" label={'Last Name'}
                        onChange={(e) => setFormData({ ...formData, LastName: e.target.value })}
                        value={formData.LastName}
                        error={errors.LastName ? true : false}
                        endAdornment={
                          <InputAdornment position="end">
                            <PersonIcon />
                          </InputAdornment>
                        }
                      />
                      {errors.LastName && (
                        <FormHelperText error id="accountId-error">
                          {errors.LastName}
                        </FormHelperText>)}
                    </FormControl>
                  </Box>
                  <Box mt={3} sx={{ display: 'flex', gap: '1rem' }}>
                    <FormControl variant="outlined" fullWidth required>
                      <InputLabel htmlFor="outlined-adornment-email">Mobile</InputLabel>
                      <OutlinedInput type={'number'} id="Mobile" label={'Mobile'}
                        onChange={(e) => setFormData({ ...formData, Phone: e.target.value })}
                        value={formData.Phone}
                        error={errors.Phone ? true : false}
                        endAdornment={
                          <InputAdornment position="end">
                            <SmartphoneIcon />
                          </InputAdornment>
                        }
                      />
                      {errors.Phone && (
                        <FormHelperText error id="accountId-error">
                          {errors.Phone}
                        </FormHelperText>)}
                    </FormControl>
                    <FormControl variant="outlined" fullWidth required>
                      <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                      <OutlinedInput type={'email'} id="Email" label={'Email'}
                        onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                        value={formData.Email}
                        error={errors.Email ? true : false}
                        endAdornment={
                          <InputAdornment position="end">
                            <MailOutlineIcon />
                          </InputAdornment>
                        }
                      />
                      {errors.Email && (
                        <FormHelperText error id="accountId-error">
                          {errors.Email}
                        </FormHelperText>)}
                    </FormControl>
                  </Box>
                  <Box mt={3} sx={{ display: 'flex', gap: '1rem' }}>
                    {/* // date of birth */}
                    <FormControl variant="outlined" fullWidth required>
                      <InputLabel htmlFor="outlined-adornment-email">Date of Birth</InputLabel>
                      <OutlinedInput
                        id="date"
                        label="Date of Birth"
                        type="date"
                        onChange={(e) => setFormData({ ...formData, DOB: e.target.value })}
                        value={formData.DOB}
                      // defaultValue="2017-05-24"

                      />
                      {errors.DOB && (
                        <FormHelperText error id="accountId-error">
                          {errors.DOB}
                        </FormHelperText>)}
                    </FormControl>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel htmlFor="outlined-adornment-email">Referral Code</InputLabel>
                      <OutlinedInput type={'text'} id="ReferralCode"
                      onChange={(e) => setFormData({ ...formData, ReferralCode: e.target.value })}
                         label={'Referral Code'}
                        endAdornment={
                          <InputAdornment position="end">
                            <Diversity3Icon />
                          </InputAdornment>
                        }
                      />
                    </FormControl>

                  </Box>
                  <Box mt={3} sx={{ display: 'flex', gap: '1rem' }}>
                    <FormControl variant="outlined" fullWidth required>
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput type={'password'} id="Password1" label={'Password'}
                        onChange={(e) => setFormData({ ...formData, Password: e.target.value })}
                        value={formData.Password}
                        error={errors.Password ? true : false}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              edge="end"
                            >
                              <Visibility />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {errors.Password && (
                        <FormHelperText error id="accountId-error">
                          {errors.Password}
                        </FormHelperText>)}
                    </FormControl>

                    <FormControl variant="outlined" fullWidth required>
                      <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                      <OutlinedInput type={'password'} id="Password2" label={'Password'}
                        onChange={(e) => setFormData({ ...formData, CofirmPassword: e.target.value })}
                        value={formData.CofirmPassword}
                        error={errors.CofirmPassword ? true : false}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              edge="end"
                            >
                              <Visibility />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {errors.CofirmPassword && (
                        <FormHelperText error id="accountId-error">
                          {errors.CofirmPassword}
                        </FormHelperText>)}
                    </FormControl>
                  </Box>

                  {/* <Box mt={3}>
                    <FormControl variant="outlined" fullWidth required>
                      <InputLabel htmlFor="outlined-adornment-email">OTP</InputLabel>
                      <OutlinedInput type={'number'} id="OTP" label={'OTP'}
                        endAdornment={
                          <InputAdornment position="end">
                            <MailOutlineIcon />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Box>
                  <Box mt={3}>
                    <FormControl variant="outlined" fullWidth required>
                      <InputLabel htmlFor="outlined-adornment-email">Pan Card</InputLabel>
                      <OutlinedInput type={'text'} id="PanCard" label={'Pan Card'}
                        endAdornment={
                          <InputAdornment position="end">
                            <MailOutlineIcon />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Box>
                  <Box mt={3}>
                    <FormControl variant="outlined" fullWidth required>
                      <InputLabel htmlFor="outlined-adornment-email">Aadhar Card</InputLabel>
                      <OutlinedInput type={'text'} id="AadharCard" label={'Aadhar Card'}
                        endAdornment={
                          <InputAdornment position="end">
                            <MailOutlineIcon />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Box>
                  <Box mt={3}>
                    <FormControl variant="outlined" fullWidth required>
                      <InputLabel htmlFor="outlined-adornment-email">Bank Name</InputLabel>
                      <OutlinedInput type={'text'} id="BankName" label={'Bank Name'}
                        endAdornment={
                          <InputAdornment position="end">
                            <MailOutlineIcon />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Box> */}
                  <Box mt={3} textAlign={'end'}>
                  Already have an account? <Link href="/" underline="none">login</Link>
                  </Box>
                  <Box mt={3}>
                    <Button variant="contained" type="submit" color={'success'} fullWidth size={'large'}> Sign up </Button>
                  </Box>
                </Box>

              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  )
}

export default Register