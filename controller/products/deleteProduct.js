const Product = require("../../models/product.model");

const updateProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;
    const deleteProduct = await Product.findByIdAndDelete({
      _id: productId,
      userId: userId,
    });
    res.status(204).json({ message: "Delete product success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateProduct;
