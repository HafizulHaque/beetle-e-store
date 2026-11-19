import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const { sources, widths, logo } = JSON.parse(
  await readFile(new URL("../image-variants.json", import.meta.url), "utf8"),
);
const publicDir = path.resolve("public");

await Promise.all(
  [
    ...sources.flatMap((src) =>
      widths.map((width) =>
        sharp(path.join(publicDir, src.slice(1)))
          .resize({ width })
          .webp({ quality: 80 })
          .toFile(path.join(publicDir, `${src.slice(1, -4)}-${width}.webp`)),
      ),
    ),
    sharp(path.join(publicDir, logo.src.slice(1)))
      .resize({ width: logo.width })
      .webp({ quality: 90 })
      .toFile(path.join(publicDir, `${logo.src.slice(1, -4)}-${logo.width}.webp`)),
  ],
);

console.log(`Generated ${sources.length * widths.length + 1} image variants.`);
