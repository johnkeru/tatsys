import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    Toolbar,
    Typography
} from '@mui/material';
import React from 'react';
import { CiViewTable } from "react-icons/ci";
import { FaAngleLeft, FaTablets, FaUserGear, FaUserPen } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdSpaceDashboard } from "react-icons/md";
import { Outlet } from 'react-router-dom';
import DisplayRoles from '../global/components/DisplayRoles';
import LinkTo from '../global/components/LinkTo';
import UserAvatarMenu from '../global/components/UserAvatarMenu';
import { isAllowAdminsOnly } from '../utils/checkRole';
import { useUser } from '../context/UserContext';
import env from '../utils/env';

const drawerWidth = 260;
const Dashboard = () => {

    const { currentUser } = useUser()

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => setOpen(!open);

    const drawer = (
        <div>
            <Toolbar />
            {/* User Roles Display */}
            <DisplayRoles />
            <Divider />
            <List>
                <LinkTo icon={<MdSpaceDashboard />} name="Dashboard" link="/dashboard" />
                {isAllowAdminsOnly(currentUser) ? <LinkTo
                    icon={<FaUserGear />}
                    name="Role Management"
                    subLinks={[
                        { name: 'Roles', link: '/role-management', icon: <CiViewTable /> },
                        { name: 'Roles Assign', link: '/role-management/assign', icon: <FaUserPen /> },
                        { name: 'Test', link: '/role-management/test', icon: <FaTablets /> },
                    ]}
                /> : undefined}
            </List>
            <Divider />
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'primary.main', }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        edge="start"
                        sx={{ mr: 2 }}
                    >
                        {open ? <FaAngleLeft /> : <GiHamburgerMenu />}
                    </IconButton>
                    {/* Logo */}
                    <img src="/2020-nia-logo.svg" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
                    <Typography variant="h6" noWrap flexGrow={1}>
                        {env('APP_TITLE')}
                    </Typography>

                    <UserAvatarMenu />

                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        bgcolor: 'primary.main', // Use secondary color for drawer background
                    },
                }}
                variant="persistent" // Keep as persistent
                anchor="left"
                open={open}
            >
                {drawer}
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    transition: 'margin 0.3s ease',
                    marginLeft: open ? `${drawerWidth}px` : '0', // Only apply margin when drawer is open
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box >
    );
};

export default Dashboard;
