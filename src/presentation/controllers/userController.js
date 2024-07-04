import { addUser } from "../../business/services/userService.js";

const createUser = async (req, res) => {
  try {
    const user = await addUser(req.body);
    res.status(201).redirect("/");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createUser };
