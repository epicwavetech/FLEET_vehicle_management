import { Admin } from "../models/adminModel.js";
import { sendToken } from "../utils/sendToken.js";

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Enter all fields",
      });
    }

    const admin = await Admin.findOne({ email, password });

    if (!admin) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    sendToken(res, admin);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export const enterAdmin = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    const admin1 = await Admin.create({
      email,
      name,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "admin data entered successfully",
      admin1,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const logoutUser = (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: process.env.NODE_ENV === "production", // Cookie is not accessible via JavaScript
        secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      })
      .json({
        success: true,
        message: "Logout successfully",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};
