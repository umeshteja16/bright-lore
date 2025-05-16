import dotenv from "dotenv";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import fs from "node:fs";
import mimeTypes from "mime-types";

dotenv.config();
const apiKey = process.env.GEMINI_API_KEY || "some-key";
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseModalities: [],
  responseMimeType: "text/plain",
};

/**
 * Uploads the given file to Gemini.
 *
 * See https://ai.google.dev/gemini-api/docs/prompting_with_media
 */
export async function uploadToGemini(path: string, mimeType: string) {
  const uploadResult = await fileManager.uploadFile(path, {
    mimeType,
    displayName: path,
  });

  const file = uploadResult.file;
  console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
  return {
    name: file.name,
    uri: file.uri,
  };
}

/**
 * Waits for the given files to be active.
 *
 * Some files uploaded to the Gemini API need to be processed before they can
 * be used as prompt inputs. The status can be seen by querying the file's
 * "state" field.
 *
 * This implementation uses a simple blocking polling loop. Production code
 * should probably employ a more sophisticated approach.
 */
export async function waitForFilesActive(files: { name: any; uri: any }[]) {
  console.log("Waiting for file processing...");
  for (const file of files) {
    let current = await fileManager.getFile(file.name); // ✅ file.name is now guaranteed
    while (current.state === "PROCESSING") {
      process.stdout.write(".");
      await new Promise((resolve) => setTimeout(resolve, 10000));
      current = await fileManager.getFile(file.name);
    }
    if (current.state !== "ACTIVE") {
      throw new Error(`File ${file.name} failed to process`);
    }
  }
  console.log("...all files ready\n");
}

/**
 * Executes Gemini file upload, processing, and question prompt.
 */
export async function run() {
  // TODO Make these files available on the local file system
  // You may need to update the file paths
  const files = [await uploadToGemini("CS224S6.pdf", "application/pdf")];
  await waitForFilesActive(files);

  const chatSession = model.startChat({ generationConfig, history: [] });

  const result = await chatSession.sendMessage([
    {
      fileData: {
        fileUri: files[0].uri,
        mimeType: "",
      },
    },
    { text: "Explain 5th question from the uploaded PDF" },
  ]);

  console.log(result.response.text());

  // TODO: Following code needs to be updated for client-side apps.
  const candidates = result.response.candidates ?? [];
  for (
    let candidate_index = 0;
    candidate_index < candidates.length;
    candidate_index++
  ) {
    for (
      let part_index = 0;
      part_index < candidates[candidate_index].content.parts.length;
      part_index++
    ) {
      const part = candidates[candidate_index].content.parts[part_index];
      if (part.inlineData) {
        try {
          const filename = `output_${candidate_index}_${part_index}.${mimeTypes.extension(
            part.inlineData.mimeType
          )}`;
          fs.writeFileSync(
            filename,
            Buffer.from(part.inlineData.data, "base64")
          );
          console.log(`Output written to: ${filename}`);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  console.log(result.response.text());
}

// Optional: Uncomment to test directly
// run();
