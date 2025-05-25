import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import FiltersBar from './FiltersBar';
import KpiCard from './KpiCard';
import ActivityChart from './ActivityChart';
import ClientsTable from './ClientsTable';
import {
    TipoVentaChart,
    GirosDoughnutChart,
    ComerciosPieChart,
  } from './TipoVenta';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import PercentIcon from '@mui/icons-material/Percent';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { kpiData, activityData, clientsData, tipoVentaData, girosData, comerciosData } from './constants/index.js';

const DashboardContent = () => {
    // State para filtros
    const [filters, setFilters] = useState({
        idEstado: null,
        genero: [],
        tipoPersona: [],
        actividad: null,
    });

    // Handler para aplicar filtros desde FiltersBar
    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
        // Aquí podrías disparar fetch de datos con los filtros aplicados
        console.log('Aplicando filtros:', newFilters);
    };

    // Asignar valores de KPI según lógica y filtros
    const { gastoRecurrente, clientesRecurrentes, precisionModelo, promedioGasto } = kpiData;

    // Determinar colorKey para precisión del modelo
    const precisionPercent = parseFloat(precisionModelo.replace('%', '')) || 0;
    let precisionColor = 'error';
    if (precisionPercent >= 80) precisionColor = 'success';
    else if (precisionPercent >= 60) precisionColor = 'warning';

  return (
    <Box sx={{ p: 3, bgcolor: 'background.default' }}>	
      {/* Fila 1: Barra de filtros */}
      <FiltersBar onApply={handleApplyFilters} />

      {/* Fila 2: KPIs */}
      <Grid
        container
        spacing={2}
        mb={3}
        justifyContent="center"
        alignItems="stretch"
      >
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              width: '100%',
              maxWidth: {
                xs: '100%',
                sm: 300,
                md: '100%'
              },
              mx: 'auto'
            }}
          >
            <KpiCard
              icon={<TrendingUpIcon />}
              title="Gasto recurrente predicho"
              value={gastoRecurrente}
              caption="Próximo mes"
            />
          </Box>
         </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: 300 }, mx: 'auto' }}>
            <KpiCard
              icon={<PeopleIcon />}
              title="Clientes con patrón recurrente"
              value={clientesRecurrentes}
              caption="Clientes"
            />
          </Box>
         </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: 300 }, mx: 'auto' }}>
            <KpiCard
              icon={<AttachMoneyIcon />}
              title="Promedio de gastos"
              value={promedioGasto}
              caption="Ticket medio"
            />
          </Box>
         </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: 300 }, mx: 'auto' }}>
            <KpiCard
              icon={<PercentIcon />}
              title="Precisión del modelo"
              value={precisionModelo}
              caption="Precisión"
              colorKey={precisionColor}
            />
          </Box>
         </Grid>
       </Grid>

      {/* Fila 3: Gráfico de actividad + Tabla de clientes */}
      <Grid
        container
        spacing={2}
        mb={3}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={6}>
          <ActivityChart data={activityData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ClientsTable rows={clientsData} />
        </Grid>
      </Grid>

      {/* Fila 4: Tres gráficos complementarios */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <TipoVentaChart data={tipoVentaData} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <GirosDoughnutChart data={girosData} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ComerciosPieChart data={comerciosData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardContent;
