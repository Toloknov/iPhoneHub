import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId },
    series: { type: String, required: true },
    type: { type: Schema.Types.ObjectId, ref: "Type" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    color: { type: [Schema.Types.ObjectId], ref: "Color" },
    built_inMemory: { type: Schema.Types.ObjectId, ref: "BuiltInMemory" },
    amount: { type: Number, required: true },
    characteristicsIphone: {
      type: Schema.Types.ObjectId,
      ref: "CharacteristicsIphone",
    },
    price: { type: String, required: true },
    discountedPrice: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("Phone", schema);
