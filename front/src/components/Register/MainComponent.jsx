import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/utils/context/auth";

import { Button, Typography, Box, Stack, Alert } from "@mui/material";
import { TextField, Autocomplete, FormControl } from "@mui/material";
import { useMediaQuery, InputLabel, OutlinedInput } from "@mui/material";
import { InputAdornment, IconButton, FormHelperText } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import { ConnexionBox } from "@/components/Connexion/ConnexionBox";
import { ResponsiveTextField } from "@/components/CustomsMuiComp/ResponsiveTextField";
import { connexionDataValidation } from "@/components/Register/connexionDataValidation";

export const MainComponent = () => {
  const [serverDataErrors, setServerDataErrors] = useState(false);
  const [connexionToServerErrors, setConnexionToServerErrors] = useState(false);
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  // handle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (e) => {
    e.preventDefault();
  };

  // hangle Input changes
  const [values, setValues] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    first_name: "",
    last_name: "",
    address: "",
    zipcode: "",
    city: "",
    birth_date: "",
    phone_number: "",
  });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrorDataValidation((c) => (c = false));
  };

  // handle password confirmation
  const [dataErrors, setDataErrors] = useState(null);
  const handlePwdChange = (e) => {
    if (e.target.value && values.password !== e.target.value) {
      setDataErrors(true);
    } else setDataErrors(false);
  };

  // handle form submit with Data Validation
  const [errorDataValidation, setErrorDataValidation] = useState(null);
  const handleForm = async (e) => {
    setErrorDataValidation(connexionDataValidation(values));
    if (Object.keys(errorDataValidation).length !== 0) {
      return;
    }
    try {
      //*********************************** PROD *******************************/
      const bodyRequest = JSON.stringify({
        email: values.email,
        password: values.password,
        first_name: values.first_name,
        last_name: values.last_name,
        address: values.address,
        zipcode: values.zipcode,
        birth_date: values.birth_date,
        phone_number: values.phone_number,
        city: values.city,
        carrier: true,
        identity_verified: true,
        role: "user",
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: bodyRequest,
        }
      );
      if (!response.ok) {
        const respData = await response.json();
        setServerDataErrors({
          status: response.status,
          message: respData.message,
        });
        return;
      }

      const respData = await response.json(); // extraire les données JSON de la réponse
      //*********************************** PROD *******************************/

      login(respData); // add user data to context and local storage
      router.push("/");
    } catch (error) {
      console.log(error);
      if (error.message === "Failed to fetch") {
        setConnexionToServerErrors(true);
      }
    }
  };

  // handle address input with gouvernment API
  const [addresses, setAddresses] = useState([]);
  const handleAddressInput = async (e) => {
    // handleChange(e);
    if (e.target.value?.length > 3) {
      try {
        const response = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${e.target.value}`
        );
        const data = await response.json();
        const formattedAddresses = data.features.map(
          (feature) => feature.properties
        );
        setAddresses(formattedAddresses);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleAddressSelection = (e, value) => {
    if (value === null) {
      return;
    }
    setValues({
      ...values,
      address: value.name,
      city: value.city,
      zipcode: value.postcode,
    });
  };

  return (
    <>
      <Typography component="h1" m={4} fontSize={32}>
        Inscription
      </Typography>
      {connexionToServerErrors && (
        <Alert variant="outlined" severity="error" sx={{ m: "1rem" }}>
          Problème de connexion au serveur, veuillez réessayer plus tard...
        </Alert>
      )}
      <Typography component="h5" fontSize={14} color="red">
        {dataErrors &&
          (dataErrors.email ||
            dataErrors.password ||
            dataErrors.password2 ||
            dataErrors.passwordConfirm ||
            dataErrors.zipcode)}
      </Typography>
      <Typography component="h5" fontSize={26} color="red">
        {serverDataErrors?.status === 409 && serverDataErrors?.message}
      </Typography>

      <ConnexionBox handleForm={handleForm}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Stack
            direction="column"
            m={1}
            sx={{ minWidth: "20rem", maxWidth: "30rem", width: "45%" }}
          >
            <ResponsiveTextField
              name="email"
              label="Email"
              onChange={handleChange}
              error={
                (errorDataValidation && !!errorDataValidation.email) ||
                serverDataErrors?.status === 409
              }
              helperText={errorDataValidation?.email && "Email incorrect"}
            />
            <FormControl
              sx={{ m: 1 }}
              variant="outlined"
              size={matches ? "small" : "normal"}
              error={
                errorDataValidation &&
                (!!errorDataValidation.password ||
                  !!errorDataValidation.password2)
              }
            >
              <InputLabel htmlFor="outlined-adornment-password" required>
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                onChange={handleChange}
              />
              <FormHelperText id="component-error-text">
                {(errorDataValidation?.password ||
                  errorDataValidation?.password2) &&
                  (errorDataValidation.password ||
                    errorDataValidation.password2)}
              </FormHelperText>
            </FormControl>
            <FormControl
              sx={{ m: 1 }}
              variant="outlined"
              size={matches ? "small" : "normal"}
              error={dataErrors}
            >
              <InputLabel htmlFor="outlined-adornment-password" required>
                Confirm password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-password"
                name="passwordConfirm"
                type={showConfirmPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm-Password"
                onChange={(e) => {
                  handlePwdChange(e);
                  handleChange(e);
                }}
              />
              <FormHelperText id="component-error-text">
                {dataErrors && "Mot de passe différent"}
              </FormHelperText>
            </FormControl>
            <ResponsiveTextField
              required
              label="Nom"
              name="first_name"
              placeholder="Nom"
              sx={{ maxWidth: "16rem" }}
              onChange={handleChange}
            />
            <ResponsiveTextField
              required
              label="Prénom"
              name="last_name"
              placeholder="Prénom"
              sx={{ maxWidth: "16rem" }}
              onChange={handleChange}
            />
          </Stack>
          <Stack
            direction="column"
            m={1}
            sx={{ minWidth: "20rem", maxWidth: "30rem", width: "45%" }}
          >
            <TextField
              required
              label="Date de naissance"
              name="birth_date"
              type="date"
              size={matches ? "small" : "normal"}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
            <ResponsiveTextField
              required
              label="Téléphone"
              name="phone_number"
              placeholder="Téléphone"
              type="tel"
              sx={{ maxWidth: "16rem" }}
              onChange={handleChange}
            />
            <Box>
              <Autocomplete
                id="address"
                size={matches ? "small" : "normal"}
                sx={{ mr: 1 }}
                options={addresses}
                onChange={handleAddressSelection}
                onInputChange={handleAddressInput}
                renderInput={(params) => (
                  <TextField
                    sx={{ width: "100%", pr: 1 }}
                    label="Adresse"
                    {...params}
                    name="address"
                    placeholder="1 Avenue des Champs-Elysée, 75008 PARIS"
                  />
                )}
              />
            </Box>
          </Stack>
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, width: 160, textAlign: "center" }}
        >
          Register
        </Button>
      </ConnexionBox>
    </>
  );
};
