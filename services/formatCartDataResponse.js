const formatProductsDataResponse = require("./formatProductsDataResponse");

const formatCartDataResponse = (cart) => {
    let data = {
        grand_total: cart.grand_total,
        items_total: cart.items_total,
        discount_amount: cart.discount_amount,
        cart: formatProductsDataResponse(cart.cart)
    };
    return data;
};

module.exports = formatCartDataResponse;