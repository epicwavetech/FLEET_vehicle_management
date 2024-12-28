import mongoose from "mongoose";
import validator from "validator";

const clientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter client's first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter client's last name"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    dob: {
      type: String,
      required: [true, "Please enter client's dob"],
    },
    email: {
      type: String,
      required: [true, "Please enter client's email"],
      unique: [true, "email already exist"],
      validate: validator.isEmail,
    },
    contactNo: {
      type: String,
      required: [true, "Please enter client's contact number"],
      unique: [true, "contact number already exist"],
    },
    address: {
      type: String,
      required: [true, "Please enter client's address"],
    },
    panCard: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    adharCard: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    vehicles: [
      {
        vehicleNumber: {
          type: String,
        },
        id: {
          type: mongoose.Types.ObjectId,
          ref: "Vehicle",
        },
      },
    ],
  },
  { timestamps: true }
);

export const Client = mongoose.model("client", clientSchema);
