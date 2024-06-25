import { Canvas } from "@react-three/fiber";
import { useScroll, useMotionValueEvent, useVelocity } from "framer-motion";
import { Suspense, useRef } from "react";
import CustomShaderMaterial from "three-custom-shader-material";
import { Curve } from "@/components/Layout/Curve";
import ContactCanvas from "@/components/Canvas/ContactCanvas";

import InputField from "@/components/Elements/InputField.jsx";
export default function Contact() {
  return (
    <>
      <Curve backgroundColor="#B0AD98">
        <div className="relative z-10 h-[300vh]">
          <section className="h-screen grid place-items-center">
            <h1 className="text-9xl font-black font-serif">Contact</h1>
          </section>
          <section className="h-screen w-full  px-24">
            <div className="w-full border-2 rounded-2xl h-20">
              <h1 className="text-5xl font-black font-serif">Write me</h1>
              <InputField type="email" name="email" placeholder="Your email" />
            </div>
          </section>
        </div>
        <div className="fixed inset-0 size-full z-0">
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
