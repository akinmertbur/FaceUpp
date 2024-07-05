import { DataTypes } from "sequelize";
import sequelize from "../database/dbConfig.js";

const Photo = sequelize.define(
  "Photo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caption: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
  }
);

export default Photo;
