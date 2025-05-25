import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import FiltersBar from './FiltersBar';
// Importar componentes futuros
// import KpiCard from './KpiCard';
// import ActivityChart from './ActivityChart';
// import ClientsTable from './ClientsTable';
// import ChartCard from './ChartCard';

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

  return (
    <Box sx={{ p: 3, bgcolor: 'background.default' }}>	
      {/* Fila 1: Barra de filtros */}
      <FiltersBar onApply={handleApplyFilters} />

      {/* Fila 2: KPIs (Pendiente de implementar) */}
      <Grid container spacing={2} mb={3}>
        {/* Ejemplo de uso:
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard title="Gasto recurrente predicho" value="$0" icon={<DollarIcon />} />
        </Grid>
        */}
      </Grid>

      {/* Fila 3: Gráfico de actividad + Tabla de clientes */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={6}>
          {/* <ActivityChart filters={filters} /> */}
        </Grid>
        <Grid item xs={12} md={6}>
          {/* <ClientsTable filters={filters} /> */}
        </Grid>
      </Grid>

      {/* Fila 4: Tres gráficos complementarios */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          {/* <ChartCard title="Tipo de Venta" data={...} /> */}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {/* <ChartCard title="Top 5 Giros + Otros" data={...} /> */}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {/* <ChartCard title="Top 5 Comercios + Otros" data={...} /> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardContent;
