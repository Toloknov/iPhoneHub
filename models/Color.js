import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    color: { type: String, required: true },
    rgb: { type: String, required: true },
  }
);

export default model("Color", schema);
