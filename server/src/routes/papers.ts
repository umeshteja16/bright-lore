// src/routes/papers.ts
import express from "express";
import cloudinary from "../utils/cloudinary";
import upload from "../utils/multer";
import Paper from "../models/Paper";

const router = express.Router();

// POST /api/papers/upload-form
router.post(
  "/upload-form",
  upload.single("file"),
  async (req: any, res: any) => {
    const file = req.file;
    const title = req.body.title;

    if (!file || !title) {
      return res.status(400).json({ error: "Missing file or title" });
    }

    try {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "papers",
          public_id:
            "pending/" + title.replace(/\s+/g, "_").toLowerCase() + ".pdf",
        },
        (error, result) => {
          if (error || !result) {
            return res
              .status(500)
              .json({ error: "Upload failed", detail: error });
          }
          //   console.log("✅ Uploaded:", result.public_id, result.resource_type);

          res.status(200).json({
            message: "Uploaded to Cloudinary successfully",
            cloudinaryUrl: result.secure_url,
            fileId: result.public_id,
          });
        }
      );

      stream.end(file.buffer);
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

router.post("/approve", async (req: any, res: any) => {
  if (!req.body) {
    return res.status(400).json({ error: "No request body provided" });
  }
  const {
    title,
    imageLink,
    fileId,
    keyPaper = false,
    keyPaperLink = "",
  } = req.body;

  if (!fileId || !title || !imageLink) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const approvedFileId = fileId.replace("pending/", "approved/");

    // Move the file in Cloudinary
    const moveResult = await cloudinary.uploader.rename(
      fileId,
      approvedFileId,
      {
        resource_type: "raw",
      }
    );

    // Save metadata to MongoDB
    const paper = await Paper.create({
      title,
      imageLink,
      fileId: moveResult.public_id, // now under /approved/
      keyPaper,
      keyPaperLink,
    });

    res.status(200).json({
      message: "Paper approved and saved",
      paper,
    });
  } catch (error) {
    console.error("Approval error:", error);
    res.status(500).json({ error: "Approval failed", detail: error });
  }
});

// Get Approved Papers
router.get("/approved", async (req, res) => {
  try {
    const approvedPapers = await Paper.find({});
    res.status(200).json({ papers: approvedPapers });
  } catch (error) {
    console.error("Fetch approved papers failed:", error);
    res.status(500).json({ error: "Failed to fetch approved papers" });
  }
});

router.get("/search", async (req: any, res: any) => {
  try {
    const { query } = req.query; // Get search term from query parameters

    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    // Search for papers where title contains the query (case-insensitive) or year matches
    const searchResults = await Paper.find({
      $or: [
        { title: { $regex: query, $options: "i" } }, // Case-insensitive title search
        { year: !isNaN(query) ? parseInt(query) : null }, // Year search (if it's a number)
      ],
    }).sort({ year: -1 }); // Sort results by year in descending order

    res.status(200).json({ papers: searchResults });
  } catch (error) {
    console.error("❌ Search failed:", error);
    res.status(500).json({ error: "Failed to search notes" });
  }
});

// router.post("/postpdf", async (req, res) => {

// });

export default router;
