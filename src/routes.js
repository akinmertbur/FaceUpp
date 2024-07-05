// src/routes.js
import authRoutes from "./presentation/routes/authRoutes.js";
import userRoutes from "./presentation/routes/userRoutes.js";
import viewRoutes from "./presentation/routes/viewRoutes.js";

export const configureRoutes = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/", viewRoutes); // Add view routes
};
