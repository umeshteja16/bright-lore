import express, { Request, Response } from "express";
import cors from "cors";
import paperRoutes from "./routes/papers";
import chatRoutes from "./routes/chats";
const app = express();

import dotenv from "dotenv";
import connectDB from "./config/db";
dotenv.config();
app.use(cors({ origin: "http://localhost:5173" })); // Allow CORS for specific origins
const port = process.env.PORT || 3000; // Default to port 3000 if PORT is undefined

app.use(express.json());
import { cleanupOldUploads } from "./utils/cleanup";

cleanupOldUploads(); // Cleanup old uploads on server start
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/keep-me-alive", (req: Request, res: Response) => {
  res.send("I'm alive, don't ping me again");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
const DB = connectDB();

// Routes
app.use("/api/papers", paperRoutes);
app.use("/api/chats", chatRoutes);

app.use("/uploads", express.static("uploads")); // ✅ Serve PDFs



export default app;
