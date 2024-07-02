"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import dynamic from "next/dynamic";
import { Suspense, useRef, useMemo, useEffect, useState } from "react";

const View = dynamic(
  () => import("@/components/Canvas/View").then((mod) => mod.View),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-96 w-full flex-col items-center justify-center">
        <svg
          className="-ml-1 mr-3 h-5 w-5 animate-spin text-black"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    ),
  }
);

import { useThree, useFrame } from "@react-three/fiber";

import { Curve } from "@/components/Layout/Curve";
//import vertexShader from "!!raw-loader!./vertexShader.glsl";
//import fragmentShader from "!!raw-loader!./fragmentShader.glsl";
export default function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);
  const MotionLink = motion(Link);
  return (
    <MotionLink
      initial="initial"
      whileHover="hover"
      href={project.href}
      transition={{
        type: "tween",
        duration: 0.3,
        staggerChildren: 0.012,
        staggerDirection: isHovered ? -1 : 1,
        ease: [0.6, 0, 0.4, 1],
      }}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      className="relative col-span-6 cursor-pointer pointer-events-auto select-none [&:nth-child(n+3)]:mt-[5em]"
    >
      <div className="relative pt-[65%]">
        <Image
          src={project.img}
          alt={project.title}
          fill
          className="absolute inset-0 size-full  rounded-2xl overflow-hidden"
        />
      </div>
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
        <div className="relative overflow-hidden text-[3vw] h-[1em] -left-[0.06em]">
          <motion.div
            variants={{
              initial: {
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
          <div className="relative w-fit text-[8vw] tracking-tight">
            <h4 className="pt-[.5em] relative inline-block -left-[.07em] leading-[0.9] overflow-hidden">
              <div className=""></div>
            </h4>
          </div>
          <Label>{project.title}</Label>
        </div>
      </div>
    </MotionLink>
  );
}

const Header = ({ children }) => {
  const words = children.split(" ");
  console.log(words);
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
