import styled from 'styled-components'
import CardCoins from '@assets/images/cards.png'
import { Box, Grid } from '@mui/material'

let StyledUtilCard = styled(Box)`
      width: 170px;
      height: 170px;
      background-color: #fff;   
      border-radius: 50%;
      border: 15px solid #fff;
      box-shadow: inset 0 0 30px rgba(0,0,0,0.1), 0 20px 30px rgba(0,0,0,0.2), 0 0 0 rgba(255,255,255, 1);
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s;

      .util-icon {
         width: 60px;
         transition: all 0.3s;
      }

      &:hover {
         box-shadow: inset 0 0 30px rgba(0,0,0,0.1), 0 20px 30px rgb(1 91 184 / 52%), 0 0 0 rgba(255,255,255, 1);
         transform: translateY(-3px);

         .util-icon{
            width: 75px;
         }
      }
`


const Utilities = () => {


   return (
      <Box p={3}>
         <Grid container rowSpacing={7} columnSpacing={2}>

            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) =>
               <Grid key={item+index} item xs={12} sm={6} md={4} lg={3} >
                  <StyledUtilCard m={'auto'}>
                     <img className='util-icon' src={CardCoins} alt="CardCoins" />
                  </StyledUtilCard>
                  <Box textAlign={'center'} mt={4} fontWeight={'bold'}>Util Title </Box>
               </Grid>
            )}

         </Grid>
      </Box>
   )
}

export default Utilities