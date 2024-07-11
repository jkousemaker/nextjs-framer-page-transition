"use client";
import Link from "next/link";
import Image from "next/image";
import { animate, motion } from "framer-motion";

import dynamic from "next/dynamic";
import { Suspense, useRef, useMemo, useEffect, useState } from "react";
import { useTexture, Plane } from "@react-three/drei";

import { useThree, useFrame } from "@react-three/fiber";
import InteractiveImage from "./InteractiveImage";
import { Curve } from "@/components/Layout/Curve";
//import vertexShader from "!!raw-loader!./vertexShader.glsl";
//import fragmentShader from "!!raw-loader!./fragmentShader.glsl";
export default function ProjectCard({ project }) {
  //const [isHovered, setIsHovered] = useState(false);
  const MotionLink = motion(Link);
  return (
    <MotionLink
      initial="initial"
      animate="enter"
      exit="exit"
      whileHover="hover"
      href={project.href}
      transition={{
        type: "tween",
        duration: 0.3,
        staggerChildren: 0.005,
        staggerDirection: 1,
        ease: [0.6, 0, 0.4, 1],
      }}
      className="relative col-span-6 cursor-pointer pointer-events-auto select-none [&:nth-child(n+3)]:mt-[5em]"
    >
      <InteractiveImage project={project} />
      <div className="relative w-full">
        <div className=" flex flex-row flex-nowrap text-[.9vw] mt-[1.5em] mb-[1em]">
          {project.keyWords.map((keyWord, index) => (
            <span
              key={index}
              className="relative last text-black  uppercase rounded-full px-2 py-1 pr-4 flex items-center after:content-[''] after:absolute after:right-0 after:bg-black after:size-[6px] after:rounded-full last:after:hidden"
            >
              {keyWord}
            </span>
          ))}
        </div>
        <Header>{project.title}</Header>
      </div>
    </MotionLink>
  );
}

const Header = ({ children }) => {
  return (
    <div className="relative overflow-hidden text-[3vw] h-[1em] -left-[0.06em]">
      <motion.div
        variants={{
          initial: {
            x: 0,
            opacity: 0,
          },
          animate: {
            opacity: 1,
          },
          exit: {
            opacity: 0,
          },
          hover: {
            x: "1.2em",
            opacity: 1,
          },
        }}
        transition={{
          type: "spring",
          stiffness: 260,

          damping: 30,
          mass: 2,
        }}
        className="inline-block absolute size-[.8em] top-[.1em] -left-[1em] grid-cols-[repeat(12,minmax(0,1fr))]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="size-full"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.9999 11.9998C1.9999 12.552 2.44762 12.9997 2.9999 12.9997H18.9757C18.8901 13.148 18.7838 13.2876 18.657 13.4144L12.2931 19.7784C11.9025 20.1689 11.9025 20.8021 12.2931 21.1926C12.6836 21.5831 13.3168 21.5831 13.7073 21.1926L22.1926 12.7073C22.5831 12.3168 22.5831 11.6836 22.1926 11.2931L22.1924 11.293L13.7071 2.80767C13.3166 2.41715 12.6834 2.41715 12.2929 2.80767C11.9024 3.1982 11.9024 3.83136 12.2929 4.22189L18.657 10.586C18.7836 10.7126 18.8896 10.8518 18.9752 10.9998H2.9999C2.44762 10.9997 1.9999 11.4475 1.9999 11.9998Z"
            fill="black"
          />
        </svg>
      </motion.div>
      <Label>{children}</Label>
    </div>
  );
};

const Label = ({ children }) => {
  const letters = children.split("");
  return (
    <motion.div
      transition={{
        type: "tween",
        duration: 0.3,
        ease: [0.6, 0, 0.4, 1],
      }}
      className="relative bottom-[.2em] overflow-hidden flex font-semibold"
    >
      {letters.map((letter, index) => (
        <motion.div
          variants={{
            initial: {
              x: "0em",
              opacity: 1,
            },
            hover: {
              x: "1.5em",
              opacity: 1,
            },
          }}
          transition={{
            type: "tween",
            duration: 0.3,
            ease: [0.6, 0, 0.4, 1],
          }}
          key={index}
          className="flex flex-col text-[3vw] leading-[1.15]"
        >
          <>
            {letter === " " ? (
              <span style={{ width: "0.5em" }}></span>
            ) : (
              <>
                <span>{letter}</span>
                <span>{letter}</span>
                <span>{letter}</span>
                <span>{letter}</span>
              </>
            )}
          </>
        </motion.div>
      ))}
    </motion.div>
  );
};
