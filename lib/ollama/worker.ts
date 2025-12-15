async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  console.log("Worker supervisor started");

  while (true) {
    try {
      const res = await fetch("http://localhost:3000/api/process", {
        method: "POST",
      });

      const data = await res.json();

      console.log("Processed:", data.processed, "Failed:", data.failed);

      if (data.processed === 0) {
        console.log("All questions processed");
        break;
      }

      await sleep(300);
    } catch (err) {
      if (err instanceof Error)
        console.error("Worker call failed:", err.message);
      else console.error(err);
      await sleep(2000);
    }
  }
}

run();
