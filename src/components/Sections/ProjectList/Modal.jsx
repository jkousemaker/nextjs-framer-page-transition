"use client";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import useElementBounds from "@/utils/hooks/useBounds";
import useMouse from "@/utils/hooks/useMouse";
import useDimension from "@/utils/hooks/useDimension";

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
export default function Modal({ modal, projects, parentRef }) {
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const bounds = useElementBounds(parentRef);

  const mouse = useMouse();

  const dimension = useDimension();

  const smoothMouse = {
    x: useSpring(mouse.x, { stiffness: 300, damping: 90 }),
    y: useSpring(mouse.y, { stiffness: 300, damping: 90 }),
  };

  useEffect(() => {
    if (!parentRef) {
      return;
    }
    const handleMouseMove = (e) => {
      if (parentRef) {
        const rect = parentRef.getBoundingClientRect();

        const distanceToLeft = Math.abs(e.clientX - rect.left);
        const distanceToTop = Math.abs(e.clientY - rect.top);

        smoothMouse.x.set(distanceToLeft);
        smoothMouse.y.set(distanceToTop);
      }
    };
    parentRef.addEventListener("mousemove", handleMouseMove);

    return () => {
      parentRef.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active]);
  return (
    <motion.div
      ref={modalContainer}
      variants={scaleAnimation}
      initial="initial"
      animate={active ? "enter" : "closed"}
      style={{ left: smoothMouse.x, top: smoothMouse.y }}
      className="h-[350px] w-[400px] absolute top-0 left-0 bg-white overflow-hidden pointer-events-none flex items-center justify-center z-50"
    >
      <motion.div
        style={{ top: index * -100 + "%" }}
        className="size-full absolute transition-all duration-500 ease-[0.76,0,0.24,1]"
      >
        <AnimatePresence mode="sync">
          {projects.map((project, index) => {
            const { img, title, color } = project;
            return (
              <motion.div
                exit={{ x: 100 }}
                style={{ scale: 1, backgroundColor: color }}
                className="size-full flex items-center justify-center"
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
      </motion.div>
    </motion.div>
  );
}
