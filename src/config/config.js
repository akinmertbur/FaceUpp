import dotenv from "dotenv";

dotenv.config();

export const config = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
  },
  test: {
    url: process.env.DATABASE_URL_TEST,
    dialect: "postgres",
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
  },
  databaseURL: process.env.DATABASE_URL,
  port: process.env.PORT || 3000,
  sessionSecret: process.env.SESSION_SECRET,
};

export default config;
