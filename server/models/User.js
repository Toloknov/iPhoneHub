import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    googleId: { type: String },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    telephone: { type: String },
    image: { type: String },
    password: { type: String },
    isActivated: { type: String, default: false },
    activationLink: { type: String },
  },
  {
    timestamps: true,
  }
);

export default model("User", schema);
