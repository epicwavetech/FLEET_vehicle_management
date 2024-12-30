import { Contact } from "../models/contactModel.js";
import Task from "../models/taskModel.js";
import { Due } from "../models/dueModel.js";

//<=======================================TASK FUNCTIONS===================================================>
export const createTask = async (req, res, next) => {
  try {
    const { task, date, hours, minutes, period } = req.body;

    if (!task) {
      return res
        .status(400)
        .json({ success: false, message: "Task is required" });
    }

    // Default to current date if not provided
    const currentDate = new Date();
    const taskDate = date ? new Date(date) : currentDate;

    // Default to current time if hours and minutes are not provided
    let taskTime;
    if (hours && minutes && period) {
      taskTime = `${hours.padStart(2, "0")}:${minutes.padStart(
        2,
        "0"
      )} ${period}`;
    } else {
      const currentHours = currentDate.getHours();
      const currentMinutes = currentDate.getMinutes();
      const isPM = currentHours >= 12;
      const formattedHours = (currentHours % 12 || 12)
        .toString()
        .padStart(2, "0"); // Convert to 12-hour format
      const formattedMinutes = currentMinutes.toString().padStart(2, "0");
      const formattedPeriod = isPM ? "PM" : "AM";

      taskTime = `${formattedHours}:${formattedMinutes} ${formattedPeriod}`;
    }

    // Create a new task object
    const newTask = new Task({
      task,
      date: taskDate,
      time: taskTime,
    });

    await newTask.save();

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: newTask, // Return the newly created task
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
//<=============================================UPDATE TASK==========================================>
export const updateTaskDateTime = async (req, res, next) => {
  try {
    const { taskId } = req.params; // Get the task ID from route parameters
    const { date, hours, minutes, period, task } = req.body;
    // console.log(date, hours, minutes, period, task);

    if (!taskId) {
      return res
        .status(400)
        .json({ success: false, error: "Task ID is required" });
    }
    if (hours || minutes) {
      if (
        (hours && (!minutes || !period)) ||
        (minutes && (!hours || !period)) ||
        (period && (!hours || !minutes))
      ) {
        return res
          .status(400)
          .json({ success: false, error: "Incompelete date format" });
      }
    }

    // Fetch the task from the database
    const taskFound = await Task.findById(taskId);

    if (!taskFound) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    // Update the date if provided; otherwise, retain the existing date
    const taskDate = date ? new Date(date) : taskFound.date;

    // Update the time if hours, minutes, and period are provided; otherwise, retain the existing time
    let taskTime = taskFound.time;
    if (hours && minutes && period) {
      taskTime = `${hours.padStart(2, "0")}:${minutes.padStart(
        2,
        "0"
      )} ${period}`;
    }

    // console.log(time);
    // console.log(taskTime);
    // console.log(task.time);

    // Update the task fields
    taskFound.date = taskDate;
    taskFound.time = taskTime;
    if (task) {
      taskFound.task = task;
    }

    // Save the updated task to the database
    await taskFound.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      taskFound, // Return the updated task
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//<============================================GET ALL TASK=========================================>
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

//==================================DUE controllers=====================================
//<====================================add due======================================>
export const addDueEntry = async (req, res) => {
  try {
    const { name, amount, reason } = req.body;

    if (!name || !amount || !reason) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    let due = await Due.create({
      name,
      amount,
      reason,
      status: "unpaid",
    });

    return res.status(201).json({
      success: true,
      message: "Due entry added successfully",
      due,
    });
  } catch (error) {
    console.error("Error adding due entry:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

//<==============================update paid status===================================>
export const markAsPaid = async (req, res) => {
  try {
    const { entryId } = req.params;

    if (!entryId) {
      return res
        .status(400)
        .json({ success: false, error: "Entry ID is required" });
    }

    const due = await Due.findById(entryId);
    if (!due) {
      return res
        .status(404)
        .json({ success: false, error: "No due entries found" });
    }

    due.status = "paid";

    await due.save();

    return res.status(200).json({
      success: true,
      message: "Entry marked as paid successfully",
      due,
    });
  } catch (error) {
    console.error("Error marking entry as paid:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

//<=================================get all due================================>
export const getAllDue = async (req, res) => {
  try {
    const due = await Due.find();

    return res.status(200).json({
      success: true,
      due,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

//<=================================delete due===================================>
export const deleteDue = async (req, res) => {
  try {
    const { entryId } = req.params;

    const result = await Due.deleteOne({ _id: entryId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Due not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Due deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
