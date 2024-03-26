import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    series: { type: String, required: true },
    colors: [{ type: Schema.Types.ObjectId, ref: "Color" }],
    built_inMemory: [{ type: Schema.Types.ObjectId, ref: "BuiltInMemory" }],
    generalCharacteristics: Object,
    communicationStandard: String,
    display: Object,
    SIMCards: Object,
    operatingSystem: String,
    frontCamera: Object,
    CPU: Object,
    mainCamera: Object,
    housingMaterials: String,
    connectors: String,
    navigation: String,
    dimensions: Object,
    additionally: Object,
  },
  {
    timestamps: true,
  }
);

export default model("CharacteristicsIphone", schema);
