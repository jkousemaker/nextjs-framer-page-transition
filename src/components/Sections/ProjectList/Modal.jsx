"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};
export default function Modal({ modal, projects }) {
  const { active, index } = modal;
  const modalContainer = useRef(null);
  return (
    <motion.div
      ref={modalContainer}
      variants={scaleAnimation}
      initial="initial"
      animate={active ? "enter" : "closed"}
      className="h-[350px] w-[400px] absolute bg-white overflow-hidden pointer-events-none flex items-center justify-center"
    >
      <div
        style={{ top: index * -100 + "%" }}
        className="size-full absolute transition-all duration-500 ease-[0.76,0,0.24,1]"
      >
        <AnimatePresence mode="sync">
          {projects.map((project, index) => {
            const { img, title, color } = project;
            return (
              <motion.div
                exit={{ x: 100 }}
                className="size-full flex items-center justify-center"
                style={{ backgroundColor: color }}
                key={`modal_${index}`}
              >
                <Image
                  src={img}
                  width={300}
                  height={0}
                  alt={title}
                  className="h-auto"
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
