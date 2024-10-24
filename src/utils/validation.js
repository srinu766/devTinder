var validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("first name should be 4 - 50 characters");
  } else if (lastName.length < 4 || lastName.length > 50) {
    throw new Error("last name should be 4 - 50 characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFeilds = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((feild)=>
    allowedEditFeilds.includes(feild)
  )

  return isEditAllowed
};


module.exports = {
  validateSignUpData,
  validateEditProfileData
};

