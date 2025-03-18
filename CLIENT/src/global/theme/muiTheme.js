import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { grey, blue } from "@mui/material/colors";

// Define a clean and professional theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#2C3E50", // Deep professional blue
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#6C757D", // Muted gray for a balanced look
      contrastText: "#FFFFFF",
    },
    error: {
      main: blue[700], // Vibrant blue for warnings
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F4F6F8", // Soft light gray background
      paper: "#FFFFFF", // Clean white for content areas
    },
    text: {
      primary: "#2C3E50", // Dark navy for professional readability
      secondary: grey[600], // Softer contrast
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', sans-serif", // Clean, modern, and professional
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#2C3E50", // Dark blue for strong contrast
      textTransform: "capitalize",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#34495E", // Slightly lighter blue-gray
      textTransform: "capitalize",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#5D6D7E", // Balanced gray for easy reading
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "10px 20px",
          fontWeight: 600,
          borderRadius: "6px",
          textTransform: "uppercase",
          fontFamily: "'Poppins', sans-serif",
        },
        containedPrimary: {
          backgroundColor: "#2C3E50", // Professional deep blue
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#1F2E3C", // Slightly darker blue
          },
        },
        outlinedPrimary: {
          borderColor: "#2C3E50",
          color: "#2C3E50",
          "&:hover": {
            backgroundColor: "#2C3E50",
            color: "#FFFFFF",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          color: "#2C3E50",
        },
        head: {
          fontWeight: 700,
          backgroundColor: "#2C3E50",
          color: "#FFFFFF",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#2C3E50", // Deep and refined blue
          borderBottom: "3px solid #6C757D", // Subtle contrast
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
