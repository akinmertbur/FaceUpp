import { insertPhoto } from "../../business/services/photoService.js";
import { log, error } from "../../utils/logger.js"; // Import the logger functions

const addPhoto = async (req, res) => {
  try {
    //console.log("req.body.userId:", req.body.userId);
    const photo = await insertPhoto(req.body);
    log(`Photo created with ID: ${photo.id}`); // Log a message when user is created
    res.status(201).redirect("/");
  } catch (err) {
    error(`Failed to create photo: ${err.message}`); // Log an error message if there's an exception
    res.status(500).json({ message: err.message });
  }
};

export { addPhoto };
