import User from "../models/userModel.js";
import Photo from "../models/photoModel.js";
import Like from "../models/likeModel.js";
import Comment from "../models/commentModel.js";
import Follow from "../models/followModel.js";

// User and Photo: One-to-Many
User.hasMany(Photo, { foreignKey: "userId" });
Photo.belongsTo(User, { foreignKey: "userId" });

// User and Like: One-to-Many
User.hasMany(Like, { foreignKey: "userId" });
Like.belongsTo(User, { foreignKey: "userId" });

// Photo and Like: One-to-Many
Photo.hasMany(Like, { foreignKey: "photoId" });
Like.belongsTo(Photo, { foreignKey: "photoId" });

// User and Comment: One-to-Many
User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

// Photo and Comment: One-to-Many
Photo.hasMany(Comment, { foreignKey: "photoId" });
Comment.belongsTo(Photo, { foreignKey: "photoId" });

// User and Follow: Many-to-Many (Self-referential)
User.belongsToMany(User, {
  as: "Followers",
  through: Follow,
  foreignKey: "followedId",
});
User.belongsToMany(User, {
  as: "Following",
  through: Follow,
  foreignKey: "followerId",
});
