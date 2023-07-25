import { Menu, MenuItem, Box } from "@mui/material";
import { IconButton, ListItemIcon } from "@mui/material";
import Login from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useState } from "react";
import { useRouter } from "next/router";
import { ThemeSwitch } from "../../CustomsMuiComp/themeSwitch";

export const BurgerMenu = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogin = () => {
    setAnchorEl(null);
    router.push("/login");
  };
  const handleRegister = () => {
    setAnchorEl(null);
    router.push("/register");
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "flex", sm: "none" },
        justifyContent: "flex-end",
      }}
    >
      <ThemeSwitch />
      <IconButton
        size="small"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          color: "customBlue.dark",
        }}
      >
        <MenuIcon />
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
            mt: 0,
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
              right: 20,
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
        <MenuItem onClick={handleLogin}>
          <ListItemIcon>
            <Login fontSize="small" />
          </ListItemIcon>
          Connexion
        </MenuItem>
        <MenuItem onClick={handleRegister}>
          <ListItemIcon>
            <HowToRegIcon fontSize="small" />
          </ListItemIcon>
          Inscription
        </MenuItem>
      </Menu>
    </Box>
  );
};
