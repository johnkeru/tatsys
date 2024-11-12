import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import ReAssignRoleDialog from '../../components/role/ReAssignRoleDialog';
import api from '../../config/api';
import { useUser } from '../../context/UserContext';
import DashboardHeader from '../../global/components/DashboardHeader';
import TableLoading from '../../global/components/TableLoading';
import { FaUserPen } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { isSuperAdmin } from '../../utils/checkRole';

export default function RolesAssignedTable() {
    const { currentUser } = useUser();
    const isSA = isSuperAdmin(currentUser)
    const { data: roles, isLoading, } = useQuery({
        queryKey: ['roles_assigned'],  // Include currentTab in queryKey to handle default and dynamic refetch
        queryFn: async () => {
            const res = await api.get(`get-roles-you-assigned?superAdmin=${isSA ? 'true' : ''}`);
            return res.data.assignedRoles;
        },
        enabled: !!currentUser,  // Ensure the query runs only if currentUser is defined
    });

    if (isLoading) return <TableLoading />
    return <TablePlain data={roles} />
}


const TablePlain = ({ data, }) => {
    const nav = useNavigate()
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('fullName');

    // Sorting handler
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Sorting function
    const sortedData = React.useMemo(() => {
        return data.sort((a, b) => {
            if (orderBy === 'fullName') {
                return order === 'asc' ? a.fullName.localeCompare(b.fullName) : b.fullName.localeCompare(a.fullName);
            } else if (orderBy === 'age') {
                return order === 'asc' ? a.age - b.age : b.age - a.age;
            }
            return 0;
        });
    }, [data, order, orderBy]);

    return (
        <>
            <DashboardHeader
                title="Employee Role Assignment"
                description="View and manage roles assigned to employees."
            />

            <Box p={2} display='flex' justifyContent='end'>
                <Button
                    size='large'
                    startIcon={<FaUserPen />}
                    variant="contained"
                    color="info"
                    onClick={() => nav('/role-management/assign')}
                >
                    Role Assign
                </Button>
            </Box>


            <Box px={2}>
                <TableContainer component={Paper}>
                    <Table size='small'>
                        <TableHead sx={{ bgcolor: 'secondary.main', }}>
                            <TableRow>
                                <TableCell sx={{
                                    color: 'white', // This colors the icon when inactive
                                    '&.Mui-active': {
                                        color: 'white', // This colors the icon when active
                                    },
                                }}>
                                    Assigned By
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'fullName'}
                                        direction={orderBy === 'fullName' ? order : 'asc'}
                                        onClick={() => handleRequestSort('fullName')}
                                        sx={{
                                            color: 'white', // This colors the icon when inactive
                                            '&.Mui-active': {
                                                color: 'white', // This colors the icon when active
                                            },
                                            '& .MuiTableSortLabel-icon': {
                                                color: 'white !important', // Enforce white color on the arrow icon
                                            },
                                        }}
                                    >
                                        Full Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="right" sx={{
                                    color: 'white', // This colors the icon when inactive
                                    '&.Mui-active': {
                                        color: 'white', // This colors the icon when active
                                    },
                                }}>
                                    Employee ID
                                </TableCell>
                                <TableCell sx={{
                                    color: 'white', // This colors the icon when inactive
                                    '&.Mui-active': {
                                        color: 'white', // This colors the icon when active
                                    },
                                }}>
                                    Roles
                                </TableCell>
                                <TableCell align="right" sx={{
                                    color: 'white', // This colors the icon when inactive
                                    '&.Mui-active': {
                                        color: 'white', // This colors the icon when active
                                    },
                                }}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedData.length === 0 ? <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Typography variant="body1" color="textSecondary">
                                        No entries available.
                                    </Typography>
                                </TableCell>
                            </TableRow>

                                :
                                sortedData.map((role) => (
                                    <TableRow key={role._id}>
                                        <TableCell component="th" scope="raw">
                                            <b>{role.assignedBy}</b>
                                        </TableCell>
                                        <TableCell component="th" scope="raw">
                                            <b>{role.fullName}</b>
                                        </TableCell>
                                        <TableCell align="right">{role.user}</TableCell>
                                        <TableCell>
                                            {role.roles.map(item => item.name).join(', ')}
                                        </TableCell>
                                        <TableCell align="right">
                                            <ReAssignRoleDialog data={role} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

