const Product = require("../../models/product.model");

const deleteProductSize = async (req, res) => {
  try {
    const userId = req.user._id;
    const sizeId = req.params.sizeId;
    const productId = req.body.productId;
    const deleteProduct = await Product.findOne({
      _id: productId,
      userId: userId,
    });
    const indexDelete = deleteProduct.size.findIndex(
      (ele) => ele._id.toString() === sizeId.toString()
    );
    if (indexDelete === -1)
      return res
        .status(400)
        .json({ message: "Can't found this size in product" });
    deleteProduct.size.splice(indexDelete, 1);
    res.status(204).json({ message: "Delete size success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteProductSize;
