import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import DashboardContent from '../components/DashboardContent';

const drawerWidth = 240;

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar drawerWidth={drawerWidth} onMenuClick={handleDrawerToggle} />
      <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', width: { sm: `calc(100% - ${drawerWidth}px)`}, }}
      >
        <Toolbar />
        <DashboardContent />
      </Box>
    </Box>
  )
}

export default Dashboard