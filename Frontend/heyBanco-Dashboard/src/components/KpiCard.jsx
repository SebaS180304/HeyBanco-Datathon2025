import React from 'react';
import { Card, CardContent, Box, Typography, Avatar } from '@mui/material';

const KpiCard = ({ icon, title, value, caption, colorKey }) => (
  <Card
    sx={theme => ({
        width: 180,  
        borderRadius: 2,
        height: 180,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        bgcolor: colorKey ? theme.palette[colorKey].light : theme.palette.background.paper,
    })}
    elevation={1}
  >
    <CardContent
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', p: 2 }}
    >
      {/* Icono con fondo principal */}
      <Avatar
        sx={theme => ({
          bgcolor: theme.palette[colorKey || 'primary'].main,
          width: 32,
          height: 32,
          mb: 1,
        })}
      >
        {icon}
      </Avatar>

      {/* Título */}
      <Typography
        variant="subtitle2"
        sx={theme => ({
          textAlign: 'center',
          mb: 1,
          color: colorKey
            ? '#21222D'
            : theme.palette.text.secondary,
        })}
      >
        {title}
      </Typography>

      {/* Valor */}
      <Typography
        variant="h5"
        sx={{
          mb: 1,
          color: colorKey
            ? '#171821'
            : '#A9DFD8',
          fontWeight: 600,
        }}
      >
        {value}
      </Typography>

      {/* Caption */}
      {caption && (
        <Typography
          variant="caption"
          sx={theme => ({
            color: colorKey
              ? '#21222D'
              : theme.palette.text.secondary,
          })}
        >
          {caption}
        </Typography>
      )}
    </CardContent>
  </Card>
);

export default KpiCard;
