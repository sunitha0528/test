import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
// import React from 'react'
import Navbar from './Navbar'
import CardCoins from '@assets/images/cards.png';
import styled from 'styled-components';
import Footer from './Footer';


let StyledServiceCard = styled(Card)`
         display: flex;
         min-height: 135px;
         transition: all 0.3s ease !important;
        
         &:hover{
            transform: translateY(-2px);
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

            .card-title{
                  color: green;
            }
         }

         .MuiCardActionArea-root{
            display: flex;

            .MuiCardMedia-img{
               height: 80px;
               width: 80px !important;
            }
         }
`



const servicesList = [
   {
      title: 'Mobile Recharge',
      description: 'The most reliable and secure mobile recharge platform available on internet.',
      icon: ''
   },
   {
      title: 'Utility Bills',
      description: 'AASHYA TECH SOLUTIONS PRIVATE LIMITED offers its customers to pay their bills with just a click.',
      icon: ''
   },
   {
      title: 'Electricity',
      description: 'Power up your world with our easy online electricity bill payment system. Light up your life with convenience.',
      icon: ''
   },
   {
      title: 'DTH Recharge',
      description: 'If you are searching for a reliable platform to recharge your DTH online then AASHYA TECH SOLUTIONS PRIVATE LIMITED.',
      icon: ''
   },
   {
      title: 'Gas',
      description: 'Simplify your gas bill payments online, so you can enjoy a warm and worry-free home.',
      icon: ''
   },
   {
      title: 'Water Bill',
      description: 'Keep the water flowing smoothly in your life - easily pay water bills through our user-friendly platform.',
      icon: ''
   },
]



const Landing = () => {

   // const theme = useTheme();

   return (
      <Box>
         <Navbar />
         <Box component="main" pt={{ md: 8, xs: 7 }}>
            <Box bgcolor={'#f5f5f5'} >
               <Box className={'container'}>
                  <Grid container >
                     <Grid item xs={12} md={6}>
                        <Box height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                           <Box py={3}>
                              <Typography sx={{ typography: { md: 'h3', xs: 'h4' } }} className='lh-base' color={'success.main'} >
                                 AASHYA TECH SOLUTIONS PRIVATE LIMITED
                              </Typography>
                              <Typography variant='h6' color={'text.secondary'}>
                                 offers UnLimited Utility Services
                              </Typography>
                           </Box>
                        </Box>
                     </Grid>
                     <Grid item xs={12} md={6} >
                        <Box minHeight={520} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                           <img src={CardCoins} alt="wallet" className={'img-fluid'}
                              style={{
                                 filter: 'drop-shadow(4px 10px 8px #acacac)'
                              }} />
                        </Box>
                     </Grid>
                  </Grid>
               </Box>
            </Box>


            <Box className={'container'} py={2}>
               <Grid container >
                  <Grid item xs={12} md={5} >
                     <Box minHeight={520} display={'flex'} alignItems={'center'} justifyContent={'flex-start'}>
                        <img src={CardCoins} alt="wallet" className={'img-fluid'} />
                     </Box>
                  </Grid>
                  <Grid item xs={12} md={7}>
                     <Box height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Box>
                           <Typography variant='h5' color={'success.main'} lineHeight={2}>
                              AASHYA TECH SOLUTIONS PRIVATE LIMITED
                           </Typography>
                           <Typography variant='body1' lineHeight={2} mt={2}>
                              Strong Capabilities and Competendes to deliver Customer Experience Excellence by providing Frictionless Services to our Esteemed Clients.
                           </Typography>
                           <Typography variant='body1' lineHeight={2} mt={2}>
                              We are a Technology Based Integrated Bill Payment Solution Provider As the Name suggests "AASHYA TECH SOLUTIONS PRIVATE LIMITED" we intend to make our services as quick as drawing AASHYA TECH SOLUTIONS PRIVATE LIMITED. All our services are fully independent of Office/Banking hours, thus you can get Any Time, Any Thing, Any Where.
                           </Typography>
                           <Typography variant='body1' lineHeight={1.5} mt={1}>
                              For your convenience, our GST Number is <strong> 36AAZCA2948M1ZS.</strong>
                           </Typography>
                        </Box>
                     </Box>
                  </Grid>
               </Grid>
            </Box>


            <Box bgcolor={'#fffef5'} py={6}>
               <Box className={'container'}>
                  <Box textAlign={'center'}>
                     <Typography variant='h4' color={'success.main'}> SERVICES </Typography>
                     <Typography variant='body1' lineHeight={1.7} mt={3}>
                        Streamline your life and take control of your monthly expenses with our all-in-one utility bill payment service. Our user-friendly platform allows you to pay your electricity, water, gas, and other bills effortlessly, all in one place. Say goodbye to the inconvenience of paper bills and late payments, as we offer secure and convenient online payment options, backed by 24/7 customer support. With us, you can track your usage and receive instant confirmations, ensuring that you can focus on what truly matters while we handle your utility bills efficiently and securely.
                     </Typography>
                  </Box>
                  <Box py={7}>
                     <Grid container spacing={5}>
                        {servicesList.map((service: any, index: number) =>
                           <Grid item xs={12} lg={4} md={6} key={index}>
                              <StyledServiceCard >
                                 <CardActionArea>
                                    <CardMedia component="img" image={CardCoins} alt="Contennt" />
                                    <CardContent>
                                       <Typography gutterBottom variant="h6" className='card-title'>
                                          {service.title}
                                       </Typography>
                                       <Typography variant="body2" color="text.secondary">
                                          {service.description}
                                       </Typography>
                                    </CardContent>
                                 </CardActionArea>
                              </StyledServiceCard>
                           </Grid>
                        )}
                     </Grid>
                  </Box>
               </Box>
            </Box>
         </Box>
         <Footer />
      </Box>
   )
}

export default Landing

