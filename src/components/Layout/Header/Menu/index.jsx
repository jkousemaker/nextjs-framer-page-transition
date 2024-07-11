import Link from "next/link";
import Sidebar from "../Sidebar";
import { motion } from "framer-motion";
import { useState } from "react";
import { routes } from "@/data/routes";
export default function Menu({}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const MotionLink = motion(Link);
  return (
    <aside className="fixed inset-0  size-full pointer-events-none">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="pointer-events-auto"
      >
        Menu
      </button>
      {menuOpen && (
        <>
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="bg-[#f8fafc] absolute top-0 left-0 w-full h-screen pointer-events-auto"
          >
            <div className="flex flex-row flex-nowrap size-full">
              <div className="flex-1 flex flex-col size-full z-20 text-[#222]">
                {routes.map((route, _) => (
                  <MotionLink
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    whileHover="hover"
                    whileTap="tap"
                    key={_}
                    href={route.pathname}
                    className="flex-1 min-h-[100px] w-full flex items-center relative overflow-hidden"
                  >
                    <div className="relative flex justify-between items-center w-full px-[5%] z-50">
                      <div className="flex relative gap-x-4 gap-y-4">
                        <div className="min-w-6 pt-5 mix-blend-exclusion">
                          <div className="relative overflow-hidden">
                            <span className="text-2xl xl:text-base text-[#222] ">
                              {_ + 1}
                            </span>
                          </div>
                        </div>
                        <div className="relative ">
                          <motion.span
                            variants={{
                              hover: { x: 35 },
                              tap: { x: 35, scale: 0.95 },
                            }}
                            className="text-7xl relative block -tracking-[.21rem] leading-tight text-[#222]"
                          >
                            {route.label}
                          </motion.span>
                        </div>
                      </div>
                      <motion.div
                        variants={{
                          initial: { scale: 1 },
                          enter: { scale: 1 },
                          hover: {
                            scale: [null, 0.8, 1],
                            transition: { duration: 0.3 },
                          },
                          tap: {
                            scale: 0.5,
                          },
                        }}
                        className="size-12 flex items-center justify-center rounded-full border border-[#222] border-solid"
                      >
                        <div className="relative overflow-hidden size-full ">
                          <motion.div className="size-full grid place-items-center ">
                            <motion.div
                              variants={{
                                initial: {
                                  x: "-100%",
                                },
                                enter: {
                                  x: "-100%",
                                },
                                hover: {
                                  x: "0%",
                                },
                              }}
                              className="size-full grid place-items-center absolute"
                            >
                              <motion.div className="size-[1em] absolute">
                                <svg
                                  width="100%"
                                  height="100%"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12.079 7.5L6.287 13.292L7 14L14 7L7 0L6.287 0.708L12.079 6.5H0V7.5H12.079Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>
                              </motion.div>
                            </motion.div>
                            <motion.div
                              variants={{
                                initial: {
                                  x: 0,
                                },
                                enter: {
                                  x: 0,
                                },
                                hover: {
                                  x: "100%",
                                },
                              }}
                              className="size-full grid place-items-center"
                            >
                              <motion.div className="size-[1em] relative ">
                                <svg
                                  width="100%"
                                  height="100%"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12.079 7.5L6.287 13.292L7 14L14 7L7 0L6.287 0.708L12.079 6.5H0V7.5H12.079Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>
                              </motion.div>
                            </motion.div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                    <motion.div
                      variants={{
                        initial: {
                          y: "100%",
                        },
                        enter: {
                          y: "100%",
                        },
                        exit: {
                          y: "100%",
                        },
                        hover: {
                          y: 0,
                        },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 40,
                      }}
                      className="bg-[#eaeaea] absolute size-full block inset-0 z-0"
                    ></motion.div>
                    <div className=" h-[1.5px] absolute top-auto bottom-0 left-0 right-auto  overflow-hidden w-full z-50">
                      <div className="bg-[#222] size-full h-px absolute top-auto bottom-0 left-0 right-auto"></div>
                    </div>
                  </MotionLink>
                ))}
              </div>

              <Sidebar />
            </div>
          </motion.div>
        </>
      )}
    </aside>
  );
}
