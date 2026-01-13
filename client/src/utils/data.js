import {
  FitnessCenterRounded,
  LocalFireDepartmentRounded,
  TimelineRounded,
} from "@mui/icons-material";

export const counts = [
  {
    name: "Calories Burned",
    icon: <LocalFireDepartmentRounded sx={{ fontSize: 26 }} />,
    description: "Total calories burned today",
    dataKey: "totalCaloriesBurnt",
    unit: "kcal",
    color: "#eb9e34",
    lightColor: "#FDF4EA",
  },
  {
    name: "Workouts",
    icon: <FitnessCenterRounded sx={{ fontSize: 26 }} />,
    description: "Total workouts completed",
    dataKey: "totalWorkouts",
    unit: "",
    color: "#41C1A6",
    lightColor: "#E8F6F3",
  },
  {
    name: "Avg Calories",
    icon: <TimelineRounded sx={{ fontSize: 26 }} />,
    description: "Average calories per workout",
    dataKey: "avgCaloriesBurntPerWorkout",
    unit: "kcal",
    color: "#FF9AD5",
    lightColor: "#FEF3F9",
  },
];
