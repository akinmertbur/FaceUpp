// src/utils/viewHelpers.js

import { cleanUpLocalFiles } from "../business/services/photoService.js";
import { error } from "./logger.js";

export const renderPageWithCleanup = async (res, view, data) => {
  try {
    res.render(view, data);
    cleanUpLocalFiles();
  } catch (err) {
    error(`Failed to render ${view}: ${err.message}`);
    res.status(500).json({ message: `Error rendering ${view}.` });
  }
};
