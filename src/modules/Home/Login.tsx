import React, { useState } from 'react'
import { Alert, AlertTitle, Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material'
import Logo from '@components/Logo';
// import EWallet from '@assets/images/e-wallet.png';
// import CardCoins from '@assets/images/cards.png';
import IllustrationDashboard from '@assets/images/illustration_dashboard.png';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <Box py={5} px={15}>
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
                <Typography variant="body1" mt={2}>  New user?  <Link href="#" underline="none">Create an account.</Link> </Typography>
              </Box>
              <Box mt={4} >
                <Alert severity="info">
                  <AlertTitle>Use the below demo details to login</AlertTitle>
                  <Typography variant="body1" > Email : <strong>user@example.com</strong> </Typography>
                  <Typography variant="body1" > Password : <strong>Test@123</strong> </Typography>
                </Alert>
              </Box>
              <Box mt={4}>
                {/* create email , password, forgot password and login button */}
                <Box component="form" noValidate autoComplete="off"  >
                  <Box>
                    <FormControl variant="outlined" fullWidth required>
                      <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                      <OutlinedInput type={'email'} id="Email" label={'Email'}
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
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput type={showPassword ? 'text' : 'password'} id="Password" label={'Password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Box>
                  <Box mt={3} textAlign={'end'}>
                    <Link href="#" underline="none">Forgot password?</Link>
                  </Box>
                  <Box mt={3}>
                    <Button variant="contained" color={'success'} fullWidth size={'large'}> Login </Button>
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

export default Login