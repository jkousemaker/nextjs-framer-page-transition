import dynamic from "next/dynamic";
import * as THREE from "three";
import { Curve } from "@/components/Layout/Curve";
import {
  OrthographicCamera,
  Plane,
  shaderMaterial,
  useAspect,
} from "@react-three/drei";
import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import vertexShader from "!!raw-loader!@/shaders/SpaceShader/vertexShader.glsl";
import fragmentShader from "!!raw-loader!@/shaders/SpaceShader/fragmentShader.glsl";
import useMouse from "@/utils/hooks/useMouse";
const View = dynamic(
  () => import("@/components/Canvas/View").then((mod) => mod.View),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-96 w-full flex-col items-center justify-center">
        <svg
          className="-ml-1 mr-3 h-5 w-5 animate-spin text-black"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    ),
  }
);

export default function Playground({}) {
  return (
    <Curve>
      <main className="">
        <View className="flex h-screen w-full flex-col items-center justify-center">
          <Scene />
        </View>
      </main>
    </Curve>
  );
}

function Scene({}) {
  const mouse = useMouse();
  const { size } = useThree();
  const aspect = useAspect(1920, 1080, 1);
  const material = useRef();
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    material.current.uniforms.iTime.value = elapsedTime * 2;
  });
  return (
    <>
      <group scale={1}>
        <Plane scale={aspect} args={[1, 1]}>
          <shaderMaterial
            ref={material}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={{
              iTime: { value: 0 },
              iResolution: {
                value: new THREE.Vector2(size.width, size.height),
              },
            }}
          />
        </Plane>
      </group>
    </>
  );
}
