import React, { useState } from 'react';
import { Box, Toolbar, IconButton, AppBar, Avatar, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '/assets/logoB.svg';

const Navbar = ({ drawerWidth, onMenuClick }) => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleAvatarClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <AppBar position="fixed"
            sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, 
            boxShadow: 'none', borderBottom: 'none' }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: 'background.default' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        color="primary"
                        aria-label="open drawer"
                        onClick={onMenuClick}
                        edge="start"
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src={logo} alt="Logo" style={{ height: '32px' }} />
                </Box>
                <Box>
                    <IconButton onClick={handleAvatarClick} size="small">
                        <Avatar />
                    </IconButton>
                    <Menu anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <MenuItem
                            onClick={() => {
                              handleMenuClose();
                              handleLogout();
                            }}
                        >
                            <LogoutIcon sx={{ mr: 1 }} fontSize="small" color="primary" />
                            Cerrar Sesión
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>

        </AppBar>
    )
}

export default Navbar