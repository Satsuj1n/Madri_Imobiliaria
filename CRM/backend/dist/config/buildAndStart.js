"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const executeCommand = (command, args, directory) => {
    return new Promise((resolve, reject) => {
        const process = (0, child_process_1.spawn)(command, args, { cwd: directory, shell: true });
        process.stdout.on("data", (data) => {
            console.log(`stdout: ${data}`);
        });
        process.stderr.on("data", (data) => {
            console.error(`stderr: ${data}`);
        });
        process.on("close", (code) => {
            if (code === 0) {
                resolve();
            }
            else {
                reject(`Processo finalizado com o código de erro ${code}`);
            }
        });
    });
};
const executeCommandInBackground = (command, args, directory) => {
    const process = (0, child_process_1.spawn)(command, args, {
        cwd: directory,
        shell: true,
        detached: true,
    });
    process.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
    });
    process.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
    });
    process.unref(); // Permite que o processo continue rodando em segundo plano
};
// Função para verificar se a porta está sendo usada
const checkPortInUse = (port) => {
    return new Promise((resolve, reject) => {
        const command = process.platform === "win32"
            ? `netstat -ano | findstr :${port}`
            : `lsof -i:${port}`;
        (0, child_process_1.exec)(command, (err, stdout) => {
            if (err || !stdout.trim()) {
                resolve(false); // Porta não está sendo usada
            }
            else {
                resolve(true); // Porta está sendo usada
            }
        });
    });
};
// Função para matar um processo que está rodando na porta
const killProcessOnPort = (port) => {
    return new Promise((resolve, reject) => {
        const command = process.platform === "win32"
            ? `netstat -ano | findstr :${port}`
            : `lsof -t -i:${port}`;
        (0, child_process_1.exec)(command, (err, stdout) => {
            var _a, _b;
            if (err || !stdout.trim()) {
                return resolve(); // Nenhum processo encontrado na porta
            }
            const pid = process.platform === "win32"
                ? (_b = (_a = stdout.split("\n")[0]) === null || _a === void 0 ? void 0 : _a.trim().split(/\s+/)) === null || _b === void 0 ? void 0 : _b[4]
                : stdout.trim();
            if (pid && pid !== "0") {
                const killCommand = process.platform === "win32"
                    ? `taskkill /F /PID ${pid}`
                    : `kill -9 ${pid}`;
                (0, child_process_1.exec)(killCommand, (killErr) => {
                    if (killErr) {
                        return reject(`Erro ao matar o processo ${pid} na porta ${port}: ${killErr.message}`);
                    }
                    console.log(`Processo ${pid} na porta ${port} foi morto.`);
                    resolve();
                });
            }
            else {
                console.log(`Nenhum processo encontrado na porta ${port}.`);
                resolve();
            }
        });
    });
};
const buildAndStart = () => __awaiter(void 0, void 0, void 0, function* () {
    const backendDir = path_1.default.resolve(__dirname, "../"); // Diretório backend
    const websiteDir = path_1.default.resolve(__dirname, "../../../website"); // Diretório website
    try {
        console.log("Verificando processos em execução...");
        // Verifica se as portas 5000 e 3000 estão em uso
        const isPort5000InUse = yield checkPortInUse(5000);
        const isPort3000InUse = yield checkPortInUse(3000);
        // Mata o processo se a porta estiver em uso
        if (isPort5000InUse) {
            yield killProcessOnPort(5000);
        }
        if (isPort3000InUse) {
            yield killProcessOnPort(3000);
        }
        console.log("Iniciando o processo de build do backend...");
        yield executeCommand("npx", ["tsc"], backendDir); // Executa `npx tsc` no backend
        console.log("Build do backend concluído. Aguardando para iniciar o servidor...");
        setTimeout(() => {
            console.log("Iniciando o servidor backend...");
            executeCommandInBackground("node", ["dist/server.js"], backendDir); // Inicia o servidor backend em background
            console.log("Servidor backend iniciado com sucesso.");
            console.log("Iniciando o frontend (website)...");
            executeCommandInBackground("npm", ["start"], websiteDir); // Inicia o frontend em background
            console.log("Frontend (website) iniciado com sucesso.");
        }, 1000); // Timeout de 1 segundo
    }
    catch (error) {
        console.error(`Erro durante o build ou reinício: ${error}`);
    }
});
buildAndStart();
