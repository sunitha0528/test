import { useState, useEffect, useLayoutEffect } from 'react';
import { Box } from '@mui/material';
import Topbar from './Topbar';
import Sidenav from './Sidenav';
import { DrawerHeader } from '@components/Dashboard';
import { Outlet } from 'react-router-dom';
// import useUserHook from '@hooks/useUserHook';



const Dashboard = () => {
  const [expandSidebar, setExpandSidebar] = useState(window.innerWidth > 1025 ? true : false);
  // const { getToken } = useUserHook();
  // const navigate = useNavigate();

  useLayoutEffect(() => {
    window.addEventListener('resize', () => {
      setExpandSidebar(window.innerWidth > 1025 ? true : false);
    });
  }, [])

  useEffect(() => {
    // const token = getToken();
    // if(!token)
    // {
    //   navigate('/')
    // }
  }, [])



  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f1f3f4' }}>
      <Topbar expandSidebar={expandSidebar} setExpandSidebar={setExpandSidebar} />
      <Sidenav expandSidebar={expandSidebar} setExpandSidebar={setExpandSidebar} />
      <Box component="main" sx={{ p: 2, transition: '0.4s', width: `calc(100vw - ${expandSidebar ? '280px' : '80px'})` }}>
        <DrawerHeader />
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}


export default Dashboard;