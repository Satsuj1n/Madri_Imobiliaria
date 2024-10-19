import multer from "multer";

const storage = multer.memoryStorage(); // Armazena os arquivos na memória para enviar ao S3

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limite de tamanho de 5MB por imagem
});

export default upload;
