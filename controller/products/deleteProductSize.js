const Product = require("../../models/product.model");
const getLimitPrice = require("../../services/getLimitPrice");

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
    const [min_price, max_price, total_stock] = getLimitPrice(
      deleteProduct.size
    );
    deleteProduct.min_price = min_price;
    deleteProduct.max_price = max_price;
    deleteProduct.stock = total_stock;
    deleteProduct.save();
    res.status(204).json({ message: "Delete size success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteProductSize;
