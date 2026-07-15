import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Natures Dates",
    short_name: "Natures Dates",
    description: "Medjool date products, recipes and sunshine-inspired snack ideas.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff7ef",
    theme_color: "#c9002f",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
