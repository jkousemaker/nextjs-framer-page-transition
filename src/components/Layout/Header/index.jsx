"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { routes } from "@/data/routes";
import { useRouter } from "next/router";
import Menu from "./Menu";
import MenuButton from "./MenuButton";
export default function Header() {
  const [activeTab, setActiveTab] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const currentRoute = routes.find(
      (route) => route.pathname === router.pathname
    );
    console.log(currentRoute);
    setActiveTab(currentRoute.id);
  }, []);
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex-row justify-between px-10 py-5 flex">
        <div className="grid place-items-center">
          <p className="font-bold tracking-tight">Gabryella</p>
        </div>
        <MenuButton setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
        <div className="flex-row gap-5 items-center hidden xl:block pointer-events-none">
          {routes.map((route) => (
            <Link
              key={route.id}
              href={route.pathname}
              onClick={() => setActiveTab(route.id)}
              scroll={false}
              className={cn(
                "relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2 pointer-events-auto"
              )}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <span className="sr-only">Show navigation</span>
              {activeTab === route.id && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0  bg-white mix-blend-difference"
                  style={{ borderRadius: 9999, originY: "0px" }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {route.label}
            </Link>
          ))}
        </div>
        <motion.div className="absolute block xl:hidden inset-0 pointer-events-none">
          <Menu menuOpen={menuOpen} />
        </motion.div>
      </header>
    </>
  );
}
