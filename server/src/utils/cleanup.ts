// backend/utils/cleanup.ts
import fs from "fs";
import path from "path";

/**
 * Deletes uploads/temp.pdf if it is older than 24 hours.
 */
export function cleanupOldUploads() {
  const filePath = path.join(__dirname, "..", "uploads", "temp.pdf");

  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const lastModified = new Date(stats.mtime);
    const now = new Date();
    const ageInHours = (now.getTime() - lastModified.getTime()) / (1000 * 60 * 60);

    if (ageInHours > 24) {
      fs.unlinkSync(filePath);
      console.log("🧹 Deleted old temp.pdf");
    } else {
      console.log(`ℹ️ temp.pdf is ${ageInHours.toFixed(2)} hours old — not deleted`);
    }
  }
}
