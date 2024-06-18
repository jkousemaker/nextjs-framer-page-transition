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
    type1: "test",
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
      <div className="fixed top-0 z-[99999] pointer-events-none h-screen w-screen grid place-items-center">
        <motion.p
          className="absolute text-white text-5xl z-[1000] text-center"
          {...anim(text)}
        >
          {routes.find((route) => route.pathname === router.pathname)?.label ||
            ""}
        </motion.p>
        {dimensions.width != null && <SVG {...dimensions} />}
      </div>

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
      className="fixed z-[999] h-[calc(100vh+600px)] w-screen pointer-events-none top-0 left-0"
    >
      <motion.path {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  );
};
