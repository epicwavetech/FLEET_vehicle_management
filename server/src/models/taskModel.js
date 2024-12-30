import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    trim: true, // Removes leading and trailing whitespace
  },
  date: {
    type: Date, // Store the date as a proper Date object
  },
  time: {
    type: String, // Store time in "hh:mm AM/PM" format
    validate: {
      validator: function (value) {
        // Validate time format (hh:mm AM/PM)
        return /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/.test(value);
      },
      message: "Time must be in hh:mm AM/PM format",
    },
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
