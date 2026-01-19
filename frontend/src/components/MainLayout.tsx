import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ComputerIcon from '@mui/icons-material/Computer';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';

const drawerWidth = 260;

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Urządzenia', icon: <ComputerIcon />, path: '/devices' },
    { text: 'Pracownicy', icon: <PeopleIcon />, path: '/employees' },
    { text: 'Działy', icon: <BusinessIcon />, path: '/departments' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>

      {/* SIDEBAR */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#0f141a',
            color: 'white',
            borderRight: '1px solid #1f2937'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
             📊 AssetManager
          </Typography>
        </Toolbar>
        
        <List sx={{ px: 2 }}>
           {menuItems.map((item) => {
             const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
             
             return (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton 
                  onClick={() => navigate(item.path)}
                  sx={{ 
                    borderRadius: 2, 
                    bgcolor: isActive ? 'primary.main' : 'transparent',
                    '&:hover': { bgcolor: isActive ? 'primary.dark' : 'rgba(255,255,255,0.05)' }
                  }}
                >
                  <ListItemIcon sx={{ color: isActive ? 'white' : 'text.secondary', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />
                </ListItemButton>
              </ListItem>
             );
           })}
        </List>
      </Drawer>

      {/* TREŚĆ */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, minHeight: '100vh', color: 'text.primary' }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}