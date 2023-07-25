import { Layout } from "@/components/Layout";
import { Box, Typography } from "@mui/material";
import { indigo } from "@mui/material/colors";

export default function Home() {
  return (
    <Layout>
      <Box
        display={{ xs: "none", sm: "flex" }}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
        width="100%"
        position="absolute"
        // sx={{ backgroundColor: indigo[900] }}
      >
        <Typography m={2} fontSize={32} color={indigo[500]}>
          Error 404
        </Typography>
        <Typography color={indigo[500]}>
          Your parcel cannot be delivered...
        </Typography>
        <Box
          display={{ xs: "none", sm: "flex" }}
          sx={{ height: { sm: "200px", md: "300px" } }}
        >
          <video autoPlay loop muted>
            <source src="/404.mp4" type="video/mp4" />
          </video>
        </Box>
      </Box>
      <Box
        display={{ xs: "flex", sm: "none" }}
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        height="100%"
        position="absolute"
        sx={{
          backgroundImage: "url('/404-mobile.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          width: "100%",
        }}
      >
        <Typography m={2} fontSize={32}>
          Error 404
        </Typography>
        <Typography>Your parcel cannot be delivered...</Typography>
        <Box display={{ xs: "none", md: "flex" }}>
          <video autoPlay loop muted>
            <source src="/404.mp4" type="video/mp4" />
          </video>
        </Box>
      </Box>
    </Layout>
  );
}
