"use client";

import dynamic from "next/dynamic";
import { Suspense, useRef, useMemo, useEffect } from "react";

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

import { useThree, useFrame } from "@react-three/fiber";

import { Curve } from "@/components/Layout/Curve";
import { Vector2 } from "three";
import vertexShader from "!!raw-loader!./vertexShader.glsl";
import fragmentShader from "!!raw-loader!./fragmentShader.glsl";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/Elements/ProjectCard.jsx";
export default function Projects() {
  return (
    <>
      <Curve backgroundColor="#B0AD98">
        <section className="relative w-full grid grid-cols-[repeat(12,minmax(0,1fr))] gap-x-[2vw] py-[clamp(30px,4vw,50px)] px-[max(5vw,40px)]">
          <div className="relative col-[1_/_span_12] leading-none">
            <h4 className="text-[8vw] tracking-tight font-medium leading-[1.4] inline-block">
              <div className="flex flex-row flex-nowrap">
                <SplitWord>Feautured</SplitWord>
                &nbsp;
                <SplitWord>Work</SplitWord>
              </div>
            </h4>
          </div>
          <div className="absolute right-0 bottom-0 w-[calc((100%-11*2vw)/12)_*_3_+_2_v_w_*2]"></div>
          <div className="relative w-full grid grid-cols-[repeat(12,minmax(0,1fr))] gap-x-[2vw] mt-[calc(10px*8)]">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project}>
                <View className="size-full absolute inset-0">
                  <Suspense fallback={null}>
                    <Scene />
                  </Suspense>
                </View>
              </ProjectCard>
            ))}
          </div>
        </section>
      </Curve>
    </>
  );
}

function SplitWord({ children }) {
  const words = children.split("");
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
    </span>
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
  const { size } = useThree();
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
      meshRef.current.material.uniforms.iTime.value =
        state.clock.elapsedTime * 20;
      meshRef.current.material.uniforms.iResolution.value.set(
        size.width,
        size.height
      );
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
