import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";

import { useRouter } from "next/router";
import { ReactLenis, useLenis } from "lenis/react";
import dynamic from "next/dynamic";

import { useRef } from "react";

import Header from "@/components/Layout/Header";

const RatScene = dynamic(() => import("@/components/Canvas/index"), {
  ssr: false,
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const container = useRef();

  return (
    <ReactLenis root>
      <div ref={container} className=""></div>
      <Header />

      <main className="">
        <AnimatePresence mode="wait">
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
      </main>
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
    </ReactLenis>
  );
}
