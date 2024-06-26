import {
  Html,
  OrbitControls,
  OrthographicCamera,
  Plane,
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
import dynamic from "next/dynamic";
import ParallaxText from "@/components/Elements/ParallaxText";

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
import vertexShader from "!!raw-loader!@/shaders/BackgroundShader/vertexShader.glsl";
import fragmentShader from "!!raw-loader!@/shaders/BackgroundShader/fragmentShader.glsl";
import "@/utils/materials";
export default function HeroSection() {
  return (
    <section className="h-screen ">
      <div className="grid size-full grid-cols-11 grid-rows-7 p-10 gap-5">
        <View
          as="div"
          camera={{ position: [0.0, 0.0, 1.5] }}
          className="bg-blue-500/50 col-span-full row-span-3 overflow-hidden rounded-3xl"
        >
          <AboutCanvas />
        </View>

        <div className="bg-gray-500/50 col-span-5"></div>
        <div className="bg-gray-900/50 col-span-1"></div>
        <div className="bg-gray-500/50 col-span-5"></div>
        <div className="bg-black/50 col-span-5 row-span-3 flex flex-col items-start justify-between">
          <button className="bg-black text-white text-md font-thin py-1 px-4 rounded-full">
            Join The Revolution
          </button>
          <h1 className="text-9xl font-semibold tracking-[1em]">
            <ParallaxText baseVelocity={-5}>Gabryella Teixeira</ParallaxText>
            <ParallaxText baseVelocity={10}>
              <div className="flex flex-row gap-56">
                <p>Creative Designer</p>
                <p>Moddeler</p>
              </div>
            </ParallaxText>
          </h1>
        </div>
        <div className="bg-red-500/50 col-span-1 row-span-3 flex items-end justify-center">
          <p className="text-3xl">Logo</p>
        </div>
        <div className="bg-black/50 col-span-5 row-span-3"></div>
      </div>
    </section>
  );
}

function AboutCanvas() {
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
  const updateMousePosition = useCallback((e) => {
    mousePosition.current = { x: e.pageX, y: e.pageY };
  }, []);

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

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition, false);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition, false);
    };
  }, [updateMousePosition]);

  useFrame((state) => {
    const { clock } = state;

    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    mesh.current.material.uniforms.u_mouse.value = new Vector2(
      mousePosition.current.x,
      mousePosition.current.y
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
