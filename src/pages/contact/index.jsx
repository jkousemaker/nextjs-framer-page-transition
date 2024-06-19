import { Canvas } from "@react-three/fiber";
import { useScroll, useMotionValueEvent, useVelocity } from "framer-motion";
import { Suspense, useRef } from "react";
import CustomShaderMaterial from "three-custom-shader-material";
import Curve from "@/components/Layout/Curve";
import ContactCanvas from "@/components/Canvas/ContactCanvas";
export default function Contact() {
  return (
    <>
      <Curve backgroundColor="#B0AD98">
        <section className="h-[300vh] bg-red-500/50"></section>

        <div className="fixed inset-0 size-full">
          <Canvas>
            <Suspense fallback={null}>
              <ContactCanvas />
            </Suspense>
          </Canvas>
        </div>
      </Curve>
    </>
  );
}
