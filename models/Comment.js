import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    productId: { type: Schema.Types.ObjectId, ref: "Iphone" },
    text: { type: String, require: true },
    rating: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);

export default model("Comment", schema);
