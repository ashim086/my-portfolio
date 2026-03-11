import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ashim Thapa Magar — Full-Stack Web Developer",
    short_name: "Ashim Magar",
    description:
      "Ashim Thapa Magar is a full-stack MERN developer from Nepal specializing in React, Next.js, Node.js, and MongoDB.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/ash.jpg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: "/ash.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
