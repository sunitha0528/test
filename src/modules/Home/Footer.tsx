import { Box, Grid, Link, Typography } from '@mui/material'
import Logo from '@components/Logo'

const Footer = () => {
   return (
      <div>
         <Box className={'container'} py={8}>
            <Grid container spacing={1}>
               <Grid item xs={12} lg={4}>
                  <Box>
                     <Logo />

                     <Typography variant='body1' lineHeight={1.5} mt={3}>
                        We are a Technology Based Integrated Bill Payment Solution Provider As the Name suggests "AASHYA TECH SOLUTIONS PRIVATE LIMITED" we intend to make our services as quick as drawing . All our services are fully independent of Office/Banking hours, thus you can get Any Time, Any Thing, Any Where.
                     </Typography>
                  </Box>
               </Grid>
               <Grid item xs={12} lg={4}>
                  <Box pl={5}>
                     <Typography variant='h6' color={'success.main'} >  Useful Links  </Typography>
                     <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} lineHeight={2} width={'fit-content'}>
                     <Link href="/about" underline="none">About Us</Link>
                    <Link href="/Contact-us" underline="none">Contact Us</Link>
                    <Link href="/Privacy-policy" underline="none">Privacy Policy</Link>
                    <Link href="/Terms-conditions" underline="none">Terms & Conditions</Link>
                    <Link href="/Refund-cancellation" underline="none">Cancellation & Refund Policy</Link>
                        {/* <Link href="#" underline="hover">Cookie</Link>
                        <Link href="#" underline="hover">Grievance</Link>
                        <Link href="#" underline="hover">Privacy</Link>
                        <Link href="#" underline="hover">Refund</Link>
                        <Link href="#" underline="hover">Legal Discalimer</Link>
                        <Link href="#" underline="hover">Terms & Conditions</Link> */}
                     </Box>
                  </Box>
               </Grid>
               <Grid item xs={12} lg={4}>
                  <Box>
                     <Typography variant='h6' color={'success.main'} >  Contact Us  </Typography>
                     <Typography variant='body1' mt={2}>
                        AASHYA TECH SOLUTIONS PRIVATE LIMITED, <br />
                        9-4-86/231, Salar Jung Colony, Toli Chowki, Hyderabad, Telangana 500008
                     </Typography>
                     <Typography variant='body2' mt={1}>
                        <b>Phone: </b>+91 6303596420
                     </Typography>
                     <Typography variant='body2' mt={1}>
                        <b> Email:</b> contact@aashyatech.com
                     </Typography>
                  </Box>
               </Grid>
            </Grid>
         </Box>
         <Box p={3} bgcolor={'#fffef5'}  >
            <Box className={'container'} >
               <Typography variant='subtitle1'>Copyright © 2024 AASHYA TECH SOLUTIONS PRIVATE LIMITED</Typography>
            </Box>
         </Box>
      </div>
   )
}

export default Footer