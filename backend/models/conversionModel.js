import mongoose from "mongoose";
import Message from "./messageModel.js";
import User from "./userModel.js";

const conversionSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Message,
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Conversion = mongoose.model('Conversion',conversionSchema);

export default Conversion;