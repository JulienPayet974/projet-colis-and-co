import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { BlueLink } from "../../CustomsMuiComp/BlueLink";

export const Logo = () => {
  const theme = useTheme();
  return (
    <BlueLink href="/">
      <Box
        component="img"
        sx={{
          maxHeight: { xs: 40, md: 52 },
          display: "flex",
        }}
        alt="Parcel logo of Colis&Co"
        src={
          theme.palette.mode === "light"
            ? "/logo_colis&co_dark.png"
            : "/logo_colis&co_light.png"
        }
      />
    </BlueLink>
  );
};
