import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { GrMore } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import CustomCreateUpdateDialog from "./CustomCreateUpdateDialog";
import CustomDeleteDialog from "./CustomDeleteDialog";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
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
  additionalMenuOptions = [], // Default to an empty array
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <Tooltip title="More Actions">
        <IconButton onClick={handleClick} size="small">
          <GrMore />
        </IconButton>
      </Tooltip>

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {(hasEdit && customEditElement) || (
          <CustomCreateUpdateDialog
            dataListName={dataListName}
            endpoint={endpoint}
            parentClose={handleClose}
            row={row}
            schema={schema}
          />
        )}
        {hasDelete && (
          <CustomDeleteDialog
            row={row}
            endpoint={endpoint}
            parentClose={handleClose}
            dataListName={dataListName}
          />
        )}

        {/* Render additional menu options */}
        {additionalMenuOptions.length > 0 && <Divider sx={{ my: 0.5 }} />}
        {additionalMenuOptions.map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              option.onClick();
              handleClose();
            }}
            disableRipple
            sx={{ display: "flex", gap: 1 }}
          >
            {option.icon}
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ my: 0.5 }} />

        <MenuItem
          onClick={handleClose}
          disableRipple
          sx={{ display: "flex", gap: 1 }}
        >
          <IoMdClose />
          Close
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
