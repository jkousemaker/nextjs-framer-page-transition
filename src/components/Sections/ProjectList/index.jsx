import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef } from "react";
import { useCursorStore } from "@/stores/cursorStore";
import { projects } from "@/data/projects";

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
      <List />
    </section>
  );
}

function List() {
  const [projectHovered, setProjectHovered] = useState(null);
  return (
    <ul className="pointer-events-auto pt-[3.3333vw]">
      {projects.map((project) => (
        <Project
          key={project.id}
          project={project}
          projectHovered={projectHovered}
          setProjectHovered={setProjectHovered}
        />
      ))}
    </ul>
  );
}

function Project({ project, projectHovered, setProjectHovered }) {
  //Animate x of image so center is on cursor but restrict y
  const MotionLink = motion(Link);
  const x = useSpring(0, { stiffness: 300, damping: 90 });
  const ref = useRef();
  function handleMouseMove({ currentTarget, clientX, clientY, event }) {
    let { left } = currentTarget.getBoundingClientRect();
    let size = ref.current.getBoundingClientRect();

    x.set(clientX - left - size.width / 2);
  }
  function handleMouseEnter({ currentTarget, clientX, clientY }) {
    setProjectHovered(project);
  }
  function handleMouseLeave() {
    setProjectHovered(null);
  }
  return (
    <li
      key={project.id}
      className="pointer-events-auto w-full relative"
      style={{}}
    >
      <MotionLink
        variants={{
          initial: {
            opacity: 0,
          },
          animate: {
            opacity: 1,
          },
          hover: {
            scale: 1,
          },
        }}
        initial="initial"
        animate="animate"
        whileHover="hover"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        href="/"
        className="grid place-projects-center left-0 relative z-10 hover:z-0"
      >
        <motion.div
          variants={{
            initial: { opacity: 0, scale: 0 },
            animate: { opacity: 0, scale: 0.5 },
            hover: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.2,
              },
            },
          }}
          style={{ x }}
          className="absolute pointer-events-none h-[25vw] w-[20vw] left-0"
        >
          <Image
            ref={ref}
            src={project.img}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 400px, 200px"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
        <div className="w-full grid grid-cols-8 grid-rows-1 gap-2">
          <div className="col-span-2 ">{project.id}</div>
          <div className="col-span-3 ">{project.title}</div>
          <div className="col-span-2 ">{project.category}</div>
          <div className="col-span-1 flex justify-end">2024</div>
        </div>
        <motion.div
          variants={{
            initial: { opacity: 0, scale: 0, clipPath: "inset(100% 0% 0% 0%)" },
            animate: { opacity: 1, scale: 1, clipPath: "inset(100% 0% 0% 0%)" },
            hover: {
              opacity: 1,
              scale: 1,
              clipPath: "inset(0% 0% 0% 0%)",
            },
          }}
          className="w-full grid grid-cols-8 grid-rows-1 gap-2 text-light absolute"
        >
          <div className="col-span-2 bg-red-500">{project.id}</div>
          <div className="col-span-3 bg-red-500">{project.title}</div>
          <div className="col-span-2 bg-red-500">{project.category}</div>
          <div className="col-span-1 bg-red-500 flex justify-end">2024</div>
        </motion.div>
      </MotionLink>
    </li>
  );
}
