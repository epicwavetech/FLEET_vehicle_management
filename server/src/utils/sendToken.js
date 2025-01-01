import jwt from "jsonwebtoken";

export const sendToken = (res, admin) => {
  const token = jwt.sign({ _id: admin._id }, `${process.env.JWT_SECRET}`, {
    expiresIn: "10d",
  });

  const options = {
    expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
    httpOnly: process.env.NODE_ENV === "production", // Cookie is not accessible via JavaScript
    secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Helps prevent CSRF attacks
  };
  // console.log(token);

  return res
    .cookie("token", token, options)
    .status(200)
    .json({
      success: true,
      message: `Welcome back ${admin.name}`,
      admin,
      token,
    });
};
