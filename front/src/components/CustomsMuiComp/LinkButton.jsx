import { Button } from "@mui/material";

export const LinkButton = ({ children, onClick }) => {
  return (
    <Button
      variant="contained"
      size="large"
      sx={{
        display: "block",
        fontSize: "0.7rem",
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
