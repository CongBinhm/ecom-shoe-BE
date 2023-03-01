const formatProductDataResponse = (productData) => {
  return {
    name: productData.name,
    description: productData.description,
    price: productData.price,
    original_price: productData.original_price,
    rating: productData.rating,
    stock: productData.stock,
    id: productData._id,
    userID: productData.userId,
  };
};

module.exports = formatProductDataResponse;
