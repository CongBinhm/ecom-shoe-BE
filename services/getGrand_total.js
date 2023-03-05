const Grand_Total = (items) => {
    if(!items.length) return 0;
    let sum = 0;
    items.forEach((data) => {
         sum = sum + data.items_total * data.products.quantity;
    });
    return sum;
};

module.exports = Grand_Total;