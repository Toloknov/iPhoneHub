import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    type: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

export default model("Type", schema);
