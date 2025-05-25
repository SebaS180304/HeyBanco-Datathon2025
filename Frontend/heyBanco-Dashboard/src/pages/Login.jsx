import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Typography, InputAdornment, IconButton, Alert, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import logo from '/assets/logoB.svg';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const LOGIN_URL = '/LogIn';

const Login = () => {
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [UserID, setUserID] = useState('');
    const [Password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const [userIdError, setUserIdError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [UserID, Password]);

    const validateUserID = () => {
        if (!UserID || UserID.length < 3) {
          setUserIdError(true);
        } else {
          setUserIdError(false);
        }
      };

    const validatePassword = () => {
        if (!Password || Password.length < 5 || Password.length > 20) {
          setPasswordError(true);
        } else {
          setPasswordError(false);
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrMsg('');
        setIsLoading(true);
    
        const requestBody = {
          UserID: UserID,
          Password: Password,
        };
    
        try {
          const response = await axios.post(LOGIN_URL, requestBody, {
            headers: { 'Content-Type': 'application/json' },
          });
    
          const token = response?.data?.token;
          setUserID('');
          setPassword('');
          localStorage.setItem('token', token);

          setSuccessMsg('Inicio de Sesión Exitoso.');
          setTimeout(() => navigate('/dashboard'), 1500);
          setSuccess(true);
        } catch (err) {
          if (!err?.response) {
            setErrMsg('No hay Respuesta del Servidor.');
          } else if (err.response?.status === 400) {
            setErrMsg('Id de Usuario o Contraseña Faltantes.');
          } else if (err.response?.status === 401) {
            setErrMsg('Id de Usuario o Contraseña Incorrectas.');
          } else {
            setErrMsg('Inicio de Sesión Fallido.');
          }
          errRef.current?.focus();
        } finally {
          setIsLoading(false);
        }
      };

    if (success) {
        return (
            <Box sx={{ bgcolor: 'background.default', display: 'flex', flexDirection: 'row', 
                alignItems: 'center', justifyContent: 'center', height: '100vh', px: 2 }} >
            <Box component="form" 
                onSubmit={handleSubmit} 
                sx={{ bgcolor: 'background.paper', padding: 2, borderRadius: '8px', 
                boxShadow: 3, width: '400px', display: 'flex', flexDirection: 'column', 
                alignItems: 'center', justifyContent: 'center' }} >
                <img src={logo} 
                    alt="Logo Hey Banco" 
                    style={{ width: '120px', marginBottom: '20px' }} />
                <Typography variant="h5" mb={2}>Iniciar Sesión</Typography>
                {successMsg && (
                    <Alert ref={errRef} severity="success" sx={{ mb: 2, maxWidth: 400 }}>
                        {successMsg}
                    </Alert>
                )}
            </Box>
        </Box>
        )
    }

    return (
        <Box sx={{ backgroundColor: 'background.default', display: 'flex', flexDirection: 'row', 
        alignItems: 'center', justifyContent: 'center', height: '100vh', px: 2 }} >
            <Box component="form" 
                onSubmit={handleSubmit} 
                sx={{ backgroundColor: 'background.paper', p: 3, borderRadius: 2, 
                boxShadow: 3, width: '400px', display: 'flex', flexDirection: 'column', 
                alignItems: 'center', justifyContent: 'center' }} >
                <img src={logo} 
                    alt="Logo Hey Banco" 
                    style={{ width: '120px', marginBottom: '20px' }} />
                <Typography variant="h5" mb={2}>Iniciar Sesión</Typography>
                {errMsg && (
                    <Alert ref={errRef} severity="error" sx={{ mb: 2, maxWidth: 400 }}>
                        {errMsg}
                    </Alert>
                )}
                <TextField label="Usuario" 
                    inputRef={userRef} type="text" 
                    required 
                    fullWidth 
                    variant="outlined" 
                    placeholder='Usuario' 
                    value={UserID} 
                    onChange={(e) => setUserID(e.target.value)} 
                    onBlur={validateUserID} 
                    error={userIdError} 
                    disabled={isLoading} 
                    helperText={userIdError ? 'Usuario inválido. Mínimo 3 caracteres.' : ''} 
                    sx={{ mb: 2, maxWidth: 400 }} />
                <TextField label="Contraseña" 
                    required 
                    fullWidth 
                    variant="outlined" 
                    placeholder='Contraseña' 
                    type={showPassword ? 'text' : 'password'}
                    value={Password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    onBlur={validatePassword} 
                    error={passwordError}
                    disabled={isLoading} 
                    helperText={passwordError ? 'Contraseña inválida. Mínimo 5 caracteres.' : ''}
                    sx={{ mb: 3, maxWidth: 400 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" color="primary">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }} />
                <Button type="submit"
                    variant="contained" 
                    fullWidth 
                    disabled={isLoading} 
                    endIcon={<LoginIcon />}
                    sx={{ textTransform: 'none', maxWidth: 400, height: 48,fontWeight: 'bold' }} >
                    {isLoading ? <CircularProgress size={24}/> : 'Iniciar Sesión'}
                </Button>
            </Box>
        </Box>
            
    )
}

export default Login