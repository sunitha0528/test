import React, { useState } from 'react'
import { Box, Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { Drawer, DrawerHeader } from '@components/Dashboard';
// import { useAuthContext } from 'src/context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '@components/Logo';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';

// import CrmProfile from 'src/components/Profie';

// //Icons
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import BadgeIcon from '@mui/icons-material/Badge';
import CampaignIcon from '@mui/icons-material/Campaign';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';


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
    title: 'Bbps',
    path: '/dashboard/bbps',
    icon: <PeopleIcon />,
    children: [
      {
        title: 'Recharge',
        path: '/dashboard/bbps/recharge',
        icon: <CampaignIcon />,
      },
      {
        title: 'Gas Bill',
        path: '/dashboard/bbps/gas',
        icon: <CampaignIcon />,
      },
      {
        title: 'Lic',
        path: '/dashboard/bbps/lic',
        icon: <CampaignIcon />,
      },
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
]


type SidenavPropTypes = {
  expandSidebar: boolean,
  setExpandSidebar: (value: boolean) => void
}

const Sidenav = (props: SidenavPropTypes) => {
  const { expandSidebar, setExpandSidebar = () => { } } = props;
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
    let newRoots = roots.map(r => {
      if (r.path === root.path) {
        r.expand = !r.expand;
      } else {
        r.expand = false;
      }
      return r;
    })
    setRoots(newRoots);
  }



  return (
    <Drawer variant="permanent" open={expandSidebar} className={'smallscrollbar'}>
      <DrawerHeader >
        <Logo redirectTo={() => { }} />
      </DrawerHeader>
      <Divider />


      <List style={{ paddingInline: 8 }}>

        {roots && roots.map((root, index) => (
          <>
            <ListItem key={index} disablePadding sx={(root.path === location.pathname) ? isSelected(theme) : {}}
              onClick={() => { onSelectRoot(root) }} className={root.expand ? 'bg-light' : ''} >
              <ListItemButton sx={listItemButtonStyle(expandSidebar)} >
                <ListItemIcon sx={listItemButtonIconsStyle(expandSidebar)} >
                  <Tooltip title={root.title} placement={'right-end'}>{root.icon}</Tooltip>
                </ListItemIcon>
                <ListItemText primary={root.title} sx={{ opacity: expandSidebar ? 1 : 0 }} />
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
                    root.children.map((child, rcindex) => (
                      <ListItem key={rcindex} disablePadding sx={(child.path === location.pathname) ? isSelected(theme) : {}}
                        onClick={() => { navigate(child.path) }} >
                        <ListItemButton sx={rclistItemButtonStyle(expandSidebar)} >
                          <ListItemIcon sx={listItemButtonIconsStyle(expandSidebar)} >
                            <Tooltip title={child.title} placement={'right-end'}>{child.icon}</Tooltip>
                          </ListItemIcon>
                          <ListItemText primary={child.title} sx={{ opacity: expandSidebar ? 1 : 0 }} />
                        </ListItemButton>
                      </ListItem>
                    ))
                  }
                </List>
              </Collapse>
            }
          </>
        ))
        }


      </List>

    </Drawer>
  )
}



export default Sidenav;


