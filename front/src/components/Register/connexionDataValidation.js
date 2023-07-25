export const connexionDataValidation = (values) => {
  console.log("values", values);
  let error = {};
  const email_pattern =
    /^[a-zA-Z0-9.!#$%&''+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/;
  // const email_pattern = /^[^\s@]@[^\s@]+\.[^\s@]+$/;
  const password_pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const zipcode_pattern =
    /^(0[1-9]\d{3}|20[1-2]\d{2}|20300|[13-8]\d{4}|9[0-6]\d{3}|97[1-6]\d{2}|98[4678]\d{2}|9{5})$/;

  if (values.email === "") {
    error.email = "Veuillez renseigner votre email";
  }
  if (!email_pattern.test(values.email)) {
    error.email = "Veuillez renseigner un email valide";
  }
  if (values.password === "") {
    error.password = "Veuillez renseigner votre mot de passe";
  }
  if (!password_pattern.test(values.password)) {
    error.password2 =
      "Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial";
  }
  if (values.password !== values.passwordConfirm) {
    error.passwordConfirm = "Les mots de passe ne correspondent pas";
  }
  if (values.passwordConfirm === "") {
    error.passwordConfirm = "Veuillez confirmer votre mot de passe";
  }
  if (values.zipcode === "") {
    error.zipcode = "Veuillez renseigner un code postal";
  }
  if (!zipcode_pattern.test(values.zipcode)) {
    error.zipcode = "Veuillez renseigner un code postal valide";
  }
  console.log("error", error);
  return error;
};
