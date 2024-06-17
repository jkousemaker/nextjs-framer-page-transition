"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { routes } from "@/data/routes";
import { useRouter } from "next/router";
export default function Header() {
  const [activeTab, setActiveTab] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const currentRoute = routes.find(
      (route) => route.pathname === router.pathname
    );

    setActiveTab(currentRoute.id);
  }, []);
  return (
    <header className="fixed top-0 left-0 w-full z-50 text-dark flex flex-row justify-between px-10 py-5">
      <div className="grid place-items-center">
        <p className="font-bold tracking-tight">Gabryella</p>
      </div>
      <div className="flex flex-row gap-5 items-center">
        {routes.map((route) => (
          <Link
            key={route.id}
            href={route.pathname}
            onClick={() => setActiveTab(route.id)}
            scroll={false}
            className={cn(
              "relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2"
            )}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {activeTab === route.id && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 z-10 bg-white mix-blend-difference"
                style={{ borderRadius: 9999, originY: "0px" }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {route.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
