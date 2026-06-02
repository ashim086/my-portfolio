import React, { ReactNode } from "react";
import Navbar from "../components/layout/navbar";

function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen h-screen overflow-hidden bg-canvas text-body">
      {/* Navbar still rendered so direct deep-links from search engines
          keep their previous anchor target. Visually unobtrusive on top of
          the desktop environment. */}
      <div className="absolute top-2 left-2 z-[9996] hidden">
        <Navbar />
      </div>
      {children}
    </main>
  );
}

export default Layout;
