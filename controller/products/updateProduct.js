const updateProduct = async (req, res) => {
  try {
    res.status(200).json({ message: "Update product success", data: {} });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateProduct;
