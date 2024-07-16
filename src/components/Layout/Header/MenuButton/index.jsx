import React, { useRef } from "react";
import { animate, motion, useMotionValue } from "framer-motion";

function MenuButton({ setMenuOpen, menuOpen }) {
  const xt = useMotionValue(0);
  const yt = useMotionValue(0);
  const buttonRef = useRef(null);
  const absoluteDivRef = useRef(null);
  const cursorSize = 40;
  const handlePointerEnter = (e) => {
    if (buttonRef.current && absoluteDivRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - cursorSize;
      const y = e.clientY - rect.top - cursorSize;
      xt.set(x);
      yt.set(y);
      //absoluteDivRef.current.style.left = `${x}px`;
      //absoluteDivRef.current.style.top = `${y}px`;
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      onPointerEnter={handlePointerEnter}
      onClick={() => setMenuOpen(!menuOpen)}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="pointer-events-auto py-2 px-5 rounded-full text-xl uppercase font-semibold tracking-tight relative bg-white overflow-hidden z-50"
    >
      <motion.div
        variants={{
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 0, opacity: 1 },
          hover: { scale: 5 },
        }}
        ref={absoluteDivRef}
        style={{ width: cursorSize, height: cursorSize, x: xt, y: yt }}
        className="absolute pointer-events-none bg-black rounded-full transition-all duration-100 ease-out z-0"
      ></motion.div>
      <p className="relative z-20 text-white mix-blend-difference">Menu</p>
    </motion.button>
  );
}

export default MenuButton;
