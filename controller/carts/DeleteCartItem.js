
const DeleteCartItem = async(req, res, next) => {
        const userId = req.user._id;
        const sizeId = req.params.sizeId;
        try {
            const result = await req.user.removeFromCart(userId, sizeId);
            res.status(200).json({ message: "Delete Successfully" });
        } catch(error) {
            if (!error.statusCode) {
                error.statusCode = 500;
              }
              next(err);
        }
}

module.exports = DeleteCartItem;