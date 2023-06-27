import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs/promises";
import config from "../db/config.js";

const s3 = new S3Client({ region: "us-east-1" });
const bucketName = config.s3_bucket_name;

export const UpdateProfilePhoto = async (req, res) => {
  try {
    const fileData = await fs.readFile(req.file.path);
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: req.file.originalname,
      Body: fileData,
    });
    const response = await s3.send(command);

    res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error uploading file" });
  } finally {
    try {
      // Delete the temporary file
      await fs.unlink(req.file.path);
    } catch (error) {
      console.error("Error deleting temporary file:", error);
    }
  }
};
