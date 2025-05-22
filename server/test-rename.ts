import dotenv from "dotenv";
dotenv.config();

import cloudinary from "./src/utils/cloudinary";

const run = async () => {
  try {
    const from = "pending/gate_2023";
    const to = "approved/gate_2023";

    const result = await cloudinary.uploader.rename(from, to, {
      resource_type: "raw",
      overwrite: true,
    });

    console.log("✅ Rename success:", result);
  } catch (err: any) {
    console.error("❌ Rename failed:", err.message || err.error);
  }
};

run();
