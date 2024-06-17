"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { text, curve, translate } from "./anim";
import { cn } from "@/utils/cn";
import { routes } from "@/data/routes";

const anim = (variants) => {
  return {
    variants,
    initial: "initial",
    animate: "enter",
    exit: "exit",
  };
};

export default function Curve({ children, backgroundColor }) {
  const router = useRouter();
  const [dimensions, setDimensions] = useState({
    width: null,
    height: null,
  });

  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.scrollTo(0, 0);

    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="min-h-screen p-10" style={{ backgroundColor }}>
      <div
        className={cn(
          "fixed h-[calc(100vh+600px)] w-screen pointer-events-none top-0 left-0 bg-black opacity-0 transition-opacity duration-100",
          dimensions.width == null && "!opacity-100"
        )}
      />
      <motion.p
        className="absolute left-1/2 top-[40%] text-white text-5xl z-10 -translate-x-1/2 text-center"
        {...anim(text)}
      >
        {routes.find((route) => route.pathname === router.pathname)?.label ||
          ""}
      </motion.p>
      {dimensions.width != null && <SVG {...dimensions} />}
      {children}
    </div>
  );
}

const SVG = ({ height, width }) => {
  const initialPath = `
        M0 300 
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 0
    `;

  const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `;

  return (
    <motion.svg
      {...anim(translate)}
      className="fixed h-[calc(100vh+600px)] w-screen pointer-events-none top-0 left-0"
    >
      <motion.path {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  );
};
