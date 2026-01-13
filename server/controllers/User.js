import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/User.js";
import Workout from "../models/Workout.js";

dotenv.config();

/* ============================
   REGISTER USER
============================ */
export const UserRegister = async (req, res, next) => {
  try {
    const { name, email, password, img } = req.body;

    if (!name || !email || !password)
      return next(createError(400, "All fields are required"));

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return next(createError(409, "Email already exists"));

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      img,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "7d",
    });

    const { password: _, ...userData } = user._doc;

    res.status(201).json({ token, user: userData });
  } catch (err) {
    next(err);
  }
};

/* ============================
   LOGIN USER
============================ */
export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(createError(400, "Email and password required"));

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(createError(404, "User not found"));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(createError(401, "Invalid credentials"));

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "7d",
    });

    const { password: _, ...userData } = user._doc;

    res.status(200).json({ token, user: userData });
  } catch (err) {
    next(err);
  }
};

/* ============================
   USER DASHBOARD
============================ */
export const getUserDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const today = new Date();
    const start = new Date(today.setHours(0, 0, 0, 0));
    const end = new Date(today.setHours(23, 59, 59, 999));

    const workouts = await Workout.find({
      user: userId,
      date: { $gte: start, $lte: end },
    });

    const totalCalories = workouts.reduce(
      (sum, w) => sum + w.caloriesBurned,
      0
    );

    const totalWorkouts = workouts.length;
    const avgCaloriesBurntPerWorkout = totalWorkouts > 0 ? Math.round(totalCalories / totalWorkouts) : 0;

    const categoryData = await Workout.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$category",
          totalCalories: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    res.status(200).json({
      totalCaloriesBurnt: totalCalories,
      totalWorkouts,
      avgCaloriesBurntPerWorkout,
      categoryData,
    });
  } catch (err) {
    next(err);
  }
};

/* ============================
   GET WORKOUTS BY DATE
============================ */
export const getWorkoutsByDate = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const date = req.query.date ? new Date(req.query.date) : new Date();

    const start = new Date(date.setHours(0, 0, 0, 0));
    const end = new Date(date.setHours(23, 59, 59, 999));

    const workouts = await Workout.find({
      user: userId,
      date: { $gte: start, $lte: end },
    });

    const totalCalories = workouts.reduce(
      (sum, w) => sum + w.caloriesBurned,
      0
    );

    res.status(200).json({ workouts, totalCalories });
  } catch (err) {
    next(err);
  }
};

/* ============================
   ADD WORKOUT
============================ */
export const addWorkout = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { workoutString } = req.body;

    if (!workoutString)
      return next(createError(400, "Workout string is required"));

    const workouts = workoutString.split(";").map((w) => w.trim());

    const parsedWorkouts = [];

    for (const workout of workouts) {
      const parts = workout.split(",");
      if (parts.length < 4)
        return next(createError(400, "Invalid workout format"));

      const [category, name, reps, duration] = parts;

      const workoutData = {
        user: userId,
        category: category.trim(),
        workoutName: name.trim(),
        reps: parseInt(reps),
        duration: parseInt(duration),
        caloriesBurned: parseInt(duration) * 5,
      };

      parsedWorkouts.push(workoutData);
    }

    await Workout.insertMany(parsedWorkouts);

    res.status(201).json({
      message: "Workout added successfully",
      workouts: parsedWorkouts,
    });
  } catch (err) {
    next(err);
  }
};
