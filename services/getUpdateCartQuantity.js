const getUpdateCartQuantity = (items) => {
    if(!items.length) return [0];
    newQuantity = items[0].quantity;
    items.forEach((data) => {
        newQuantity = data.quantity;
    });
    return [newQuantity];
}

module.exports = getUpdateCartQuantity;