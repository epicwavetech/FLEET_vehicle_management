import { enterAdmin, loginUser } from "../controllers/authController.js";
import express from "express";
import { isTokenPresent } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", loginUser);

router.get("/login-check", isTokenPresent);

router.post("/enter-admin", enterAdmin);

export default router;
