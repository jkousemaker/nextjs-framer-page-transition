import { motion } from "framer-motion";
import Link from "next/link";
import { routes } from "@/data/routes";
import { initial } from "lodash";
export default function Navbar({}) {
  const MotionLink = motion(Link);
  return (
    <motion.div className="flex-1 flex flex-col size-full z-20 text-[#222] relative">
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
              <div className="min-w-6 pt-5 ">
                <div className="relative overflow-hidden">
                  <motion.span
                    variants={{
                      initial: { opacity: 0, y: "100%", x: 0 },
                      enter: {
                        opacity: 1,
                        y: 0,
                        x: 0,
                      },
                    }}
                    className="text-2xl block relative xl:text-base text-[#222] "
                  >
                    {_ + 1}
                  </motion.span>
                </div>
              </div>
              <div className="relative ">
                <motion.span
                  variants={{
                    initial: { opacity: 0, y: "100%", x: 0 },
                    enter: {
                      opacity: 1,
                      y: 0,
                      x: 0,
                      transition: {
                        duration: 0.5,
                        delay: 0.5 + 0.1 * _,
                        ease: [0.62, 0.16, 0.34, 0.96],
                      },
                    },
                    exit: {
                      opacity: 0,
                      y: "100%",
                      transition: {
                        duration: 0.5,
                        delay: 0.5 + 0.1 * _,
                        ease: [0.62, 0.16, 0.34, 0.96],
                      },
                    },
                  }}
                  className="text-7xl relative block -tracking-[.21rem] leading-tight text-[#222]"
                >
                  {route.label}
                </motion.span>
              </div>
            </div>
            <motion.div
              variants={{
                initial: {
                  scale: 0.8,
                  opacity: 0,
                  x: 0,
                },
                enter: {
                  scale: 1,
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: 0.1 * _,
                    duration: 1,
                    ease: [0.62, 0.16, 0.34, 0.96],
                  },
                },
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
                        scale: 0.8,
                        opacity: 0,
                        x: 0,
                      },
                      enter: {
                        scale: 1,
                        opacity: 1,
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
                opacity: 0,
                y: "100%",
              },
              enter: {
                opacity: 1,
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
            className="bg-[#eaeaea] absolute size-full block inset-0 z-10"
          ></motion.div>
          <div className=" h-[1.5px] absolute top-auto bottom-0 left-0 right-auto  overflow-hidden w-full z-50">
            <motion.div
              variants={{
                initial: {
                  scaleX: 0,
                },
                enter: {
                  scaleX: 1,
                  transition: {
                    delay: 0.1 * _,
                    duration: 1,
                    ease: [0.62, 0.16, 0.34, 0.96],
                  },
                },
              }}
              initial="initial"
              animate="enter"
              className="bg-[#222] origin-left size-full h-px absolute top-auto bottom-0 left-0 right-auto"
            ></motion.div>
          </div>
        </MotionLink>
      ))}
      <motion.div
        variants={{
          initial: {
            y: "-100%",
          },
          enter: {
            y: "0%",
            transition: {
              delay: 0.1,
              duration: 1,
              ease: [0.62, 0.16, 0.34, 0.96],
            },
          },
        }}
        initial="initial"
        animate="enter"
        className="size-full absolute inset-0 bg-white z-0"
      ></motion.div>
    </motion.div>
  );
}
