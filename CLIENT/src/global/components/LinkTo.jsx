// LinkTo.js
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

const LinkTo = ({ icon, name, link, subLinks, isAllow }) => {
  const location = useLocation();
  const isActive = location.pathname === link; // Check if the current path matches the link
  const [open, setOpen] = useState(false); // State to manage sub-link visibility

  const handleToggle = () => setOpen(!open);

  useEffect(() => {
    if (subLinks) {
      const subActive = subLinks.find((l) => l.link === location.pathname);
      if (subActive) setOpen(true);
    }
    return () => setOpen(false);
  }, [subLinks, location]);

  return (
    <>
      {isAllow ? (
        <ListItem
          component={link ? Link : "div"} // Use Link for navigation if link is provided
          to={link}
          onClick={subLinks ? handleToggle : undefined} // Toggle sub-links on click if they exist
          sx={{
            bgcolor: isActive ? "rgba(250,250,250,.2)" : "transparent",
            "&:hover": {
              bgcolor: "rgba(250,250,250,.2)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            {" "}
            {/* Set icon color to white */}
            {icon}
          </ListItemIcon>
          <ListItemText primary={name} sx={{ color: "white" }} />{" "}
          {/* Set text color to white */}
          {!subLinks ? undefined : !open ? (
            <IoMdArrowDropdown style={{ color: "white" }} />
          ) : (
            <IoMdArrowDropup style={{ color: "white" }} />
          )}
        </ListItem>
      ) : undefined}

      {subLinks && (
        <Collapse in={open} timeout="auto" unmountOnExit sx={{ ml: 3 }}>
          <List component="div" disablePadding>
            {subLinks.map((subLink) =>
              isAllow || subLink.isAllow ? (
                <ListItem
                  key={subLink.link}
                  component={Link}
                  to={subLink.link}
                  sx={{
                    "&:hover": {
                      bgcolor: "rgba(250,250,250,.2)",
                    },
                    borderLeft: "1px solid rgba(250,250,250,0.3)",
                    bgcolor:
                      location.pathname === subLink.link
                        ? "rgba(250,250,250,.2)"
                        : "transparent",
                  }}
                >
                  <ListItemIcon sx={{ color: "white" }}>
                    {" "}
                    {/* Set sub-link icon color to white */}
                    {subLink.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={subLink.name}
                    sx={{ color: "white" }}
                  />{" "}
                  {/* Set sub-link text color to white */}
                </ListItem>
              ) : undefined
            )}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default LinkTo;
