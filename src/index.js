"use strict";
import express from "express";
import { connectDB } from "./data/database/dbConfig.js";
import userRoutes from "./presentation/routes/userRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Directory __dirname replacement
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set view engine
app.set("views", path.join(__dirname, "presentation", "views"));
app.set("view engine", "ejs");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

connectDB();

app.get("/", (req, res) => res.render("index"));

app.listen(port, () => console.log(`Server running on port ${port}`));
