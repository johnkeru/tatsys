import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import env from '../../utils/env'

// Define your custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: env('PRIMARY_COLOR'), // Change to your custom color
            contrastText: env('PRIMARY_CONTRAST_COLOR'), // Text color for primary buttons
        },
        secondary: {
            main: env('SECONDARY_COLOR'), // Change to your custom color
            contrastText: env('SECONDARY_CONTRAST_COLOR'),
        },
        background: {
            default: '#f4f6f8', // Background color for the app
            paper: '#ffffff', // Background color for cards and other elements
        },
        text: {
            primary: '#292929', // Set the main text color to #292929
            secondary: '#666', // Secondary text color
            // You can also define custom text colors if needed
            customColor: '#292929', // Optional: add a custom color for specific use
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            letterSpacing: '0.1rem',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '6px 17px',
                },
                containedPrimary: {
                    backgroundColor: env('SECONDARY_COLOR'), // Secondary main color
                    color: env('SECONDARY_CONTRAST_COLOR'), // Secondary contrastText color
                    '&:hover': {
                        backgroundColor: env('PRIMARY_COLOR'), // Darker shade of secondary color for hover effect
                    },
                },

            },
        },
        // MuiAppBar: {
        //     styleOverrides: {
        //         root: {
        //             backgroundColor: '#1c313a', // Custom AppBar background
        //         },
        //     },
        // },
    },
});

export default responsiveFontSizes(theme);
