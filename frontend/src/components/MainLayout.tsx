import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // <--- NOWE IMPORTY
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, AppBar, Typography, Avatar, InputBase, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ComputerIcon from '@mui/icons-material/Computer';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';

const drawerWidth = 260;

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const navigate = useNavigate(); // Funkcja do zmiany strony
  const location = useLocation(); // Informacja o aktualnym adresie

  // Menu z definicją ścieżek URL
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Urządzenia', icon: <ComputerIcon />, path: '/devices' },
    { text: 'Pracownicy', icon: <PeopleIcon />, path: '/employees' },
    { text: 'Działy', icon: <BusinessIcon />, path: '/departments' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      
      {/* NAVBAR */}
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: 'background.default', boxShadow: 'none', borderBottom: '1px solid #1f2937' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#151b23', borderRadius: 2, px: 2, py: 0.5, width: 300 }}>
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <InputBase placeholder="Szukaj..." sx={{ color: 'white', width: '100%' }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit"><NotificationsIcon /></IconButton>
            <Avatar sx={{ bgcolor: 'primary.main' }}>A</Avatar>
          </Box>
        </Toolbar>
      </AppBar>

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
             // Sprawdzamy, czy ten przycisk powinien być aktywny (niebieski)
             const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
             
             return (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton 
                  onClick={() => navigate(item.path)} // <--- KLIKNIĘCIE ZMIENIA STRONĘ
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