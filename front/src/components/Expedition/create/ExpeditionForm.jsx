import Box from "@mui/material/Box";

export const ExpeditionForm = ({ children, onSubmit }) => {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        flexWrap: "wrap",
        pt: 2,
        mb: 4,
        "& .MuiTextField-root": { m: 1 },
      }}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      {children}
    </Box>
  );
};
