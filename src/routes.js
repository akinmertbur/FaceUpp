// src/routes.js
import userRoutes from "./presentation/routes/userRoutes.js";

export const configureRoutes = (app) => {
  app.use("/api/users", userRoutes);
};
