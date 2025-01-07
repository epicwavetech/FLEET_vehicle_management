import express from "express";
import {
  addVehicle,
  checkExpiryDate,
  getSingleClientVehicle,
  snoozeNotification,
  updateDocument,
  deleteVehicle
} from "../controllers/vehicleController.js";
import { isLogin } from "../middlewares/auth.js";
import { uploadVehicleDoc } from "../middlewares/multer.js";

const router = express.Router();

router.post("/add-vehicle", isLogin, uploadVehicleDoc, addVehicle);
router.put("/update-document", isLogin, uploadVehicleDoc, updateDocument);
router.put("/snooze-notification", snoozeNotification);
router.get("/check-expiry-date", isLogin, checkExpiryDate);
router.delete("/delete-vehicle/:vehicleId", isLogin, deleteVehicle);

//<========GET SINGLE CLIENT'S VEHICLE==============>
router.get("/single-client", isLogin, getSingleClientVehicle);

export default router;
