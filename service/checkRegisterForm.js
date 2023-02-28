const validator = require("validator");

const checkRegisterForm = ({ data }) => {
  const { password, email, avatar_image, phone_number } = data;
  const message = [];
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      returnScore: false,
    })
  )
    message.push(
      "Password length must be longer than 8, have 1 uppercase, 1 lowercase and 1 number!"
    );
  if (!validator.isEmail(email)) message.push("Email not correct type!");
  if (!validator.isMobilePhone(phone_number))
    message.push("Phone number not correct type");
};
