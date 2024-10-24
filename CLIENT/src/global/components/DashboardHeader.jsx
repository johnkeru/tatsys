import React from 'react';
import { Box, Typography } from '@mui/material';

const DashboardHeader = ({ title = 'Dashboard', description }) => {
    return (
        <Box
            sx={{
                p: 2,
                pl: 3,
                boxShadow: 2,
                color: 'white',
                bgcolor: 'secondary.main',
            }}
        >
            <Box >
                <Typography variant="h4" component="h2" fontWeight="bold" >
                    {title}
                </Typography>
                {description && (
                    <Typography variant="body2">
                        {description}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default DashboardHeader;
