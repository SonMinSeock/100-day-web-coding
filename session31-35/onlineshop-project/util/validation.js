function isEmpty(value) {
  !value || value.trim() === "";
}

function userCredentialsAreValid(email, password) {
  return email && email.includes("@") && password && password.trim().length >= 6;
}

function userDetailValidation(email, password, name, street, postal, city) {
  return (
    userCredentialsAreValid(email, password) && !isEmpty(name) && !isEmpty(street) && !isEmpty(postal) && !isEmpty(city)
  );
}

function emailIsConfirmed(email, confirmEmail) {
  return email === confirmEmail;
}

module.exports = { userDetailValidation, emailIsConfirmed };
