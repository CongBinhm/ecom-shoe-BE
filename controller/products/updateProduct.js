const Product = require("../../models/product.model");
const formatProductDataResponse = require("../../services/formatProductDataResponse");

const updateProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;
    const { name, description, price, original_price, stock, rating } =
      req.body;
    const oldProduct = await Product.findOne({
      _id: productId,
      userId: userId,
    });
    await Product.findOneAndUpdate(
      { _id: productId, userId: userId },
      {
        name: Boolean(name) ? name : oldProduct.name,
        description: Boolean(description)
          ? description
          : oldProduct.description,
        price: Boolean(price) ? price : oldProduct.price,
        original_price: Boolean(original_price)
          ? original_price
          : oldProduct.original_price,
        stock: Boolean(stock) ? stock : oldProduct.stock,
        rating: Boolean(rating) ? rating : oldProduct.rating,
      }
    );
    res.status(200).json({
      message: "Update product success",
      data: formatProductDataResponse(
        await Product.findOne({
          _id: productId,
          userId: userId,
        })
      ),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateProduct;
