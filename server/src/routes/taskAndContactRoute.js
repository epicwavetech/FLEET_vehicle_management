import express from "express";
import { isLogin } from "../middlewares/auth.js";
import {
  addContact,
  createTask,
  deleteContactById,
  deleteTaskById,
  getAllContacts,
  getAllTask,
} from "../controllers/taskAndContactController.js";

const router = express.Router();

//<========================FOR TASK================================>
router.post("/create-task", isLogin, createTask);
router.get("/get-all-task", isLogin, getAllTask);
router.delete("/delete-task/:id", isLogin, deleteTaskById);

//<=============================FOR CONTACT INFO=========================>
router.post("/add-contact", isLogin, addContact);
router.get("/get-all-contact", isLogin, getAllContacts);
router.delete("/delete-contact/:id", isLogin, deleteContactById);

export default router;
