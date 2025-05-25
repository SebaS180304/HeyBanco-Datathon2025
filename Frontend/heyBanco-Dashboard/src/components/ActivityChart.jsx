import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { chartColors } from './constants';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const ActivityChart = ({ data }) => {
  const { labels, series, dataSets } = data;

  const chartData = {
    labels,
    datasets: series.map((name, idx) => ({
      label: name,
      data: dataSets[idx],
      backgroundColor: chartColors[idx % chartColors.length],
      borderColor:   chartColors[idx % chartColors.length],
      fill: false,
      tension: 0.4,
      pointRadius: 3,
    }))
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    stacked: true,
    plugins: {
      legend: { position: 'top', display: false },
      tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}%` } },
    },
    scales: {
      x: { stacked: true, title: { display: true, text: 'Mes' } },
      y: {
        min: 0,
        max: 100,
        stacked: false,
        beginAtZero: true,
        ticks: {
            stepSize: 10,   // opcional: marca cada 10%
            callback: val => `${val}%`
          },
        title: { display: true, text: '% Gasto' }
      }
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        borderRadius: 2,
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h6" mb={1} color="primary" sx={{ fontWeight: 'bold' }}>
        % Gasto por Actividad Empresarial
      </Typography>
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        <Line
          data={chartData}
          options={options}
        />
      </Box>
    </Paper>
  );
};

export default ActivityChart;