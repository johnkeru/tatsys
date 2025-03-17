import { Box, Divider, List, Toolbar, Typography } from "@mui/material";
import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
// import DisplayRoles from "../global/components/DisplayRoles";
import LinkTo from "../global/components/LinkTo";
import { GrTest } from "react-icons/gr";

const CustomDrawer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <Box>
        <Toolbar />
        {/* <DisplayRoles /> */}
        <Divider sx={{ borderColor: "secondary.light" }} />
        <List sx={{ py: 0 }}>
          <LinkTo
            icon={<MdSpaceDashboard />}
            name="Dashboard"
            link="/dashboard"
            isAllow
          />
          <LinkTo icon={<GrTest />} name="Test" link="/test" isAllow />
        </List>
      </Box>
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          background: "rgba(0,0,0,0.7996848739495799)",
          backdropFilter: "blur(2px)",
        }}
      >
        <Divider sx={{ borderColor: "primary.light" }} />
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "common.white", py: 2 }}
        >
          &copy; {new Date().getFullYear()} TATTOO SYSTEM
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomDrawer;
