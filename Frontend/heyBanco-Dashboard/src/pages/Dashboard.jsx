import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, CssBaseline, Dialog, Toolbar, Typography } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import DashboardContent from '../components/DashboardContent';
import axios from '../api/axios';

const COMERCIOS_URL = '/Comercio';
const GIROS_URL = '/GiroCommercio';
const TRANSACTION_URL = '/Transaction';
const USER_URL = '/User';
const FILTER_URL = '/Filter';

const drawerWidth = 240;

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [comercios, setComercios] = useState(null);
  const [giros, setGiros] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [users, setUsers] = useState(null);
  const [filters, setFilters] = useState(() => {
    const saved = localStorage.getItem('filters');
    return saved
      ? JSON.parse(saved)
      : { ciudad: 0, gender: { Men:true, Female:true, Undefined:true }, Tperson:{ ActividadE:true, SinActividadE:true }, ActividadEmpresarial: '' };
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComercio = async () => {
      try {
        setLoading(true);
        const response = await axios.get(COMERCIOS_URL);
        setComercios(response.data);
      } catch (error) {
        console.error('Error fetching comercios:', error.message);
      } finally {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      }
    }
    const fetchGiros = async () => {
      try {
        const response = await axios.get(GIROS_URL);
        setGiros(response.data);
      } catch (error) {
        console.error('Error fetching giros:', error.message);
      } finally {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      }
    }
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(TRANSACTION_URL);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error.message);
      } finally {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        console.log('Aplicando filtros:', filters);
      }
    }
    fetchTransactions();
    fetchComercio();
    fetchGiros();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const applyFilters = async (newFilters) => {
    setFilters(newFilters);
    localStorage.setItem('filters', JSON.stringify(newFilters));
    try {
      const resp = await axios.post(FILTER_URL, newFilters);
      setComercios(resp.data.comercios);
      setGiros(resp.data.giros);
      setTransactions(resp.data.transactions);
    } catch (err) {
      console.error('Error al aplicar filtros:', err);
    }
    // forzar recarga de la página
    window.location.reload();
  };

  if (loading) {
    return (
        <Dialog open={true} PaperProps={{ sx: { textAlign: 'center', padding: 4 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress sx={{ color: 'primary' }} />
            </Box>
            <Typography variant="h6" sx={{ mt: 2 }}>
                Cargando Información...
            </Typography>
        </Dialog>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar drawerWidth={drawerWidth} onMenuClick={handleDrawerToggle} />
      <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', width: { sm: `calc(100% - ${drawerWidth}px)`} }}
      >
        <Toolbar />
        <DashboardContent
          comerciosData={comercios}
          girosData={giros}
          tipoVentaData={transactions}
          filters={filters}
          onApplyFilters={applyFilters}
        />
      </Box>
    </Box>
  )
}

export default Dashboard