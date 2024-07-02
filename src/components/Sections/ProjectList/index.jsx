import Image from "next/image";
import React, { use, useEffect } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { useCursorStore } from "@/stores/cursorStore";
import { projects } from "@/data/projects";
import useMouse from "@/utils/hooks/useMouse";
import useDimension from "@/utils/hooks/useDimension";
import Modal from "./Modal";
export default function ProjectList() {
  const listContainer = useRef();
  useEffect(() => {
    console.log(listContainer.current);
  }, []);
  return (
    <section className="w-full px-5">
      <div className="mb-10">
        <h1 className="text-[10vw] leading-[9vw] tracking-tight font-bold">
          <span className="w-full flex flex-wrap">All projects</span>
          <span className="w-full flex flex-wrap">2024/current</span>
        </h1>
      </div>
      <div className="w-full grid grid-cols-8 grid-rows-1 gap-2 text-xl font-bold">
        <div className="col-span-2 ">id</div>
        <div className="col-span-3 ">title</div>
        <div className="col-span-2 ">project type</div>
        <div className="col-span-1 flex justify-end">year</div>
      </div>
      <div className="pt-[3.3333vw] relative">
        <ul ref={listContainer} className="pointer-events-auto ">
          <List parentRef={listContainer} />
        </ul>
      </div>
    </section>
  );
}

function List({ parentRef }) {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const handleSetModal = useCallback((newModal) => {
    setModal(newModal);
  }, []);

  return (
    <>
      <Modal modal={modal} projects={projects} parentRef={parentRef} />
      {projects.map((project, index) => (
        <Project
          key={index}
          index={index}
          project={project}
          setModal={handleSetModal}
        />
      ))}
    </>
  );
}

const Project = React.memo(function Project({ index, project, setModal }) {
  const MotionLink = motion(Link);

  const handleMouseEnter = useCallback(() => {
    setModal({ active: true, index });
  }, [setModal, index]);

  const handleMouseLeave = useCallback(() => {
    setModal({ active: false, index });
  }, [setModal, index]);

  return (
    <li
      className="pointer-events-auto w-full relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <MotionLink
        variants={{
          initial: {
            opacity: 0,
          },
          enter: {
            opacity: 1,
          },
          hover: {
            scale: 1.01,
          },
        }}
        initial="initial"
        animate="enter"
        whileHover="hover"
        href="/"
        className="grid place-projects-center left-0 relative z-10 hover:z-0 after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-white"
      >
        <div className="w-full grid grid-cols-8 grid-rows-1 text-light  inset-0 ">
          <motion.div
            className="col-span-full py-5 px-2 absolute flex justify-around items-center bg-red-400 text-dark transition-[top] duration-500 ease-[0.76,0,0.24,1] z-[999] size-full"
            variants={{
              initial: {
                clipPath: "polygon(0% 100%,2% 100%,99% 100%,100% 100%)",
              },
              enter: {
                clipPath: "polygon(0% 100%,2% 100%,99% 100%,100% 100%)",
              },
              hover: {
                clipPath: "polygon(0% 100%,0.00% 0.00%,100% 0%,100% 100%)",
              },
            }}
          >
            <motion.h2
              variants={{
                initial: { y: 0, rotate: -30 },
                enter: { y: 0, rotate: 0 },
                hover: { x: "-10%", rotate: 0, opacity: 0.5 },
              }}
              style={{ zIndex: 99999 }}
              className="text-[60px]"
            >
              C2 Montreal{" "}
            </motion.h2>
            <motion.p
              variants={{
                initial: { y: 0, rotate: 30 },
                enter: { y: 0, rotate: 0 },
                hover: { x: "10%", rotate: 0, opacity: 0.5 },
              }}
            >
              Design & Develomotion.pment
            </motion.p>
          </motion.div>
          <div className="col-span-full py-5 px-2 text-light  relative flex justify-around items-center bg-black  ">
            <motion.h2
              variants={{
                initial: { y: 0, rotate: -30 },
                enter: { y: 0, rotate: 0 },
                hover: { x: "-10%", rotate: 0, opacity: 0.5 },
              }}
              className="text-[60px]"
            >
              C2 Montreal{" "}
            </motion.h2>
            <motion.p
              variants={{
                initial: { y: 0, rotate: 30 },
                enter: { y: 0, rotate: 0 },
                hover: { x: "10%", rotate: 0, opacity: 0.5 },
              }}
            >
              Design & Develomotion.pment
            </motion.p>
          </div>
        </div>
      </MotionLink>
    </li>
  );
});
