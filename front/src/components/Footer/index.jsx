import { BlueLink } from "../CustomsMuiComp/BlueLink";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Divider } from "@mui/material";

const apropos = [
  "Mentions légales",
  "Conditions générales",
  "Protection des données",
];

const icons = [
  [<FacebookIcon />, "https://www.facebook.com/"],
  [<InstagramIcon />, "https://www.instagram.com/"],
  [<WhatsAppIcon />, "https://www.whatsapp.com/"],
];

export const Footer = () => {
  return (
    <Box mt={3}>
      <Divider variant="middle" />
      <Box
        component="footer"
        display="flex"
        sx={{
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          display="flex"
          sx={{
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
          }}
        >
          <p>A propos:</p>
          {apropos.map((item, i) => (
            <BlueLink href="/" underline="hover" key={`${item}-${i}`}>
              {item}
            </BlueLink>
          ))}
        </Box>
        <p>La solution pour toutes vos livraisons</p>
        <Box display="flex" flexDirection="row" justifyContent="center">
          {icons.map((item, i) => (
            <BlueLink href={item[1]} key={`${item[0]}-${i}`}>
              {item[0]}
            </BlueLink>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
