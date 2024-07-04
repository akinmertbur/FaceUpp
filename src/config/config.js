import dotenv from "dotenv";

dotenv.config();

export const config = {
  databaseURL: process.env.DATABASE_URL,
  port: process.env.PORT || 3000,
};
