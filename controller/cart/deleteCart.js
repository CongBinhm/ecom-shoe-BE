require("dotenv").config();

exports.deleteCartItem = async (req, res, next) => {
    const prodId = req.body.productId;
    try {
        result = req.user.removefromCart(prodId);
        return res.status(200).json({
            message: "Remove from cart"});
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}