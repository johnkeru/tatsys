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
        pt: 1.8,
        pb: 2,
        px: 3,
        boxShadow: 2,
        color: "#1E293B", // Business-friendly dark blue-gray
        backgroundImage:
          "linear-gradient(to right, rgba(30, 58, 138, 0.9) 60%, rgba(59, 130, 246, 0.7) 100%)", // Lighter blue gradient
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="end">
        <Box>
          <Typography variant="h4" fontWeight="bold" color="#FFFFFF">
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" color="grey.600">
              {description}
            </Typography>
          )}
        </Box>
        <Box display="flex" gap={2} alignItems="center">
          {childElement}
          {searchable ? <TableSearchBar /> : null}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardHeader;
