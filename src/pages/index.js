import { Canvas } from "@react-three/fiber";

import { Suspense } from "react";

import Curve from "@/components/Layout/Curve";
import Scene from "@/Scene";
export default function Home() {
  return (
    <>
      <Curve backgroundColor="#B0AD98">
        <div className="fixed inset-0 size-full z-[9999]">
          <Canvas>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </div>
      </Curve>
    </>
  );
}
