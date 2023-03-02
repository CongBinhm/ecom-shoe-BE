const Product = require("../../models/product.model");
const formatProductDataResponse = require("../../services/formatProductDataResponse");
const getLimitPrice = require("../../services/getLimitPrice");

const updateProductSize = async (req, res) => {
  try {
    const userId = req.user._id;
    const sizeId = req.params.sizeId;
    const productId = req.body.productId;
    const { price, original_price, product_img, stock, name } =
      req.body.sizeData;
    const updateProduct = await Product.findOne({
      _id: productId,
      userId: userId,
    });
    const indexUpdate = updateProduct.size.findIndex(
      (ele) => ele._id.toString() === sizeId.toString()
    );
    if (indexUpdate === -1)
      return res
        .status(400)
        .json({ message: "Can't found this size in product" });

    const oldData = updateProduct.size[indexUpdate];
    updateProduct.size[indexUpdate] = {
      _id: oldData._id,
      stock: stock || oldData.stock,
      price: price || oldData.price,
      original_price: original_price || oldData.original_price,
      name: name || oldData.name,
      product_img: product_img || oldData.product_img,
    };
    const [min_price, max_price, total_stock] = getLimitPrice(
      updateProduct.size
    );
    updateProduct.min_price = min_price;
    updateProduct.max_price = max_price;
    updateProduct.stock = total_stock;
    await updateProduct.save();
    res.status(200).json({
      message: "Update size success",
      data: formatProductDataResponse(updateProduct, 0),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateProductSize;
