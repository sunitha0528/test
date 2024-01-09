import React, { useState } from 'react'
import { Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { Drawer, DrawerHeader } from '@components/Dashboard';
// import { useAuthContext } from 'src/context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '@components/Logo';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

// import CrmProfile from 'src/components/Profie';

// //Icons
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import CampaignIcon from '@mui/icons-material/Campaign';


const listItemButtonStyle = (expandSidebar: boolean) => {
  return {
    minHeight: 48,
    justifyContent: expandSidebar ? 'initial' : 'center',
    px: 2.5,
    borderRadius: 1
  }
}

const listItemButtonIconsStyle = (expandSidebar: boolean) => {
  return {
    minWidth: 0,
    mr: expandSidebar ? 3 : 'auto',
    justifyContent: 'center',
  }
}

const rclistItemButtonStyle = (expandSidebar: boolean) => {
  return {
    minHeight: 48,
    justifyContent: expandSidebar ? 'initial' : 'center',
    px: 2.5,
    pl: 5,
    borderRadius: 1
  }
}

const isSelected = (theme: any) => {
  return {
    // border: `1px solid ${theme.palette.primary.main}`,
    borderLeft: `3px solid ${theme.palette.primary.main}`,
    boxShadow: `0px 0px 1px ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    borderRadius: 1
  }
}

type SideNavItemsTypes = {
  title: string,
  path: string,
  icon: React.ReactNode,
  children?: SideNavItemsTypes[],
  expand?: boolean
}

const sideNavItems: SideNavItemsTypes[] = [
  {
    title: 'Dashboard',
    path: '/dashboard/overview',
    icon: <BarChartIcon />,
    children: [],
    expand: false
  },
  {
    title: 'BBPS',
    path: '/dashboard/bbps',
    icon: <PeopleIcon />,
    children: [
      {
        title: 'Recharge',
        path: '/dashboard/bbps/recharge',
        icon: <CampaignIcon />,
      },
      {
        title: 'DTH',
        path: '/dashboard/bbps/DTH',
        icon: <CampaignIcon />,
      },
      {
        title: 'Bill Payments',
        path: '/dashboard/bbps/BillPayments',
        icon: <CampaignIcon />,
      },
      // {
      //   title: 'LIC Bill',
      //   path: '/dashboard/bbps/lic',
      //   icon: <CampaignIcon />,
      // },
    ],
    expand: false
  },
  {
    title: 'Products',
    path: '/dashboard/products',
    icon: <PeopleIcon />,
    children: [
      {
        title: 'Products - 1',
        path: '/dashboard/products/1',
        icon: <CampaignIcon />,
      },
      {
        title: 'Products - 2',
        path: '/dashboard/products/2',
        icon: <CampaignIcon />,
      },
      {
        title: 'Products - 3',
        path: '/dashboard/products/3',
        icon: <CampaignIcon />,
      },
    ],
    expand: false
  },
  {
    title: 'Payouts',
    path: '/dashboard/payouts',
    icon: <AccountBalanceIcon />,
  }
]


type SidenavPropTypes = {
  expandSidebar: boolean,
  setExpandSidebar: (value: boolean) => void
}

const Sidenav = (props: SidenavPropTypes) => {
  // const { expandSidebar } = props;
  // const { authState: { employee } } = useAuthContext();

  const [roots, setRoots] = useState<SideNavItemsTypes[]>(sideNavItems)

  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  // const getRootIcons = (path = '') => {
  //   let icon = null;
  //   switch (path) {
  //     case '/dashboard/analytics': icon = <BarChartIcon />; break;
  //     case '/dashboard/clients': icon = <PeopleIcon />; break;
  //     case '/dashboard/bdmclients': icon = <PeopleIcon />; break;
  //     case '/dashboard/campaigns': icon = <CampaignIcon />; break;
  //     case '/dashboard/create-template': icon = <CampaignIcon />; break;
  //     case '/dashboard/campaigns/create': icon = <CampaignIcon />; break;
  //     case '/dashboard/employees': icon = <BadgeIcon />; break;
  //     default: icon = <FeaturedPlayListIcon />; break;
  //   }
  //   return icon;
  // }

  const onSelectRoot = (root: SideNavItemsTypes) => {
   
    console.log('root', root);
    let newRoots = roots.map(r => {
      if (r.path === root.path) {
        r.expand = !r.expand;
      } else {
        r.expand = false;
      }
      return r;
    })
    setRoots(newRoots);
    if(!root.children){
      navigate(root.path);
    }
  }



  return (
    <Drawer variant="permanent" open={props.expandSidebar} className={'smallscrollbar'}>
      <DrawerHeader >
        <Logo redirectTo={() => { }} />
      </DrawerHeader>
      <Divider />


      <List style={{ paddingInline: 8 }}>

        {roots && roots.map((root:any, index:number) => (
          <div key={index} >
            <ListItem key={index} disablePadding sx={(root.path === location.pathname) ? isSelected(theme) : {}}
              onClick={() => { onSelectRoot(root) }} className={root.expand ? 'bg-light' : ''} >
              <ListItemButton sx={listItemButtonStyle(props.expandSidebar)} >
                <ListItemIcon sx={listItemButtonIconsStyle(props.expandSidebar)} >
                  <Tooltip title={root.title} placement={'right-end'}>{root.icon}</Tooltip>
                </ListItemIcon>
                <ListItemText primary={root.title} sx={{ opacity: props.expandSidebar ? 1 : 0 }} />
                {(root.children && root.children.length > 0) &&
                  <>
                    {root.expand ? <ExpandLess /> : <ExpandMore />}
                  </>
                }
              </ListItemButton>
            </ListItem>
            {root.children && root.children.length > 0 &&
              <Collapse in={root.expand} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {
                    root.children.map((child:any, rcindex:number) => (
                      <ListItem key={rcindex} disablePadding sx={(child.path === location.pathname) ? isSelected(theme) : {}}
                        onClick={() => { navigate(child.path) }} >
                        <ListItemButton sx={rclistItemButtonStyle(props.expandSidebar)} >
                          <ListItemIcon sx={listItemButtonIconsStyle(props.expandSidebar)} >
                            <Tooltip title={child.title} placement={'right-end'}>{child.icon}</Tooltip>
                          </ListItemIcon>
                          <ListItemText primary={child.title} sx={{ opacity: props.expandSidebar ? 1 : 0 }} />
                        </ListItemButton>
                      </ListItem>
                    ))
                  }
                </List>
              </Collapse>
            }
          </div>
        ))
        }


      </List>

    </Drawer>
  )
}



export default Sidenav;


