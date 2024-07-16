import Link from "next/link";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { routes } from "@/data/routes";
export default function Menu({ menuOpen }) {
  console.log(
    "https://horizonstudioarchitecture.webflow.io/studio Menu Source"
  );

  const MotionLink = motion(Link);
  return (
    <aside className="fixed inset-0  size-full pointer-events-none">
      <AnimatePresence>
        {menuOpen && (
          <>
            <div className="absolute top-0 left-0 w-full h-screen pointer-events-auto">
              <div className="flex flex-row flex-nowrap size-full">
                <Navbar />
                <Sidebar />
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </aside>
  );
}
