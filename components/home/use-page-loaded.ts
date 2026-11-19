"use client";

import { useEffect, useState } from "react";

export function usePageLoaded() {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const onLoad = () => setPageLoaded(true);
    if (document.readyState === "complete") {
      onLoad();
      return;
    }
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return pageLoaded;
}
