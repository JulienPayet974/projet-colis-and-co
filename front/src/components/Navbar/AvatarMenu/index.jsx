import { useState, useContext } from "react";
import { useRouter } from "next/router";

import { Avatar, Menu, MenuItem, Box } from "@mui/material";
import { IconButton, ListItemIcon } from "@mui/material";
import Logout from "@mui/icons-material/Logout";

import { stringAvatar } from "../functions/stringAvatar";
import { AuthContext } from "../../../utils/context/auth";
import { ThemeSwitch } from "../../CustomsMuiComp/themeSwitch";

export const AvatarMenu = ({ firstName, lastName }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useContext(AuthContext);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    router.push("/");
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <ThemeSwitch />
      <IconButton
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar {...stringAvatar(`${firstName} ${lastName}`)} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock={true} // avoid hidding scrollbar
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};
