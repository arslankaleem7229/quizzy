import fs from "fs";
import path from "path";

export default async function getAvatarImages() {
  const dir = path.join(process.cwd(), "public", "images");
  const images = fs.readdirSync(dir);

  return { props: { images } };
}
