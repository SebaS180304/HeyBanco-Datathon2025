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
  // data viene como { digital: number, fisica: number }
  const entries = Object.entries(data);
  const labels = entries.map(
    ([key]) => key.charAt(0).toUpperCase() + key.slice(1)
  );
  const percentages = entries.map(
    ([, value]) => +(value * 100).toFixed(2)
  );

  const chartData = {
    labels,
    datasets: [
      {
        data: percentages,
        backgroundColor: labels.map(
          (_, i) => chartColors[i % chartColors.length]
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
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.label}: ${ctx.parsed}%`
        }
      }
    }
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
        sx={{ fontWeight: 'bold', textAlign: 'center' }}
      >
        Tipo de venta
      </Typography>
      <Box sx={{ flexGrow: 1, position: 'relative', width: '100%' }}>
        <Pie
          data={chartData}
          options={options}
          style={{ height: '100%' }}
        />
      </Box>
    </Paper>
  );
};

export const GirosDoughnutChart = ({ data }) => {
  // data puede llegar como array o como objeto { values: [...] }
  const items = Array.isArray(data) ? data : (data?.values ?? []);
  const labels = items.map(item => item.name);
  const percentages = items.map(item => +(item.percent * 100).toFixed(2));

  const chartData = {
    labels,
    datasets: [
      {
        data: percentages,
        backgroundColor: labels.map((_, i) => chartColors[i % chartColors.length]),
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
      tooltip: {
        callbacks: {
          label: ctx => {
            const idx = ctx.dataIndex;
            const pct = percentages[idx];
            const val = items[idx]?.value;
            return `${ctx.label}: ${pct}% ($${val?.toLocaleString()})`;
          },
        },
      },
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
        sx={{ fontWeight: 'bold', textAlign: 'center' }}
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
  // data puede llegar como { values: [ … ] } o directamente como array
  const items = Array.isArray(data) ? data : (data?.values ?? []);
  const labels = items.map(item => item.name);
  const percentages = items.map(item => +(item.percent * 100).toFixed(2));

  const chartData = {
    labels,
    datasets: [{
      data: percentages,
      backgroundColor: labels.map((_, i) => chartColors[i % chartColors.length]),
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' },
      tooltip: {
        callbacks: {
          label: ctx => {
            const idx = ctx.dataIndex;
            const val = items[idx]?.value;
            return `${ctx.label}: ${percentages[idx]}% ($${val?.toLocaleString()})`;
          }
        }
      },
    },
  };

  return (
    <Paper elevation={1} sx={{
      p: 2, borderRadius: 2, height: 280,
      display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>
      <Typography variant="h6" mb={1} color="primary" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Top Comercios
      </Typography>
      <Box sx={{ flexGrow: 1, position: 'relative', width: '100%' }}>
        <Pie data={chartData} options={options} style={{ height: '100%' }} />
      </Box>
    </Paper>
  );
};
