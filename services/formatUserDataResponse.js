const formatUserDataResponse = (userData) => {
  return {
    id: userData.id,
    email: userData.email,
    role: userData.role,
    first_name: userData.first_name,
    last_name: userData.last_name,
    phone_number: userData.phone_number,
  };
};

module.exports = formatUserDataResponse;
