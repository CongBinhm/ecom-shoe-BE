const User = require("../../models/user.model");
const formatCartDataResponse = require("../../services/formatCartDataResponse");

const updateCart = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const productId = req.params.id;
        const sizeId = req.params.sizeId;
        const {quantity} = req.body.cart.products;
        const newValue = {};
        if(Boolean(quantity)) newValue["cart.products.$.quantity"] = quantity;
        const updateValue = await User.findOneAndUpdate({
            userId: userId,
            "cart.products.product": productId,
            "cart.products.size_id": sizeId
        },
        {
            $set: newValue
        },
        {new: true}
        );
        res.status(200).json({
            message: "Updated cart successfully",
            data: formatCartDataResponse(updateValue)
        })
    } catch(error) {
        if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
    }
}

module.exports = updateCart;