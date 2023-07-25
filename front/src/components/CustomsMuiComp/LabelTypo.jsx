import { Typography } from "@mui/material";

export const Typo = ({ children, ml = 1, props }) => {
  return (
    <Typography
      component="p"
      ml={ml}
      sx={{ fontSize: { xs: 15, sm: 16 } }}
      {...props}
    >
      {children}
    </Typography>
  );
};
