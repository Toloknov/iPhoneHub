import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: false },
    products: { type: Array, required: true },
    cityOrVillage: { type: String, required: true },
    department: String,
    street: String,
    house: String,
    apartment: String,
    floor: String,
    lift: String,
    data: String,
    time: String,
    phone:String
  },
  {
    timestamps: true,
  }
);

export default model("Basket", schema);
