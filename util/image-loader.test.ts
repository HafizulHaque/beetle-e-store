import { stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import variants from "../image-variants.json";
import imageLoader from "./image-loader";

describe("responsive image loader", () => {
  it("maps every configured source and width to an existing image of that width", async () => {
    for (const src of variants.sources) {
      for (const width of variants.widths) {
        const url = imageLoader({ src, width });
        const file = path.join(process.cwd(), "public", url.slice(1));
        expect((await stat(file)).isFile()).toBe(true);
        expect((await sharp(file).metadata()).width).toBe(width);
      }
    }
  });

  it("keeps other images on their original URL", () => {
    expect(imageLoader({ src: "/images/example.png", width: 256 })).toBe(
      "/images/example.png",
    );
  });

  it("provides the header logo at the configured width", async () => {
    const url = `${variants.logo.src.slice(0, -4)}-${variants.logo.width}.webp`;
    const file = path.join(process.cwd(), "public", url.slice(1));
    expect((await sharp(file).metadata()).width).toBe(variants.logo.width);
  });
});
