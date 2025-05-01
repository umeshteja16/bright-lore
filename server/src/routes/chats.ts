import { Router, Request, Response } from "express";
import {
  uploadToGemini,
  waitForFilesActive,
  generationConfig,
  model,
} from "./gemini";
import mimeTypes from "mime-types";
import fs from "node:fs";
import axios from "axios";

const chats = Router();
let uploadedFiles: { name: string; uri: string }[] = [];

const FileUpload = async (url: string, localPath: string) => {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  fs.writeFileSync(localPath, response.data);
  const files = [await uploadToGemini(localPath, "application/pdf")];
  await waitForFilesActive(files);
  return files;
};

// Start chat
chats.post("/start-chat", async (req: Request, res: Response): Promise<any> => {
  try {
    const url = req.body.url;
    uploadedFiles = await FileUpload(url, "uploads/temp.pdf");
    return res.status(200).json({
      message: "file uploaded successfully",
      error: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong on the server" });
  }
});

// Continue chatting
chats.post("/chatting", async (req: Request, res: Response): Promise<any> => {
  const chatSession = model.startChat({ generationConfig, history: [] });
  try {
    const text = req.body.text;
    const prompt = `
You are **BrightLoreGPT**, a smart academic assistant designed for helping with education, exam preparation, and conceptual understanding.

### 🔍 Rules for Generating Output:
- Only respond to **academic, subject-based queries** (Math, Science, Programming explanations, Literature, etc.)
- Do NOT write any HTML/JSON/JSX
- Always use clear, structured **Markdown** with LaTeX math using:
  - Inline math: \( ... \)
  - Block math:
\[...math here...\]

- Never wrap math inside triple backticks
- Ensure clean, accurate LaTeX output that renders inside markdown renderers (like ReactMarkdown + rehype-katex)

### 🎯 Output Format:

## 🧠 Problem Statement
Restate the user’s input.

---

## 🔍 Step-by-step Solution

### ➤ Step 1: [Title for step 1]
Explain with steps and LaTeX:
\[...math here...\]

### ➤ Step 2: [Next step]
Further explanation.

---

## 📐 Final Calculation or Summary
Summarize important findings.

---

## ✅ Final Answer
with relevant math, symbols with option if any 


Return clean Markdown only.
No code blocks or backticks.
No JSON. No HTML. No JSX.

🔍 User Query: ${text}
`;

    const result = await chatSession.sendMessage([
      {
        fileData: {
          fileUri: uploadedFiles[0].uri,
          mimeType: "application/pdf",
        },
      },
      { text: prompt },
    ]);

    const candidates = result.response.candidates ?? [];
    candidates.forEach((candidate, candidateIndex) => {
      candidate.content.parts.forEach((part, partIndex) => {
        if (part.inlineData) {
          try {
            const filename = `output_${candidateIndex}_${partIndex}.${mimeTypes.extension(
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
      });
    });

    // Extract raw text
    const raw = result.response.text().trim();
    // ✅ Extract raw text from Gemini
    let finalMessage = result.response.text().trim();

    // ✅ Optional: Parse JSON if needed
    try {
      const parsed = JSON.parse(finalMessage);
      if (parsed?.message) finalMessage = parsed.message;
    } catch (_) {}

    finalMessage = finalMessage.replace(
      /\\boxed{([^}]*)}/g,
      (_, expr) => `\\[\\boxed{${expr}}\\]`
    );

    // ✅ Add line breaks after headers and separators for better spacing
    finalMessage = finalMessage
      .replace(/^(#+ .+)/gm, "\n$1\n") // headers
      .replace(/---/g, "\n---\n") // section dividers
      .replace(/\n{2,}/g, "\n\n"); // collapse excess blank lines

    return res.status(200).json({ message: finalMessage });
  } catch (err) {
    console.log(err);
    return res.status(505).json({
      message: "Some Chatting Error Occurred..",
      error: true,
    });
  }
});

export default chats;
