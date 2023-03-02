require("dotenv").config();

const GetCart = async (req, res, next) => {
    const user = await req.user().populate('cart.products.product._id');
    try {
        if(!user) {
            const error = new Error('Nothing in cart.');
            error.statusCode = 404;
            throw error;
        }
        const products = user.cart;
        res.status(200).json({message: 'Fetch Cart successfully.', cart: products})
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
    }

}

module.exports = GetCart
