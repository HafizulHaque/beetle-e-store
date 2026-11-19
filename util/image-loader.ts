"use client";

import type { ImageLoaderProps } from "next/image";
import variants from "../image-variants.json";

export default function imageLoader({ src, width }: ImageLoaderProps): string {
  if (!variants.sources.includes(src)) return src;
  return `${src.slice(0, -4)}-${width}.webp`;
}
