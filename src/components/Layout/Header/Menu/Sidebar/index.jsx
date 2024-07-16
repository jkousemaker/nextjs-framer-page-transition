import Image from "next/image";
import Logo from "@public/logo.svg";
import Link from "next/link";
import { motion } from "framer-motion";
export default function Sidebar() {
  return (
    <div className="flex-1 text-white pointer-events-auto relative">
      <div className="gap-4 grid-rows-[auto_auto] grid-cols-[1fr] [grid-auto-columns:_1fr] w-4/5 h-4/5 mx-auto pt-16 grid relative z-20">
        <div className="flex flex-col gap-8 [grid-area:_span_1/span_1/span_1/span_1]">
          <div className="relative overflow-hidden">
            <div className="w-4/5">
              <Image src={Logo} alt="Logo" height={200} width={500} />
            </div>
          </div>
          <div className="gap-2 flex-col max-w-[50%] flex">
            <p className="text-2xl leading-none font-normal">
              323 Main Street,
              <br />
              Los Angeles, CA 90001
            </p>
            <p className="text-sm">+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="self-end gap-y-12 flex-col grid-rows-[auto_auto] grid-cols-[1fr_1fr] [grid-auto-columns:_1fr] w-4/5 my-auto grid">
          <ContactItem icon="A" text="Business" link="info@horizonstudio.com" />
          <ContactItem icon="B" text="Career" link="Job@horizonstudio.com" />
          <ContactItem icon="C" text="Social" link="Instagram" />
          <ContactItem icon="D" text="Legal" link="Privacy" />
        </div>
      </div>
      <div className="flex flex-col w-4/5 h-1/5 mx-auto relative z-10">
        <div className="w-full h-px relative overflow-hidden">
          <div className="w-full h-px bg-white absolute top-0 bottom-auto left-0 right-auto"></div>
        </div>
        <div className="grid h-full gap-0 grid-rows-[auto] grid-cols-[1fr_1fr] [grid-auto-columns:_1fr] content-center">
          <div className="self-end [grid-area:_span_1/span_1/span_1/span_1] relative overflow-hidden">
            <Link
              href="#"
              className="text-xs text-white tracking-[.02rem] uppercase"
            >
              *SITE INFO
            </Link>
          </div>
          <div className="justify-self-end gap-8 flex-col items-end flex[grid-area:_span_1/span_1/span_1/span_1]">
            <div className="relative overflow-hidden">
              <p className="text-[4rem] -tracking-[.1rem] text-white leading-normal">
                ©2024
              </p>
            </div>
            <div className="relative overflow-hidden">
              <p className="text-xs tracking-[.02rem] text-end uppercase text-white ">
                Alrights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        variants={{
          initial: {
            y: "100%",
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
        className="size-full absolute bg-[#222] inset-0 z-0"
      ></motion.div>
    </div>
  );
}

function ContactItem({ icon, text, link, href = "#" }) {
  return (
    <div className="flex gap-4">
      <div className="relative flex justify-center items-center size-6 top-0 bottom-auto left-auto right-0 rounded-full border border-white border-solid">
        <p className="text-[.7rem] uppercase tracking-[1px] text-[#f8fafc] leading-none font-normal">
          {icon}
        </p>
      </div>
      <div className="flex gap-3 flex-col -mt-1">
        <div className="relative overflow-hidden">
          <h4 className="text-2xl leading-tight text-[#f8fafc]">{text}</h4>
        </div>
        <div className="gap-[.2rem] flex-col flex overflow-hidden">
          <div className="flex z-[2] relative">
            <Link
              href={href}
              className="cursor-pointer relative whitespace-nowrap text-[#f8fafc] mb-px text-[.8rem] font-extralight leading-tight before:content-[''] before:absolute before:w-full before:h-px before:bg-current before:top-full before:left-0 before:pointer-events-none before:origin-[100%_50%] before:transition-transform before:duration-500 before:scale-x-0 hover:before:scale-x-100"
            >
              {link}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
