import mongoose from "mongoose";

const DocumentObjectSchema = new mongoose.Schema(
  {
    renewDate: { type: String, required: true },
    expiryDate: { type: String, required: true },
    snoozedUntil: { type: String },
    pdf: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  { _id: false }
);

const vehicleSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: [true, "Please enter vehicle number"],
      unique: [true, "vehicle no already exist"],
    },
    tax: {
      type: DocumentObjectSchema,
      required: false,
    },
    pucc: {
      type: DocumentObjectSchema,
      required: false,
    },
    rc: {
      type: DocumentObjectSchema,
      required: false,
    },
    insurance: {
      type: DocumentObjectSchema,
      required: false,
    },
    fitness: {
      type: DocumentObjectSchema,
      required: false,
    },
    permit: {
      type: DocumentObjectSchema,
      required: false,
    },
    ownerID: {
      type: mongoose.Types.ObjectId,
      ref: "client",
    },
  },
  { timestamps: true }
);

export const Vehicle = mongoose.model("vehicle", vehicleSchema);
