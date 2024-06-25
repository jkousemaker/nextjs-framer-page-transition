import {
  Html,
  OrbitControls,
  OrthographicCamera,
  Plane,
  View,
  useGLTF,
  useAspect,
  useTexture,
  useScroll,
} from "@react-three/drei";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useCallback } from "react";
import { Vector2, Color } from "three";
import { Curve } from "@/components/Layout/Curve";

import vertexShader from "!!raw-loader!./vertexShader.glsl";
import fragmentShader from "!!raw-loader!./fragmentShader.glsl";
import "@/utils/materials";
export default function Home({}) {
  return (
    <Curve backgroundColor="#999d9e">
      <section className="h-screen">
        <div className="grid size-full grid-cols-11 grid-rows-7 p-10 gap-5">
          <div className="bg-blue-500/50 col-span-full row-span-3 overflow-hidden rounded-3xl">
            <View
              camera={{ position: [0.0, 0.0, 1.5] }}
              className="w-full h-screen relative"
            >
              <HomeCanvas />
            </View>
          </div>
          <div className="bg-gray-500/50 col-span-5"></div>
          <div className="bg-gray-900/50 col-span-1"></div>
          <div className="bg-gray-500/50 col-span-5"></div>
          <div className="bg-black/50 col-span-5 row-span-3 flex flex-col items-start justify-between">
            <button className="bg-black text-white text-md font-thin py-1 px-4 rounded-full">
              Join The Revolution
            </button>
            <h1 className="text-9xl font-semibold tracking-tight">
              <span>Gabryella</span>
              <br />
              <span>Teixeira</span>
            </h1>
          </div>
          <div className="bg-red-500/50 col-span-1 row-span-3 flex items-end justify-center">
            <p className="text-3xl">Logo</p>
          </div>
          <div className="bg-black/50 col-span-5 row-span-3"></div>
        </div>
      </section>
    </Curve>
  );
}
function HomeCanvas() {
  return (
    <>
      <ambientLight intensity={2} />
      <Gradient />
    </>
  );
}

const Gradient = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const mousePosition = useRef({ x: 0, y: 0 });
  const scale = useAspect(
    1920, // Pixel-width
    1080, // Pixel-height
    1 // Optional scaling factor
  );

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_mouse: { value: new Vector2(0, 0) },
      u_bg: {
        value: new Color("#A1A3F7"),
      },
      u_colorA: { value: new Color("#9FBAF9") },
      u_colorB: { value: new Color("#FEB3D9") },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;

    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    mesh.current.material.uniforms.u_mouse.value = new Vector2(
      mousePosition.current.x / 2,
      mousePosition.current.y / 2
    );
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={scale}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};

function BlenderLogo() {
  const { scene } = useGLTF("/models/unreal_engine_logo.glb");
  return <primitive object={scene} scale={0.1} />;
}
