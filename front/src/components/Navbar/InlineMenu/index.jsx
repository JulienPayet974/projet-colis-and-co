import { useRouter } from "next/router";

import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { ThemeSwitch } from "../../CustomsMuiComp/themeSwitch";

export const InlineMenu = () => {
  const theme = useTheme();
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  };
  const handleRegister = () => {
    router.push("/register");
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "none", sm: "flex" },
        justifyContent: "flex-end",
      }}
    >
      <Button
        variant="contained"
        size="small"
        sx={{
          mx: 1,
          display: "block",
          fontWeight: "bold",
          fontSize: "0.7rem",
          backgroundColor: theme.palette.secondary.main,
        }}
        onClick={handleLogin}
      >
        Connexion
      </Button>
      <Button
        variant="contained"
        size="small"
        sx={{
          mx: 1,
          display: "block",
          fontWeight: "bold",
          fontSize: "0.7rem",
          backgroundColor: theme.palette.secondary.main,
        }}
        onClick={handleRegister}
      >
        Inscription
      </Button>
      <ThemeSwitch />
    </Box>
  );
};
