const formatProductDataResponse = require("./formatProductDataResponse");

const formatCartDataResponse = (cart) => {
  let items_total = 0;
  let formatData = {
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
  formatData.products = formatData.products.map((data) => {
    data.size = data.product.size.find((ele) => ele.id === data.size_id);
    items_total += data.size.price * data.quantity;
    return data;
  });
  formatData.items_total = items_total;
  formatData.grand_total = items_total - formatData.discount_amount;
  return formatData;

  return data;
};

module.exports = formatCartDataResponse;
