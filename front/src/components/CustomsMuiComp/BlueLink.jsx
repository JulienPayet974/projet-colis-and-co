import Link from "next/link";

import { styled } from "@mui/material/styles";

export const BlueLink = styled(Link)(({ theme }) => ({
  color: theme.palette.customBlue.dark,
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  display: "inline-block",
}));
