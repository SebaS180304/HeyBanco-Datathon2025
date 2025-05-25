import React, { useState } from 'react';
import { Box, Grid, Autocomplete, TextField, Button, Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// Opciones de estado de 47 a 77
const stateOptions = Array.from({ length: 31 }, (_, i) => 47 + i);
// Opciones de tipo de persona
const personTypeOptions = ['Con Actividad Empresarial', 'Sin Actividad Empresarial'];
// Opciones de género
const genderOptions = ['Femenino', 'Masculino', 'Sin definir'];
// Opciones de actividad empresarial (autocomplete)
const activityOptions = ['EMPLEADO DEL SECTOR SERVICIOS',
    'COMPRAVENTA DE ARTICULOS DE FERRETERIA', 'AGENCIA DE PUBLICIDAD',
    'COMPRA VENTA DE ARTICULOS NO CLASIFICADOS EN OTRA PARTE',
    'AMA DE CASA', 'PROFESIONISTA INDEPENDIENTE',
    'PRESTACION DE OTROS SERVICIOS TECNICOS',
    'EMPLEADO DEL SECTOR INDUSTRIAL',
    'SERVICIOS MEDICO GENERAL Y ESPECIALIZADO EN CONSULTORIOS',
    'SERVICIOS DE ANALISIS DE SISTEMAS Y PROCESAMIENTO ELECTRONICO DE DATOS',
    'SERVICIOS DE ASESORIA Y ESTUDIOS TECNICOS DE ARQUITECTURA E INGENIERIA INCLUSO DISEO INDUSTRIAL',
    'COMPRA VENTA DE ROPA', 'EMPLEADO DE GOBIERNO',
    'ORGANIZACIONES DE ABOGADOS MEDICOS INGENIEROS Y OTRAS ASOCIACIONES DE PROFESIONALES',
    'ESTUDIANTE', 'CONSTRUCCION DE INMUEBLES',
    'ESTABLECIMIENTOS PRIVADOS DE INSTRUCCION EDUCACION CULTURA E INVESTIGACION',
    'PREPARACION DE TIERRAS DE CULTIVO Y OTROS SERVICIOS AGRICOLAS',
    'DESPACHO DE OTROS PROFESIONISTAS',
    'SERVICIOS ADMINISTRATIVOS DE TRAMITE Y COBRANZA INCLUSO ESCRITORIOS PUBLICOS',
    'SERVICIOS DE CONTADURIA Y AUDITORIA INCLUSO TENEDURIA DE LIBROS',
    'COMPRA VENTA DE HARDWARE SOFTWARE Y ARTCULOS COMPUTACIONALES',
    'ESTABLECIMIENTOS PUBLICOS DE INSTRUCCION EDUCACION SUBPROFESIONAL YPROFESIONAL CULTURA E INVESTIGACION',
    'TRANSPORTE DE CARGA FORANEA', 'TIENDA DE ABARROTES Y MISCELANEA',
    'JUBILADO', 'ADMINISTRACION DE INMUEBLES', 'AGENTE DE SEGUROS',
    'TELEDIFUSORA'];

const FiltersBar = ({ onApply }) => {
  const [idEstado, setIdEstado] = useState(null);
  const [genero, setGenero] = useState([]);
  const [tipoPersona, setTipoPersona] = useState([]);
  const [actividad, setActividad] = useState(null);

  const handleApply = () => {
    onApply({ idEstado, tipoPersona, genero, actividad });
  };

  // Ancho dinámico para ID Estado
  const label = 'ID Estado';
  const selectedLength = idEstado ? idEstado.toString().length : label.length;
  const widthCh = selectedLength + 4;

  // Ancho dinámico para Tipo de persona
  const tipoLabel = 'Tipo de persona';
  const tipoSelected = tipoPersona.length > 0 ? tipoPersona.join(', ') : tipoLabel;
  const tipoWidthCh = tipoSelected.length + 4;

  // Ancho dinámico para Género
  const generoLabel = 'Género';
  const generoSelected = genero.length > 0 ? genero.join(', ') : generoLabel;
  const generoWidthCh = generoSelected.length + 4;

  // Ancho dinámico para Actividad Empresarial
  const actividadLabel = 'Actividad Empresarial';
  const actividadSelected = actividad || actividadLabel;
  const actividadWidthCh = actividadSelected.length + 4;

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <Box mb={3}>
      <Grid container spacing={2} alignItems="center">
        {/* Filtro 1: ID Estado */}
        <Grid item>
          <Autocomplete
            value={idEstado}
            size="small"
            onChange={(e, newVal) => setIdEstado(newVal)}
            options={stateOptions}
            sx={{ width: `${widthCh}ch`, minWidth: `${label.length + 4}ch` }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                type="number"
                InputProps={{
                  ...params.InputProps,
                  inputProps: {
                    ...params.inputProps,
                    min: 47,
                    max: 77,
                  },
                  sx: { paddingRight: '2rem' },
                }}
              />
            )}
          />
        </Grid>
        {/* Filtro 2: Tipo de persona */}
        <Grid item>
          <Autocomplete
            multiple
            disableCloseOnSelect
            size="small"
            options={personTypeOptions}
            value={tipoPersona}
            onChange={(e, newVal) => setTipoPersona(newVal)}
            sx={{ width: `${tipoWidthCh}ch`, minWidth: `${tipoLabel.length + 4}ch` }}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={tipoLabel}
                placeholder="Seleccione..."
                InputProps={{
                  ...params.InputProps,
                  sx: { paddingRight: '2rem' },
                }}
              />
            )}
          />
        </Grid>
        {/* Filtro 3: Género */}
        <Grid item>
          <Autocomplete
            multiple
            disableCloseOnSelect
            size="small"
            options={genderOptions}
            value={genero}
            onChange={(e, newVal) => setGenero(newVal)}
            sx={{ width: `${generoWidthCh}ch`, minWidth: `${generoLabel.length + 12}ch` }}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={generoLabel}
                placeholder="Seleccione..."
                InputProps={{
                  ...params.InputProps,
                  sx: { paddingRight: '2rem' },
                }}
              />
            )}
          />
        </Grid>
        {/* Filtro 4: Actividad Empresarial */}
        <Grid item>
          <Autocomplete
            value={actividad}
            size="small"
            onChange={(e, newVal) => setActividad(newVal)}
            options={activityOptions}
            sx={{ width: `${actividadWidthCh}ch`, minWidth: `${actividadLabel.length + 12}ch` }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={actividadLabel}
                placeholder="Seleccione..."
                InputProps={{
                  ...params.InputProps,
                  sx: { paddingRight: '2rem' },
                }}
              />
            )}
          />
        </Grid>
        {/* Botón Aplicar filtros */}
        <Grid item>
          <Button variant="contained" onClick={handleApply}>
            Aplicar filtros
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FiltersBar;