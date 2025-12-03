import { useEffect, useState } from "react";

export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // React recommends doing async mount flagging
    Promise.resolve().then(() => setMounted(true));
  }, []);

  return mounted;
}
