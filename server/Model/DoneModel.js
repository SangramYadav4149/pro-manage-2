import mongoose from "mongoose";
const { Schema } = mongoose;

const doneSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    priority: { type: String, required: true },
    checklist: { type: Array, required: true, default: [] },
    dueDate: { type: String },
    pureDate: { type: String },
    creater: { type: String, required: true },
    colour: { type: String, required: true },
  },
  { timestamps: true }
);
const Done = mongoose.model("Done", doneSchema);
export default Done;
