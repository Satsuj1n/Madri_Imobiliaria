"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToS3 = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const uploadFileToS3 = (file) => {
    const fileExtension = path_1.default.extname(file.originalname);
    const fileName = `${(0, uuid_1.v4)()}${fileExtension}`;
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName, // Nome do arquivo no S3
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read", // Permite que o arquivo seja acessado publicamente via URL
    };
    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data.Location); // Retorna a URL pública do arquivo
            }
        });
    });
};
exports.uploadFileToS3 = uploadFileToS3;
