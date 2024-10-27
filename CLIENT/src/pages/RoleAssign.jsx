import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import api from '../../config/api';
import GoBackButton from '../../global/components/GoBackButton';
import { toast } from 'react-hot-toast'
import { useUser } from '../../context/UserContext'
import CustomButton from '../../global/components/CustomButton';

const schema = yup.object().shape({
    sixDigitInput: yup.string()
        .length(6, 'Must be exactly 6 digits')
        .matches(/^\d{6}$/, 'Must be a number with exactly 6 digits')
        .required('This field is required'),
    roles: yup.array()
        .of(yup.string().required())
        .min(1, 'At least one role must be selected'), // Custom validation for roles
});

const RolesComponent = ({ roles, currentUser }) => {
    const [loading, setLoading] = useState(false)
    const defaultValues = {}; // Initialize default values for roles
    roles.forEach(role => {
        defaultValues[`role_${role._id}`] = false; // Set all roles to false initially
    });

    const { handleSubmit, control, setError, watch, reset, formState: { errors, } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            ...defaultValues,
            sixDigitInput: '' // Default value for the 6-digit input
        }
    });

    const [checkedRoles, setCheckedRoles] = useState({});

    const groupedRoles = roles.reduce((acc, role) => {
        const prefix = role.name.split(' ')[0].toUpperCase();
        if (!acc[prefix]) {
            acc[prefix] = [];
        }
        acc[prefix].push(role);
        return acc;
    }, {});

    const handleCheckboxChange = (id, isAdmin, prefix) => {
        setError('roles', { message: '', type: 'required' });
        setCheckedRoles(prev => {
            const updated = { ...prev, [id]: !prev[id] };

            if (isAdmin) {
                groupedRoles[prefix].forEach(role => {
                    if (role._id !== id) {
                        updated[role._id] = updated[id]; // Check/uncheck based on admin's state
                    }
                });
            }
            return updated;
        });
    };

    const handleCheckIfEmptyInput = () => {
        if (!watch('sixDigitInput'))
            toast.error('6-digit input cannot be empty', { position: 'top-right' })
    }

    const handleResetAfter = () => {
        reset()
        setCheckedRoles({})
    }

    const onSubmit = (data) => {
        const selectedIds = Object.keys(checkedRoles).filter(roleId => checkedRoles[roleId]);

        // Check if at least one role is selected
        if (selectedIds.length === 0) {
            setError('roles', { message: "At least one role must be selected.", type: 'required' });
            toast.error('You must select at least one role', { position: 'top-right' })
            return; // Prevent submission if no roles are selected
        }

        setLoading(true);
        const payload = {
            user: data.sixDigitInput,
            roles: selectedIds,
            assignedBy: currentUser.Username[0],
        };
        api.post('/assign-role', payload)
            .then((res) => {
                toast.success(res.data.message, { duration: 4000 });
                handleResetAfter();
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
            <Divider style={{ width: '100%', }} />

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', padding: 2 }}>
                <Controller
                    name="sixDigitInput"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Enter 6 Digits"
                            variant="outlined"
                            error={!!fieldState.error}
                            helperText={fieldState.error ? fieldState.error.message : ''}
                            fullWidth
                            margin="normal"
                        />
                    )}
                />

                {Object.keys(groupedRoles).map(prefix => (
                    <Box key={prefix} sx={{ marginTop: 2 }}>
                        <Typography variant="h6" mb={1} fontWeight={600}>{prefix}</Typography>
                        <FormGroup>
                            {groupedRoles[prefix].map(role => (
                                <FormControlLabel
                                    sx={{
                                        ml: role.name.includes('ADMIN') ? 0 : 2.7,
                                        borderLeft: '1px solid rgba(55, 94, 56, .2)',
                                        borderBottom: '1px solid rgba(55, 94, 56, .2)',
                                        ":hover": { background: 'rgba(55, 94, 56, .2)' }
                                    }}
                                    key={role._id}
                                    control={
                                        <Controller
                                            name={`role_${role._id}`}
                                            control={control}
                                            render={({ field }) => (
                                                <Box width='100%' display='flex' alignItems='center'>
                                                    <Checkbox
                                                        {...field}
                                                        checked={checkedRoles[role._id] || false}
                                                        onChange={() => {
                                                            handleCheckboxChange(role._id, role.name.endsWith('ADMIN'), prefix);
                                                            field.onChange(!checkedRoles[role._id]); // Toggle the checkbox value
                                                        }}
                                                    />

                                                    <Box
                                                        width='100%'
                                                        display='flex'
                                                        alignItems='center'
                                                        justifyContent='space-between'
                                                    >
                                                        {role.name} <span style={{ color: '#787878' }}>{role.permission}</span>
                                                    </Box>
                                                </Box>
                                            )}
                                        />
                                    }
                                />
                            ))}
                        </FormGroup>
                    </Box>
                ))}

                {/* Error for roles */}
                {errors?.roles && (
                    <Typography color="error" variant="subtitle2" sx={{ marginTop: 1 }}>
                        {errors.roles.message}
                    </Typography>
                )}

                <CustomButton sx={{ mt: 5 }} onClick={handleCheckIfEmptyInput} fullWidth type='submit' loading={loading} size='large'>
                    Assign Roles
                </CustomButton>
            </Box>
        </Box>
    );
};



export default function RoleAssign() {
    const { currentUser } = useUser()

    const { data: roles, isLoading } = useQuery({
        queryKey: ['roles'],
        queryFn: async () => {
            const roleNames = currentUser.Roles;
            const queryParams = roleNames.map(role => `roles=${encodeURIComponent(role)}`).join('&');
            const res = await api.get(`roles?${queryParams}`);
            return res.data.roles;
        },
    });
    if (isLoading) return <div>hehe</div>
    return <RolesComponent roles={roles} currentUser={currentUser} />

}