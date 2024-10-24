import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import api from '../config/api';
import { useUser } from '../context/UserContext';
import truncateText from '../utils/truncateText';
import {
    Typography,
    Box,
    TextField,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button,
    Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GoBackButton from '../global/components/GoBackButton'
import CustomButton from '../global/components/CustomButton';

// Validation schema
const schema = yup.object().shape({
    user: yup
        .string()
        .length(6, 'User must be exactly 6 digits')
        .matches(/^\d+$/, 'User must be a number')
        .required('User is required'),
    roles: yup.array().of(yup.string()).min(1, 'At least one role must be selected'),
});

const RoleAssign = () => {
    const { currentUser } = useUser();
    const [loading, setLoading] = useState(false);
    const nav = useNavigate()

    const { data: roles } = useQuery({
        queryKey: ['roles'],
        queryFn: async () => {
            const roleNames = currentUser.Roles;
            const queryParams = roleNames.map(role => `roles=${encodeURIComponent(role)}`).join('&');
            const res = await api.get(`roles?${queryParams}`);
            return res.data.roles;
        },
    });

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            user: '',
            roles: [],
        },
    });

    const onSubmit = (data) => {
        setLoading(true);
        const payload = {
            user: data.user,
            roles: data.roles,
            assignedBy: currentUser.Username[0],
        };
        api.post('/assign-role', payload)
            .then((res) => {
                toast.success(res.data.message, { duration: 4000 });
                reset();
            })
            .catch(err => toast.error(err.response.data.error, { duration: 4000 }))
            .finally(() => setLoading(false));
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box display='flex' alignItems='center' gap={3} width='100%' mb={2}>
                <GoBackButton />
                <Typography variant="h4">
                    Assign Roles
                </Typography>
            </Box>
            <Divider style={{ width: '100%', marginBottom: '20px' }} />


            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', padding: '20px' }}>
                <Box mb={3}>
                    <Controller
                        name="user"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="User ID"
                                fullWidth
                                error={!!errors.user}
                                helperText={errors.user ? errors.user.message : ''}
                                variant="outlined"
                            />
                        )}
                    />
                </Box>

                <Box mb={3}>
                    <Typography variant="subtitle1" gutterBottom>
                        Roles
                    </Typography>
                    <Controller
                        name="roles"
                        control={control}
                        render={({ field }) => (
                            <FormGroup>
                                {roles?.map((role) => (
                                    <FormControlLabel
                                        sx={{ ":hover": { bgcolor: 'lightgray' } }}
                                        key={role._id}
                                        control={
                                            <Checkbox
                                                checked={field.value.includes(role._id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        field.onChange([...field.value, role._id]);
                                                    } else {
                                                        field.onChange(field.value.filter((r) => r !== role._id));
                                                    }
                                                }}
                                            />
                                        }
                                        label={
                                            <>
                                                <Typography variant="body2" mb={-.5}>{role.name}</Typography>
                                                <Typography variant="caption" color="textSecondary" title={role.permission}>
                                                    {truncateText(role.permission, 60)}
                                                </Typography>
                                            </>
                                        }
                                    />
                                ))}
                            </FormGroup>
                        )}
                    />
                    {errors.roles && <Typography color="error">{errors.roles.message}</Typography>}
                </Box>


                <CustomButton fullWidth type='submit' loading={loading} size='large'>
                    Assign Roles
                </CustomButton>
            </form>
        </Box>
    );
};

export default RoleAssign;
