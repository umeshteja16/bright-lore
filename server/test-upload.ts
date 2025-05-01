import dotenv from "dotenv";
import mongoose from "mongoose";
import cloudinary from "./src/utils/cloudinary";
import fs from "fs";
import path from "path";
import Paper from "./src/models/Paper";

dotenv.config();

// MongoDB Connection
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables.");
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// File list with explicit year mapping
const papers = [{ title: "Jee Advanced 2017 Paper 3", year: 2018 }];

const folderPath = "S:/Papers"; // Adjust if needed

// Upload function
const uploadFile = async (filePath: string, title: string, year: number) => {
  try {
    console.log(`📤 Uploading: ${title}`);

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",
      folder: "papers/approved", // Organized folder structure
      public_id: title.replace(/\s+/g, "_").toLowerCase() + ".pdf",
    });

    const newPaper = new Paper({
      title,
      imageLink: "src/assets/exams/jeeadv.png", // Placeholder for thumbnails
      fileId: result.public_id,
      year,
      uploadedAt: new Date(),
    });

    await newPaper.save();
    console.log(`✅ Uploaded & saved: ${title}`);
  } catch (error) {
    console.error(`❌ Failed to upload ${title}:`, error);
  }
};

// Process all files
const processFiles = async () => {
  for (const paper of papers) {
    const filePath = path.join(folderPath, `${paper.title}.pdf`);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ File not found: ${filePath}`);
      continue;
    }

    await uploadFile(filePath, paper.title, paper.year);
  }

  console.log("🎉 All files processed!");
  mongoose.connection.close();
};

processFiles();
