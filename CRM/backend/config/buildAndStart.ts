import { spawn, exec } from "child_process";
import path from "path";

const executeCommand = (command: string, args: string[], directory: string) => {
  return new Promise<void>((resolve, reject) => {
    const process = spawn(command, args, { cwd: directory, shell: true });

    process.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    process.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    process.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(`Processo finalizado com o código de erro ${code}`);
      }
    });
  });
};

const executeCommandInBackground = (
  command: string,
  args: string[],
  directory: string
) => {
  const process = spawn(command, args, {
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
const checkPortInUse = (port: number) => {
  return new Promise<boolean>((resolve, reject) => {
    const command =
      process.platform === "win32"
        ? `netstat -ano | findstr :${port}`
        : `lsof -i:${port}`;
    exec(command, (err, stdout) => {
      if (err || !stdout.trim()) {
        resolve(false); // Porta não está sendo usada
      } else {
        resolve(true); // Porta está sendo usada
      }
    });
  });
};

// Função para matar um processo que está rodando na porta
const killProcessOnPort = (port: number) => {
  return new Promise<void>((resolve, reject) => {
    const command =
      process.platform === "win32"
        ? `netstat -ano | findstr :${port}`
        : `lsof -t -i:${port}`;
    exec(command, (err, stdout) => {
      if (err || !stdout.trim()) {
        return resolve(); // Nenhum processo encontrado na porta
      }

      const pid =
        process.platform === "win32"
          ? stdout.split("\n")[0]?.trim().split(/\s+/)?.[4]
          : stdout.trim();

      if (pid && pid !== "0") {
        const killCommand =
          process.platform === "win32"
            ? `taskkill /F /PID ${pid}`
            : `kill -9 ${pid}`;
        exec(killCommand, (killErr) => {
          if (killErr) {
            return reject(
              `Erro ao matar o processo ${pid} na porta ${port}: ${killErr.message}`
            );
          }
          console.log(`Processo ${pid} na porta ${port} foi morto.`);
          resolve();
        });
      } else {
        console.log(`Nenhum processo encontrado na porta ${port}.`);
        resolve();
      }
    });
  });
};

const buildAndStart = async () => {
  const backendDir = path.resolve(__dirname, "../"); // Diretório backend
  const websiteDir = path.resolve(__dirname, "../../../website"); // Diretório website

  try {
    console.log("Verificando processos em execução...");

    // Verifica se as portas 5000 e 3000 estão em uso
    const isPort5000InUse = await checkPortInUse(5000);
    const isPort3000InUse = await checkPortInUse(3000);

    // Mata o processo se a porta estiver em uso
    if (isPort5000InUse) {
      await killProcessOnPort(5000);
    }
    if (isPort3000InUse) {
      await killProcessOnPort(3000);
    }

    console.log("Iniciando o processo de build do backend...");
    await executeCommand("npx", ["tsc"], backendDir); // Executa `npx tsc` no backend
    console.log(
      "Build do backend concluído. Aguardando para iniciar o servidor..."
    );

    setTimeout(() => {
      console.log("Iniciando o servidor backend...");
      executeCommandInBackground("node", ["dist/server.js"], backendDir); // Inicia o servidor backend em background
      console.log("Servidor backend iniciado com sucesso.");

      console.log("Iniciando o frontend (website)...");

      executeCommandInBackground("npm", ["start"], websiteDir); // Inicia o frontend em background
      console.log("Frontend (website) iniciado com sucesso.");
    }, 1000); // Timeout de 1 segundo
  } catch (error) {
    console.error(`Erro durante o build ou reinício: ${error}`);
  }
};

buildAndStart();
