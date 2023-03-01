const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    grand_total: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    discount_amount: { type: Number, required: true },
    products: [
      {
        product: { type: Object, required: true },
        quantity: { type: Number, required: true },
        selected: { type: Boolean, required: true },
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { collection: "order" }
);

module.exports = mongoose.model("Order", orderSchema);
