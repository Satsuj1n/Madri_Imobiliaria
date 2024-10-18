import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadFileToS3 = (file: Express.Multer.File): Promise<string> => {
  const fileExtension = path.extname(file.originalname);
  const fileName = `${uuidv4()}${fileExtension}`;

  const params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName, // Nome do arquivo no S3
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read", // Permite que o arquivo seja acessado publicamente via URL
  };

  return new Promise((resolve, reject) => {
    s3.upload(
      params,
      (err: Error | null, data: AWS.S3.ManagedUpload.SendData) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Location); // Retorna a URL pública do arquivo
        }
      }
    );
  });
};
