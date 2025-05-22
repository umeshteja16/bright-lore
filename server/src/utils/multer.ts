// src/utils/multer.ts
import multer from "multer";
const storage = multer.memoryStorage(); // store in memory
export default multer({ storage });
