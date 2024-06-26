import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useState, useRef } from "react";
import { useCursorStore } from "@/stores/cursorStore";
import { projects } from "@/data/projects";
import useMouse from "@/utils/hooks/useMouse";
import useDimension from "@/utils/hooks/useDimension";
import Modal from "./Modal";
export default function ProjectList() {
  return (
    <section className="w-full px-5">
      <div className="mb-10">
        <h1 className="text-[10vw] leading-[9vw] tracking-tight font-bold">
          <span className="w-full flex flex-wrap">All projects</span>
          <span className="w-full flex flex-wrap">2024/current</span>
        </h1>
      </div>
      <div className="w-full grid grid-cols-8 grid-rows-1 gap-2 text-[.7292vw] font-bold">
        <div className="col-span-2 ">id</div>
        <div className="col-span-3 ">title</div>
        <div className="col-span-2 ">project type</div>
        <div className="col-span-1 flex justify-end">year</div>
      </div>
      <div className="pt-[3.3333vw]">
        <List />
      </div>
    </section>
  );
}

function List() {
  const mouse = useMouse();
  const dimension = useDimension();
  console.log(dimension, mouse.x.get(), mouse.y.get());
  const smoothMouse = {
    x: useSpring(mouse.x, { stiffness: 300, damping: 90 }),
    y: useSpring(mouse.y, { stiffness: 300, damping: 90 }),
  };

  const [modal, setModal] = useState({ active: false, index: 0 });
  const ref = useRef();
  return (
    <>
      <Modal modal={modal} projects={projects} />
      <ul className="pointer-events-auto ">
        {projects.map((project, index) => (
          <Project
            key={index}
            index={index}
            project={project}
            setModal={setModal}
          />
        ))}
      </ul>
    </>
  );
}

function Project({ index, project, setModal }) {
  //Animate x of image so center is on cursor but restrict y
  const MotionLink = motion(Link);

  return (
    <li
      key={project.id}
      className="pointer-events-auto w-full relative"
      style={{}}
      onMouseEnter={() => {
        setModal({ active: true, index });
      }}
      onMouseLeave={() => {
        setModal({ active: false, index });
      }}
    >
      <Link
        href="/"
        className="grid place-projects-center left-0 relative z-10 hover:z-0"
      >
        <div className="w-full grid grid-cols-8 grid-rows-1 gap-2">
          <div className="col-span-2 ">{project.id}</div>
          <div className="col-span-3 ">{project.title}</div>
          <div className="col-span-2 ">{project.category}</div>
          <div className="col-span-1 flex justify-end">2024</div>
        </div>
        <div className="w-full grid grid-cols-8 grid-rows-1 gap-2 text-light absolute">
          <div className="col-span-2 bg-red-500">{project.id}</div>
          <div className="col-span-3 bg-red-500">{project.title}</div>
          <div className="col-span-2 bg-red-500">{project.category}</div>
          <div className="col-span-1 bg-red-500 flex justify-end">2024</div>
        </div>
      </Link>
    </li>
  );
}
