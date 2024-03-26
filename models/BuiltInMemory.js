import { Schema, model } from "mongoose";

const schema = new Schema({
  memory: { type: String, required: true },
});

export default model("BuiltInMemory", schema);
