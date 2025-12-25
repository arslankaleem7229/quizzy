async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  console.log("Worker supervisor started");

  while (true) {
    try {
      const t0 = performance.now();
      const res = await fetch("http://localhost:3000/api/process", {
        method: "POST",
      });

      const data = await res.json();

      const t1 = performance.now();
      console.log(
        "Processed:",
        data.processed,
        "Failed:",
        data.failed,
        "time:",
        `${t1 - t0}`
      );

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
