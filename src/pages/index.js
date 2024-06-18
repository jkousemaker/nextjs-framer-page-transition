import { Canvas } from "@react-three/fiber";
import { useScroll, useMotionValueEvent, useVelocity } from "framer-motion";
import { Suspense, useEffect, useRef } from "react";
import { MotionCanvas } from "framer-motion-3d";
import Curve from "@/components/Layout/Curve";
import HomeCanvas from "@/components/Canvas/HomeCanvas";
import ProjectList from "@/components/Sections/ProjectList";

export default function Home() {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
  });
  useEffect(() => {
    console.log("test");
  }, []);

  return (
    <>
      <Curve backgroundColor="#000000">
        <section className="h-[100vh]">
          <ProjectList />
        </section>
        <section ref={ref} className="h-[300vh] bg-red-500/50"></section>
        <section className="h-[100vh]" />
        <div className="fixed inset-0 size-full">
          <Canvas>
            <Suspense fallback={null}>
              <HomeCanvas />
            </Suspense>
          </Canvas>
        </div>
      </Curve>
    </>
  );
}
