import { Box, Divider, List, Toolbar, Typography } from "@mui/material";
import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import {
  FaUserTie,
  FaBoxes,
  FaClipboardList,
  FaExchangeAlt,
} from "react-icons/fa";
import LinkTo from "../global/components/LinkTo";
import env from "../utils/env";

const CustomDrawer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        position: "relative",
        background: "linear-gradient(180deg, #2C3E50 10%, #6C757D 100%)", // Smooth professional gradient
      }}
    >
      <Box>
        <Toolbar />
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />
        <List sx={{ py: 0 }}>
          <LinkTo
            icon={<MdSpaceDashboard />}
            name="Dashboard"
            link="/dashboard"
            isAllow
          />
          <LinkTo
            icon={<FaUserTie />}
            name="Employees"
            link="/employees"
            isAllow
          />
          <LinkTo icon={<FaBoxes />} name="Supplies" link="/supplies" isAllow />
          <LinkTo
            icon={<FaClipboardList />}
            name="Inventory"
            link="/inventory"
            isAllow
          />
          <LinkTo
            icon={<FaExchangeAlt />}
            name="Transactions"
            link="/transactions"
            isAllow
          />
        </List>
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          background: "rgba(44, 62, 80, 0.85)", // Softer background
          backdropFilter: "blur(5px)",
          py: 2,
        }}
      >
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.15)" }} />
        <Typography
          variant="body2"
          align="center"
          sx={{
            color: "#F4F6F8",
            fontSize: "0.85rem",
            fontWeight: 500,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          &copy; {new Date().getFullYear()} {env("APP_TITLE")}
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomDrawer;
