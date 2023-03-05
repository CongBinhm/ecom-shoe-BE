require("dotenv").config();

const AddCart = async (req, res, next) => {
    const prodId = req.body.productId;
    const sizeid = req.params.sizeId;
    try{
        const product = await product.findById(prodId);
        return req.user.addToCart(product, sizeid);
    } catch(error) {
        if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
    }
}

module.exports = AddCart;