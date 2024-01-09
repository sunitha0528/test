import { Box, IconButton, Toolbar } from '@mui/material';
import { AppBar } from '@components/Dashboard';
import Profile from '@components/Profile';
import Logo from '@components/Logo';
// import { useAuthContext } from 'src/context/AuthContext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


type TopbarPropTypes = {
    expandSidebar: boolean,
    setExpandSidebar: (value: boolean) => void
}

const Topbar = (props: TopbarPropTypes) => {
    const { expandSidebar, setExpandSidebar } = props;
    // const { authState: { employee } } = useAuthContext();


    return (
        <AppBar position="fixed" open={expandSidebar} color={'inherit'} className={'shadow-sm '}>
            <Toolbar>
                <IconButton size="small" aria-label="open drawer" edge="start" color={'default'}
                    onClick={() => { setExpandSidebar(!expandSidebar) }} sx={{ marginRight: 2 }} >
                    {expandSidebar ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                {expandSidebar ? '' : <Logo redirectTo={() => { }} />}
                <Box width={'100%'} display={'flex'} justifyContent={'end'}>
                    <Profile username={"User Name"} showMenu={true} imageUrl={''} backgroundColor={'#f1f3f4'} showProfileName={false} />
                </Box>
            </Toolbar>
        </AppBar>
    )
}



export default Topbar;



