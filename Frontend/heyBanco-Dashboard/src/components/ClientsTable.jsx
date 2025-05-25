import React from 'react';
import { Paper, useTheme, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const ClientsTable = ({ rows }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const columns = [
    { field: 'idCliente', headerName: 'ID Cliente', minWidth: 40 },
    { field: 'id_estado', headerName: 'Estado', minWidth: 100, hide: isSm },
    { field: 'tipoPersona', headerName: 'Tipo de persona', minWidth: 140 },
    { field: 'genero', headerName: 'Género', minWidth: 40, hide: isSm },
    { field: 'actividadEmpresarial', headerName: 'Actividad empresarial', flex: 1 },
  ];

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        borderRadius: 2,
        height: 300,
        overflowY: 'auto',
        overflowX: 'auto',
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        pagination
        disableColumnMenu
        disableSelectionOnClick
        autoHeight={false}
        sx={{
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      />
    </Paper>
  );
};

export default ClientsTable;
