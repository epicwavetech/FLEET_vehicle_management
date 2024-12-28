import { Contact } from "../models/contactModel.js";
import Task from "../models/taskModel.js";

//<=======================================TASK FUNCTIONS===================================================>
export const createTask = async (req, res, next) => {
  try {
    const { task } = req.body;

    if (!task) {
      return res
        .status(400)
        .json({ success: false, message: "Task is required" });
    }

    const newTask = new Task({ task });
    await newTask.save();

    res.status(201).json({
      success: true,
      message: "Task created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllTask = async (req, res) => {
  try {
    let tasks = [];
    tasks = await Task.find();
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//<===============================================CONTACT INFO===========================================>
export const addContact = async (req, res) => {
  try {
    const { name, contactNumber } = req.body;
    console.log(name, contactNumber);

    // Check if name and contact number are provided
    if (!name || !contactNumber) {
      return res.status(400).json({
        success: false,
        message: "Name and contact number are required",
      });
    }

    // Validate that contactNumber is a 10-digit number
    const isValidContactNumber = /^\d{10}$/.test(contactNumber);
    console.log(isValidContactNumber);
    if (!isValidContactNumber) {
      return res.status(400).json({
        success: false,
        error: "Contact number must be a 10-digit number",
      });
    }

    const contact = new Contact({ name, contactNumber });
    await contact.save();

    res.status(201).json({
      success: true,
      message: "Contact added successfully",
      contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error adding contact",
      error: error.message,
    });
  }
};

// Get all contacts
export const getAllContacts = async (req, res) => {
  try {
    let contacts = [];
    contacts = await Contact.find();

    res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching contacts",
      error: error.message,
    });
  }
};

// Delete contact by ID
export const deleteContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting contact",
      error: error.message,
    });
  }
};
