import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    trim: true, // Removes leading and trailing whitespace
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
