import { Box, Typography } from "@mui/material";
import React from "react";
import TableSearchBar from "./TableSearchBar";

const DashboardHeader = ({
  title = "Dashboard",
  description = "",
  searchable = false,
  childElement,
}) => {
  return (
    <Box
      sx={{
        pt: 2,
        pb: 2.5,
        px: 3,
        boxShadow: 3,
        backgroundImage:
          "linear-gradient(120deg, rgba(44, 62, 80, 0.95) 40%, rgba(108, 117, 125, 0.85) 100%)", // Professional blue-gray gradient
        borderBottom: "2px solid #2C3E50", // Subtle, refined border
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="end">
        <Box>
          <Typography
            variant="h4"
            fontWeight="600"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              textTransform: "capitalize",
              letterSpacing: "1px",
              color: "#E0E0E0", // Soft white for clarity
            }}
          >
            {title}
          </Typography>
          {description && (
            <Typography
              variant="body2"
              sx={{
                color: "#B0BEC5", // Muted gray-blue for readability
                fontSize: "1rem",
                fontStyle: "italic",
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
        <Box display="flex" gap={2} alignItems="center">
          {childElement}
          {searchable && <TableSearchBar />}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardHeader;
