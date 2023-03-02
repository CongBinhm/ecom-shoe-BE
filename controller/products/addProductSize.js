const Product = require("../../models/product.model");
const formatProductDataResponse = require("../../services/formatProductDataResponse");
const getLimitPrice = require("../../services/getLimitPrice");

const addSizeProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.body.productId;
    const sizeData = req.body.sizeData;
    const { name, price, original_price, stock, product_img } = sizeData;
    const updateProduct = await Product.findOne({
      _id: productId,
      userId: userId,
    });
    if (updateProduct === null)
      return res.status(404).json({ message: "Can't find product" });
    if (updateProduct.size.findIndex((ele) => ele.name === name) !== -1)
      return res
        .status(400)
        .json({ message: "Size name already exist in product" });
    updateProduct.size.push({
      name,
      price,
      original_price,
      stock,
      product_img,
    });
    const [min_price, max_price, total_stock] = getLimitPrice(
      updateProduct.size
    );
    updateProduct.min_price = min_price;
    updateProduct.max_price = max_price;
    updateProduct.stock = total_stock;
    await updateProduct.save();
    res.status(200).json({
      message: "Add product size success",
      data: formatProductDataResponse(updateProduct, 0),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = addSizeProduct;
