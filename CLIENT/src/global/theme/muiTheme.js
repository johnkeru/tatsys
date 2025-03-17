import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { grey, red } from "@mui/material/colors";

// Define a business-friendly blue theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1E3A8A", // Medium business blue
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#3B82F6", // Lighter blue for contrast
      contrastText: "#FFFFFF",
    },
    error: {
      main: red[400],
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F3F4F6", // Soft greyish-blue background
      paper: "#E5E7EB", // Light paper-like background
    },
    text: {
      primary: "#1E293B", // Dark blue-gray for readability
      secondary: grey[600],
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2.2rem",
      fontWeight: 700,
      color: "#1E293B",
    },
    h2: {
      fontSize: "1.8rem",
      fontWeight: 600,
      color: "#1E293B",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#374151", // Softer text color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "8px 18px",
          fontWeight: 600,
          borderRadius: "6px", // Slightly rounded buttons
          textTransform: "none",
        },
        containedPrimary: {
          backgroundColor: "#1E3A8A",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#1C3D8B", // Subtle hover effect
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          color: "#1E293B",
        },
        head: {
          fontWeight: 700,
          backgroundColor: "#3B82F6",
          color: "#FFFFFF",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E3A8A",
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
