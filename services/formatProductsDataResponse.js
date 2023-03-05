const formatProductsDataResponse = (items) => {
    return items.map((data) => ({
        product: data._id,
        quantity: data.quantity,
        selected: data.selected
    }));
};

module.exports = formatProductsDataResponse;