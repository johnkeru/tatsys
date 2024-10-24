import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import api from '../config/api';
import { useUser } from '../context/UserContext';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import CustomButton from '../global/components/CustomButton';

// Validation schema
const schema = yup.object().shape({
    username: yup
        .string()
        .matches(/^\d{6}$/, 'Username must be 6 digits')
        .required('Username is required'),
    password: yup.string().required('Password is required'),
});

const LoginForm = () => {
    const theme = useTheme(); // Access the MUI theme
    const { setCurrentUser } = useUser();
    const [nextLink, setNextLink] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const nav = useNavigate();

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const res = await api.post('/login', data);
            if (res.status === 200) {
                await setCurrentUser();
                // window.location.href = nextLink
                nav('/role-management');
            }
        } catch {
            setSubmitError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const urlObj = new URL(location.href);
        const next = urlObj.searchParams.get('next');
        setNextLink(next);
    }, []);

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            sx={{
                background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
            }}
        >
            <Box
                display="flex"
                sx={{
                    background: theme.palette.primary.main,
                    boxShadow: 3,
                    maxWidth: '900px',
                }}
            >
                {/* Left side: Logo */}
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ width: '70%' }}
                >
                    <img
                        src="/2020-nia-logo.svg"
                        alt="FMIS Logo"
                        style={{ height: '224px' }}
                    />
                </Box>

                {/* Right side: Form */}
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    p={3}
                    bgcolor="white"
                >
                    <Typography variant="h5" color={theme.palette.text.primary} mb={1}>
                        Financial Management Information System
                    </Typography>

                    {(submitError || errors.password || errors.username) && (
                        <Typography
                            variant="body2"
                            color="error"
                            mb={2}
                            sx={{ backgroundColor: '#f8d7da', p: 1, border: '1px solid #f5c6cb' }}
                        >
                            Invalid Credentials
                        </Typography>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            {...register('username')}
                            label="Enter 6-digit username"
                            variant="outlined"
                            fullWidth
                            error={!!errors.username}
                            // helperText={errors.username ? errors.username.message : ''}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            {...register('password')}
                            label="Enter your password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            error={!!errors.password}
                            // helperText={errors.password ? errors.password.message : ''}
                            sx={{ mb: 1 }}
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    {...register('rememberMe')}
                                    color="primary"
                                />
                            }
                            label="Remember me"
                        />

                        <CustomButton
                            loading={loading}
                            type="submit"
                            fullWidth
                            sx={{
                                mt: 2,
                            }}
                            size='large'
                        >
                            Log In
                        </CustomButton>
                    </form>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginForm;
