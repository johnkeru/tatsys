import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { alpha, styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { GrMore } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import CustomCreateUpdateDialog from "./CustomCreateUpdateDialog";
import CustomDeleteDialog from "./CustomDeleteDialog";

const StyledPopover = styled(Popover)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiList-root": {
      padding: "4px 0",
    },
    "& .MuiListItemButton-root": {
      "&:hover": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles?.("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

export default function CustomMenu({
  row,
  schema,
  endpoint,
  dataListName,
  hasEdit,
  hasDelete,
  customEditElement,
  additionalMenuOptions = [],
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <Tooltip title="More Actions">
        <IconButton onClick={handleClick} size="small">
          <GrMore />
        </IconButton>
      </Tooltip>

      <StyledPopover
        id="custom-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List>
          {/* Edit Option */}
          {(hasEdit && customEditElement) || (
            <CustomCreateUpdateDialog
              dataListName={dataListName}
              endpoint={endpoint}
              parentClose={handleClose}
              row={row}
              schema={schema}
            />
          )}

          {/* Delete Option */}
          {hasDelete && (
            <CustomDeleteDialog
              row={row}
              endpoint={endpoint}
              parentClose={handleClose}
              dataListName={dataListName}
            />
          )}

          {/* Additional Options */}
          {additionalMenuOptions.length > 0 && <Divider sx={{ my: 0.5 }} />}
          {additionalMenuOptions.map((Component, index) => (
            <Component
              key={index}
              row={row}
              endpoint={endpoint}
              parentClose={handleClose}
              dataListName={dataListName}
            />
          ))}

          <Divider sx={{ my: 0.5 }} />

          {/* Close Option */}
          <ListItemButton
            onClick={handleClose}
            sx={{ display: "flex", gap: 1 }}
          >
            <IoMdClose />
            <ListItemText primary="Close" />
          </ListItemButton>
        </List>
      </StyledPopover>
    </div>
  );
}
