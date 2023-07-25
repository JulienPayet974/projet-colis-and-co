import { Container } from "@mui/material";
import { ResponsiveAppBar as Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { AuthContext } from "../../utils/context/auth";
import { useContext } from "react";

export const MainContainer = ({ children }) => {
  return (
    <Container
      sx={{
        p: { xs: 0, sm: 0 },
        minHeight: "100vh",
        minWidth: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Container
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          p: 0,
          position: "relative",
        }}
      >
        {children}
      </Container>
      <Footer />
    </Container>
  );
};
