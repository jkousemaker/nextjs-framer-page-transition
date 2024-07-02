import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";

import { useRouter } from "next/router";
import { ReactLenis, useLenis } from "lenis/react";
import dynamic from "next/dynamic";
import { useProgress } from "@react-three/drei";

import { useEffect, useRef, useCallback } from "react";

import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import useMouse from "@/utils/hooks/useMouse";
import RouteListener from "./route-listener";

const RatScene = dynamic(() => import("@/components/Canvas/index"), {
  ssr: false,
});
const View = dynamic(() => import("@/components/Canvas/View"), {
  ssr: false,
});
export default function App({ Component, pageProps }) {
  const { progress } = useProgress();
  const router = useRouter();
  const mouse = useMouse();
  const mousePosition = useRef({ x: 0, y: 0 });
  const container = useRef();
  function calculateEasing(t) {
    const easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
    return easing(t);
  }
  useEffect(() => {
    if (mouse) {
      mousePosition.current = mouse;
    }
  }, [router.route, mouse]);
  return (
    <ScrollHandler router={router}>
      <div ref={container} className=""></div>
      <Header />

      <main className="">
        <AnimatePresence mode="wait">
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
      </main>
      <Footer />
      <RatScene
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
        }}
        eventSource={container}
        eventPrefix="client"
        className="text-[6rem] font-semibold tracking-tight"
      />
    </ScrollHandler>
  );
}

function ScrollHandler({ children, router, ...props }) {
  const lenis = useLenis();
  function calculateEasing(t) {
    const easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
    return easing(t);
  }
  useEffect(() => {
    if (lenis) {
      //lenis.scrollTo("body");
    }
    scrollTo({ top: 0, behavior: "smooth" });
  }, [router, lenis]);
  return (
    <ReactLenis options={{ duration: 1, easing: calculateEasing }} root>
      <button
        onClick={() => {
          lenis.scrollTo("body");
        }}
        // disabled={!isLenisReady}
        className="fixed top-44 p-5 rounded-xl bg-black text-white shadow-2xl shadow-white, "
      >
        Scroll to Element
      </button>
      <RouteListener />
      {children}
    </ReactLenis>
  );
}
