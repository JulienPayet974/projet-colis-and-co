import Box from '@mui/material/Box';

export const SearchForm = ({ children, onSubmit }) => {
  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        pt: 2,
        mb: 4,
        '& .MuiTextField-root': { m: 1 },
      }}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      {children}
    </Box>
  );
};
