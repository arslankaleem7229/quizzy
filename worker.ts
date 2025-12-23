import "@/src/workers/gen-ai-worker";

console.log("Worker process started");
console.log("Process ID:", process.pid);
console.log("Press Ctrl+C to stop");

process.on("SIGTERM", () => {
  console.log("Worker shutting down...");
  process.exit(0);
});
