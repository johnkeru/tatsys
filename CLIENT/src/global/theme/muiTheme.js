import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Define your custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#264524', // Change to your custom color
            contrastText: '#ffffff', // Text color for primary buttons
        },
        secondary: {
            main: '#375e38', // Change to your custom color
            contrastText: '#ffffff',
        },
        error: {
            main: red[400], // Error color for form validation errors
            contrastText: '#ffffff', // Text color for error buttons
        }, // Error color for form validation errors
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
                    backgroundColor: '#375e38', // Secondary main color
                    color: '#ffffff', // Secondary contrastText color
                    '&:hover': {
                        backgroundColor: '#264524', // Darker shade of secondary color for hover effect
                    },
                },

            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    marginBottom: '0.4rem', // Adjusted margin to match 'mb: .5' style
                },
            },
        }
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
