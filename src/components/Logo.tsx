import styled from 'styled-components';

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
         <img src={'https://aashyatech.com/wp-content/uploads/2022/09/3-e1704450644266.png'} alt="VW-LOGO" height={height} />
         {/* <Typography variant="h4"> Logo</Typography> */}

      </StyledLogo>
   )
}


export default Logo