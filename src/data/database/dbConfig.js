// src/data/database/dbConfig.js
import { Sequelize } from "sequelize";
import { config } from "../../config/config.js";

const sequelize = new Sequelize(config.databaseURL, {
  dialect: "postgres",
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    await sequelize.sync({ force: false }); //force false will create the tables only if they do not exist.
    console.log("Database synchronized");
  } catch (error) {
    console.error("Database connection error", error);
    process.exit(1);
  }
};

export default sequelize;
