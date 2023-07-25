import Box from "@mui/material/Box";

export const ConnexionBox = ({ children, handleForm }) => {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        flexWrap: "wrap",
        pt: 2,
        mb: 4,
        "& .MuiTextField-root": { m: 1 },
      }}
      noValidate
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        handleForm(e);
      }}
    >
      {children}
    </Box>
  );
};
