import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemButton, ListItemText, Toolbar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';

const Sidebar = ({ drawerWidth, mobileOpen, onDrawerToggle }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const drawer = (
        <Box sx={{ bgcolor: 'background.default', height: '100%' }}>
            <Toolbar />
            <IconButton onClick={onDrawerToggle}
                sx={{ position: 'absolute', top: 8, right: 8, display: { xs: 'block', sm: 'none' }, }}
                aria-label="close drawer"
            >
                <CloseIcon color="primary" />
            </IconButton>
            <List >
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <DashboardIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Cerrar Sesión" />
                    </ListItemButton>
                </ListItem>
            </List>

        </Box>
    );

    return (
        <Box component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="sidebar"
        >
            <Drawer variant="temporary"
                open={mobileOpen}
                onClose={onDrawerToggle}
                ModelProps={{ keepMounted: true }}
                sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', borderTop: 'none',
                    borderRight: '1px solid', borderColor: 'divider'
                 } }}
            >
                {drawer}
            </Drawer>
            <Drawer variant="permanent" 
                sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', borderTop: 'none' } }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    )
}

export default Sidebar