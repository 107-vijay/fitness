import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    workoutName: {
      type: String,
      required: true,
      trim: true,
    },
    sets: {
      type: Number,
      min: 1,
    },
    reps: {
      type: Number,
      min: 1,
    },
    weight: {
      type: Number,
      min: 0,
    },
    duration: {
      type: Number,
      min: 1,
    },
    caloriesBurned: {
      type: Number,
      min: 0,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Workout", WorkoutSchema);
