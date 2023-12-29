import React, { FC } from 'react'
import LogoImage from "@assets/images/logo.png";
import styled from 'styled-components';
import { Typography } from '@mui/material';

const StyledLogo = styled('span')`
      cursor: pointer;
`


type LogoProps = {
   height?: number | string,
   redirectTo?: () => unknown,
};

const Logo = (props: LogoProps) => {
   const { height = 50, redirectTo } = props;

   return (
      <StyledLogo onClick={redirectTo} >
         {/* <img src={LogoImage} alt="VW-LOGO" height={height} /> */}
         <Typography variant="h4"> Logo</Typography>

      </StyledLogo>
   )
}


export default Logo