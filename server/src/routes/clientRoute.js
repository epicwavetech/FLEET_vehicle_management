import express from "express";
import {
  addNewClient,
  deleteClient,
  getAllClients,
  searchClients,
} from "../controllers/clientController.js";
import { uploadCards } from "../middlewares/multer.js";
import { isLogin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add-client", isLogin, uploadCards, addNewClient);
router.get("/get-all-clients", isLogin, getAllClients);
router.get("/search-client", isLogin, searchClients);
router.delete("/delete-client", isLogin, deleteClient);

export default router;
