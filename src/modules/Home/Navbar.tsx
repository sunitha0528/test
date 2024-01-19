import React from 'react';
import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import Logo from '@components/Logo';
import MenuIcon from '@mui/icons-material/Menu';


const drawerWidth = 240;
const navItems = ['Home', 'About Us', 'Service', 'Contact Us', 'Login'];

type NavProps = {
   window?: () => Window;
}

const Navbar = (props: NavProps) => {
   const { window } = props;
   const [mobileOpen, setMobileOpen] = React.useState(false);

   const handleDrawerToggle = () => {
      setMobileOpen((prevState) => !prevState);
   };


   const container = window !== undefined ? () => window().document.body : undefined;

   return (
      <Box>
         <AppBar component="nav" position="fixed" color={'inherit'} className={'shadow-sm '}>
            <Toolbar className='container'>
               <Logo redirectTo={() => { }} />
               <Box width={'100%'} display={'flex'} justifyContent={'end'}>
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                     {navItems.map((item) => (
                        <Button color="inherit" key={item} className={'px-3'}> {item}  </Button>
                     ))}
                  </Box>
                  <IconButton
                     color="inherit"
                     aria-label="open drawer"
                     edge="start"
                     onClick={handleDrawerToggle}
                     sx={{ mr: 2, display: { sm: 'none' } }}
                  >
                     <MenuIcon />
                  </IconButton>
               </Box>

            </Toolbar>
         </AppBar>

         <nav>
            <Drawer container={container} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle}
               ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
               }}
               sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
               }}
            >
               <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
                  <Logo redirectTo={() => { }} />
                  <Divider />
                  <List>
                     {navItems.map((item) => (
                        <ListItem key={item} disablePadding>
                           <ListItemButton sx={{ textAlign: 'center' }}>
                              <ListItemText primary={item} />
                           </ListItemButton>
                        </ListItem>
                     ))}
                  </List>
               </Box>
            </Drawer>
         </nav>
      </Box>
   )

}



export default Navbar;



