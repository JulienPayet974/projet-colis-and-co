import { BottomCards } from "./BottomCards";
import YouAreBtn from "./YouAreBtn";
import { Box } from "@mui/material";
import { useState } from "react";

export const BottomSection = () => {
  const [youAre, setYouAre] = useState("expeditor");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 2,
        // "& > *": {
        //   m: 1,
        // },
      }}
    >
      <YouAreBtn youAre={youAre} setYouAre={setYouAre} />
      <BottomCards youAre={youAre} />
    </Box>
  );
};
