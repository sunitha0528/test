import React from 'react'
import { Box, MenuItem, Menu, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

// import { useAppContext } from 'src/context/AppContext';
// import { useAuthContext } from 'src/context/AuthContext';

const profileBox = {
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   cursor: 'pointer',
   fontWeight: 600,
}


type ProfilePropTypes = {
   username: string,
   designation?: string,
   imageUrl?: string,
   showMenu?: boolean,
   width?: number,
   height?: number,
   radius?: number,
   fontSize?: number,
   backgroundColor?: string,
   textColor?: string,
   showProfileName?: boolean,
}

const Profile = (props: ProfilePropTypes) => {
   const { username, designation, imageUrl = '', showMenu = true, width = 45, height = 45, radius = 50,
      fontSize = 18, backgroundColor = '#fff', textColor = '#000', showProfileName = true } = props;

   // const { logout } = useAuthContext();

   const navigate = useNavigate();
   const theme = useTheme();

   const [anchorEl, setAnchorEl] = React.useState(null);

   const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const onLogout = () => {
      setAnchorEl(null);
      // logout();
      localStorage.clear();
      navigate('/login');
   };

   const prepareUserName = (uname = '') => {
      let nameLetters = '';
      let names = uname.split(" ").slice(0, 2);
      names.forEach(name => {
         nameLetters += name.slice(0, 1);
      })
      return nameLetters
   }

   const myprofile = () => {
      setAnchorEl(null);
      navigate('/dashboard/myprofile');
   }


   return (
      <div>
         <Box mx={'auto'} width={width} height={height} borderRadius={radius} fontSize={fontSize}
            bgcolor={backgroundColor} color={textColor} onClick={showMenu ? handleClick : () => { }}
            sx={profileBox} >
            {imageUrl ? (
               <img src={imageUrl} alt={'Invalid profile url'} width={'100%'} height={'100%'} />
            ) : (
               prepareUserName(username)
            )
            }
         </Box>

         {showProfileName &&
            <Box p={2} textAlign={'center'}>
               <Typography variant="h6" sx={{ whiteSpace: 'pre-wrap' }}> {username} </Typography>
               <Typography variant="body1" color={theme.palette.primary.light} > {designation} </Typography>
            </Box>
         }

         <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
         >
            <MenuItem divider>{username}</MenuItem>
            <MenuItem onClick={myprofile}><PersonIcon fontSize="small" />&nbsp; My Profile</MenuItem>
            <MenuItem onClick={onLogout}><Logout fontSize="small" />&nbsp; Logout</MenuItem>
         </Menu>
      </div>
   )
}




export default Profile






