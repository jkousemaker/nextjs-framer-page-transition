import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";

import { useRouter } from "next/router";
import { ReactLenis, useLenis } from "lenis/react";
import dynamic from "next/dynamic";
import { useProgress } from "@react-three/drei";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import RouteListener from "./route-listener";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const { progress } = useProgress();
  const router = useRouter();
  const lenis = useLenis();
  useEffect(() => {
    console;
  }, [progress]);

  return (
    <ReactLenis options={{ duration: 1 }} root>
      <RouteListener />
      <Header />
      <main className="">
        <AnimatePresence mode="wait">
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
      </main>
      <Footer />
    </ReactLenis>
  );
}
