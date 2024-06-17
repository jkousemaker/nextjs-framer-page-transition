import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";

import { useRouter } from "next/router";

import dynamic from "next/dynamic";

import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import RouteListener from "./route-listener";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <RouteListener />
      <Header />
      <main className="">
        <AnimatePresence mode="wait">
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
