import fs from "fs";
import path from "path";

const logDir = path.join(process.cwd(), "logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

function writeLog(file: string, message: string) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(path.join(logDir, file), line);
}

export const logger = {
  info(message: string) {
    writeLog("ollama-worker.log", message);
  },
  error(message: string) {
    writeLog("ollama-worker-errors.log", message);
  },
};
