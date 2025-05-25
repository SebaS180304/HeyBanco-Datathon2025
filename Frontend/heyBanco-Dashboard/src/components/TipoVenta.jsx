import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { chartColors } from './constants';

ChartJS.register(ArcElement, Tooltip, Legend);


export const TipoVentaChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [{
      data: data.values,
      backgroundColor: data.values.map((_, i) => chartColors[i % chartColors.length]),
      borderWidth: 1,
    }],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' },
      tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.parsed} %` } },
    },
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        borderRadius: 2,
        height: 280,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h6"
        mb={1}
        color="primary"
        sx={{ fontWeight: 'bold' }}
      >
        Tipo de venta
      </Typography>
      <Box sx={{ flexGrow: 1, position: 'relative', width: '100%' }}>
        <Pie data={chartData} options={options} style={{ height: '100%' }} />
      </Box>
    </Paper>
  );
};

export const GirosDoughnutChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: data.values.map((_, i) =>
          chartColors[i % chartColors.length]
        ),
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '50%',
    plugins: {
      legend: { position: 'right' },
      tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.parsed} %` } },
    },
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        borderRadius: 2,
        height: 280,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h6"
        mb={1}
        color="primary"
        sx={{ fontWeight: 'bold' }}
      >
        Top 5 giros de comercio + Otros
      </Typography>
      <Box sx={{ flexGrow: 1, position: 'relative', width: '100%' }}>
        <Doughnut data={chartData} options={options} style={{ height: '100%' }} />
      </Box>
    </Paper>
  );
};

export const ComerciosPieChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: data.values.map((_, i) =>
          chartColors[i % chartColors.length]
        ),
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' },
      tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.parsed} %` } },
    },
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        borderRadius: 2,
        height: 280,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h6"
        mb={1}
        color="primary"
        sx={{ fontWeight: 'bold' }}
      >
        Top 5 comercios + Otros
      </Typography>
      <Box sx={{ flexGrow: 1, position: 'relative', width: '100%' }}>
        <Pie data={chartData} options={options} style={{ height: '100%' }} />
      </Box>
    </Paper>
  );
};
