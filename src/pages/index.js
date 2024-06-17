import { Canvas } from "@react-three/fiber";
import { useScroll, useMotionValueEvent, useVelocity } from "framer-motion";
import { Suspense, useRef } from "react";

import Curve from "@/components/Layout/Curve";
import Scene from "@/Scene";
export default function Home() {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  return (
    <>
      <Curve backgroundColor="#B0AD98">
        <section className="h-[100vh]" />
        <section ref={ref} className="h-[300vh] bg-red-500/50"></section>
        <section className="h-[200vh]" />
        <div className="fixed inset-0 size-full">
          <Canvas>
            <Suspense fallback={null}>
              <Scene scrollY={scrollYProgress} />
            </Suspense>
          </Canvas>
        </div>
      </Curve>
    </>
  );
}
