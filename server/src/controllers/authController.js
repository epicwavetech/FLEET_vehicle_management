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
    return res.status(500).json({ error: "dasda" });
  }
};
