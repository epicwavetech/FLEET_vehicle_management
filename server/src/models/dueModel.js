import mongoose from "mongoose";

// Schema for individual due entry
const dueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount must be a positive number"],
    },
    reason: {
      type: String,
      required: [true, "Reason is required"],
    },
    status: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    paidDate: {
      type: Date,
      default: null, // Set when the entry is marked as paid
    },
  },
  { timestamps: true }
);

export const Due = mongoose.model("due", dueSchema);
