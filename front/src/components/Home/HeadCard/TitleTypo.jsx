import { Typography } from "@mui/material";

export const TitleTypo = ([text, tag, size]) => {
  return (
    <Typography component={tag} fontSize={size}>
      {text}
    </Typography>
  );
};
