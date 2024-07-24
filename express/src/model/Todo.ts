import mongoose, { Document } from "mongoose";

interface ITodo extends Document {
title: string;
  description: string;
  status: string;
}

const todoSchema = new mongoose.Schema<ITodo>(
  {
    description: {
      type: String,
      required: true,
      trim: true 
    },

    status: {
      type: String,
      required: true,
      enum: ["To Do", "In Progress", "Done"],
    },

    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;