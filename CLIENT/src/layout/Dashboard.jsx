import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { FaCaretLeft } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Outlet, useNavigate } from "react-router-dom";
import UserAvatarMenu from "../global/components/UserAvatarMenu";
import env from "../utils/env";
import CustomDrawer from "./CustomDrawer";

const drawerWidth = 260;

const Dashboard = () => {
  const nav = useNavigate();
  const [open, setOpen] = React.useState(true);
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "primary.main",
          boxShadow: 1,
          borderBottom: "2px solid",
          borderColor: "secondary.light",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: { xs: 0, md: 2 } }}
          >
            {open ? (
              <FaCaretLeft title="Hide Menu" />
            ) : (
              <GiHamburgerMenu title="Open Menu" />
            )}
          </IconButton>
          <img
            src="/2020-nia-logo.svg"
            alt="Logo"
            style={{ height: "40px", marginRight: "10px", cursor: "pointer" }}
            onClick={() => nav("/")}
          />
          <Typography variant="h6" noWrap flexGrow={1} color="white">
            {env("APP_TITLE")}
          </Typography>
          <UserAvatarMenu />
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background:
              "linear-gradient(169deg, rgba(30, 58, 138, 1) 10%, rgba(59, 130, 246, 0.9) 100%)", // Business-friendly gradient
          },
        }}
        variant={isMdScreen ? "temporary" : "persistent"}
        anchor="left"
        open={open}
        onClose={toggleDrawer}
      >
        <CustomDrawer />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          transition: "margin 0.3s ease, padding 0.3s ease",
          marginLeft: open && !isMdScreen ? `${drawerWidth}px` : "0",
          minHeight: "calc(100vh - 64px)",
          overflowX: "hidden",
        }}
      >
        <Toolbar />
        <Box sx={{ maxWidth: "100%", overflowX: "auto" }}>
          <Outlet />
        </Box>

        <Typography
          variant="body2"
          align="center"
          sx={{ px: 1.5, py: 2, color: "text.secondary" }}
        >
          &copy; {new Date().getFullYear()} {env("APP_TITLE")}
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
