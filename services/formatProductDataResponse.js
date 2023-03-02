const formatUserDataResponse = require("./formatUserDataResponse");

const formatProductDataResponse = (productData, needUser = 1) => {
  let data = {
    name: productData.name,
    description: productData.description,
    price: productData.price,
    original_price: productData.original_price,
    rating: productData.rating,
    stock: productData.stock,
    id: productData._id,
    size: productData.size,
  };
  if (needUser) data.user = formatUserDataResponse(productData.userId);
  return data;
};

module.exports = formatProductDataResponse;
