import { Box } from '@mui/material';
import React from "react";
import { Outlet } from 'react-router-dom';
import DashboardHeader from "../global/components/DashboardHeader";

const RolesManagement = () => {

    return (
        <Box>
            {/* Header */}
            <DashboardHeader title="Role Management" description="Manage User Roles" />

            {/* Content */}
            <Box p={2}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default RolesManagement;
