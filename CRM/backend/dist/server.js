"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const imovelRoutes_1 = __importDefault(require("./routes/imovelRoutes"));
const clienteRoutes_1 = __importDefault(require("./routes/clienteRoutes"));
const condominioRoutes_1 = __importDefault(require("./routes/condominioRoutes"));
const atendimentoRoutes_1 = __importDefault(require("./routes/atendimentoRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware para analisar o corpo das requisições em JSON
// Middleware para aumentar o limite de tamanho de upload
app.use(express_1.default.json({ limit: "10mb" })); // Para requisições JSON
app.use(express_1.default.urlencoded({ limit: "10mb", extended: true })); // Para requisições URL-encoded
// Middleware para habilitar CORS e permitir comunicações cross-origin
app.use((0, cors_1.default)());
// Inicializar o Passport
app.use(passport_1.default.initialize());
const passport_2 = __importDefault(require("./config/passport"));
(0, passport_2.default)(passport_1.default); // Configurar Passport para JWT
// Conectar ao MongoDB
mongoose_1.default
    .connect(process.env.MONGODB_URI || "")
    .then(() => console.log("Conectado ao MongoDB Atlas com sucesso"))
    .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));
// Usar as rotas de autenticação
app.use("/api/auth", authRoutes_1.default);
// Usar as rotas de Imóveis
app.use("/api/imoveis", imovelRoutes_1.default);
// Usar as rotas de Atendimentos
app.use("/api/atendimentos", atendimentoRoutes_1.default);
// Usar as rotas de Clientes
app.use("/api/clientes", clienteRoutes_1.default);
// Usar as rotas de Condomínios
app.use("/api/condominios", condominioRoutes_1.default);
// Rota principal
app.get("/", (req, res) => {
    res.send("API funcionando");
});
// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
