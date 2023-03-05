const formatProductDataResponse = require("./formatProductDataResponse");

const formatCartDataResponse = (cart) => {
  let data = {
    id: cart.id,
    grand_total: cart.grand_total,
    items_total: cart.items_total,
    discount_amount: cart.discount_amount,
    products: cart.products.map((data) => ({
      id: data.id,
      quantity: data.quantity,
      size_id: data.size_id,
      selected: data.selected,
      product: formatProductDataResponse(data.product, 0),
    })),
  };
  return data;
};

module.exports = formatCartDataResponse;
