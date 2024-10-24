import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography, } from '@mui/material';
import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaUserPen } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import AddRoleModal from '../components/role/AddRoleModal';
import RoleTableMenu from '../components/role/RoleTableMenu';
import api from '../config/api';
import { useUser } from '../context/UserContext';
import CustomSortLabel from '../global/components/CustomSortLabel'

export default function RolesTable() {
    const { currentUser } = useUser();
    const { data: roles, isLoading } = useQuery({
        queryKey: ['roles'],
        queryFn: async () => {
            const roleNames = currentUser.Roles;
            const queryParams = roleNames.map(role => `roles=${encodeURIComponent(role)}`).join('&');
            const res = await api.get(`roles?${queryParams}`);
            return res.data.roles;
        },
    });

    if (isLoading) return <div>Loading...</div>;
    return <TablePlain data={roles} />
}


const TablePlain = ({ data }) => {
    const nav = useNavigate()

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');

    // Sorting handler
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Sorting function
    const sortedData = React.useMemo(() => {
        return data.sort((a, b) => {
            if (orderBy === 'name') {
                return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            } else if (orderBy === 'age') {
                return order === 'asc' ? a.age - b.age : b.age - a.age;
            }
            return 0;
        });
    }, [data, order, orderBy]);

    return (
        <>
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button
                    size='large'
                    startIcon={<FaUserPen />}
                    variant="contained"
                    color="info"
                    onClick={() => nav('/role-management/assign')}
                    sx={{ mr: 1 }}
                >
                    Role Assign
                </Button>
                <AddRoleModal />
            </Box>


            <TableContainer component={Paper}>
                <Table size='small'>
                    <TableHead sx={{ bgcolor: 'secondary.main', }}>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'name'}
                                    direction={orderBy === 'name' ? order : 'asc'}
                                    onClick={() => handleRequestSort('name')}
                                    IconComponent={(props) => <CustomSortLabel direction={order} {...props} />}
                                >
                                    <Typography color="white" mr={1}>Role Name</Typography>
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                                <Typography color="white">Permission</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography color="white">Actions</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.map((role) => (
                            <TableRow key={role.name}>
                                <TableCell component="th" scope="raw">
                                    <b>{role.name}</b>
                                </TableCell>
                                <TableCell align="right">{role.permission}</TableCell>
                                <TableCell align="right">
                                    <RoleTableMenu data={role} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

