import React, { useEffect, useState } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const LinkTo = ({ icon, name = "", link = "", subLinks, isAllow }) => {
  const location = useLocation();
  const isActive =
    location.pathname === link ||
    (subLinks && subLinks.some((sub) => sub.link === location.pathname));
  const [open, setOpen] = useState(isActive);

  const handleToggle = () => setOpen((prev) => !prev);

  useEffect(() => {
    if (subLinks?.some((sub) => sub.link === location.pathname)) {
      setOpen(true);
    }
  }, [location.pathname, subLinks]);

  return (
    <>
      {isAllow && (
        <ListItem
          component={link ? Link : "div"}
          to={link}
          onClick={subLinks ? handleToggle : undefined}
          sx={{
            bgcolor: isActive ? "rgba(255, 255, 255, 0.15)" : "transparent",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "white" }}>{icon}</ListItemIcon>
          <ListItemText primary={name} sx={{ color: "white" }} />
          {subLinks &&
            (open ? (
              <IoMdArrowDropup style={{ color: "white" }} />
            ) : (
              <IoMdArrowDropdown style={{ color: "white" }} />
            ))}
        </ListItem>
      )}

      {subLinks && (
        <Collapse in={open} timeout="auto" unmountOnExit sx={{ ml: 3 }}>
          <List component="div" disablePadding>
            {subLinks.map(
              (subLink) =>
                (isAllow || subLink.isAllow) && (
                  <ListItem
                    key={subLink.link}
                    component={Link}
                    to={subLink.link}
                    sx={{
                      borderLeft: "2px solid rgba(255, 255, 255, 0.3)",
                      bgcolor:
                        location.pathname === subLink.link
                          ? "rgba(255, 255, 255, 0.15)"
                          : "transparent",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.2)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "white" }}>
                      {subLink.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={subLink.name}
                      sx={{ color: "white" }}
                    />
                  </ListItem>
                )
            )}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default LinkTo;
