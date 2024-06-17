import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";

import { useRouter } from "next/router";
import { ReactLenis, useLenis } from "lenis/react";
import dynamic from "next/dynamic";

import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import RouteListener from "./route-listener";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <ReactLenis options={{ lerp: 0.05 }} root>
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
