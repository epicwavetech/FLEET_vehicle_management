import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Contact name is required"],
      trim: true,
      maxlength: [100, "Contact name cannot exceed 100 characters"],
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      unique: true, // Ensure no duplicate contact numbers
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema);
