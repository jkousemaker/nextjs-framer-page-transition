"use client";

import dynamic from "next/dynamic";
import { Suspense, useRef, useMemo, useCallback, useEffect } from "react";
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

import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import { useScroll, useMotionValueEvent, useVelocity } from "framer-motion";
import CustomShaderMaterial from "three-custom-shader-material";
import { Curve } from "@/components/Layout/Curve";
import { shaderMaterial } from "@react-three/drei";
import { Vector2, Color } from "three";
import vertexShader from "!!raw-loader!./vertexShader.glsl";
import fragmentShader from "!!raw-loader!./fragmentShader.glsl";
export default function Projects() {
  return (
    <>
      <Curve backgroundColor="#B0AD98">
        <section className="h-[100vh]" />
        <section className="h-[300vh] bg-red-500/50"></section>
        <section className="h-[200vh]" />
        <div className="fixed inset-0 size-full">
          <View className="flex h-screen w-full flex-col items-center justify-center">
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </View>
        </div>
      </Curve>
    </>
  );
}

function Scene() {
  return (
    <>
      <AuroraPlane />
    </>
  );
}

function AuroraPlane() {
  const meshRef = useRef();
  const mousePosition = useRef({ x: 0, y: 0 });
  const { size } = useThree();
  const mouse = useMouse();
  const uniforms = useMemo(
    () => ({
      iTime: { value: 0.0 },
      iResolution: { value: new Vector2(0, 0) },
      iMouse: { value: new Vector2(0, 0) },
    }),
    []
  );
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.iTime.value = state.clock.elapsedTime;
      meshRef.current.material.uniforms.iResolution.value.set(
        size.width,
        size.height
      );
      meshRef.current.material.uniforms.iMouse.value.set(mouse.x, mouse.y);
    }
  });

  return (
    <mesh ref={meshRef} scale={0.5}>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
}
