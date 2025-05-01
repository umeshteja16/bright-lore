import mongoose from "mongoose";

const PaperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageLink: { type: String, required: true }, // Thumbnail Image
  fileId: { type: String, required: true }, // Cloudinary File ID
  year: { type: Number, required: true },
  keyPaper: { type: Boolean, default: false },
  keyPaperLink: { type: String, required: false },
  uploadedAt: { type: Date, default: Date.now },
});

// ✅ Text Index for fast title-based search
PaperSchema.index({ title: "text" });

// ✅ Index for fast sorting by year (descending)
PaperSchema.index({ year: -1 });

const Paper = mongoose.model("Paper", PaperSchema);
export default Paper;
