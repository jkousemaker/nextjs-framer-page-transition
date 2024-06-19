"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  Box,
  OrthographicCamera,
  PerspectiveCamera,
  Plane,
  Sphere,
  Stars,
  Torus,
} from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  useGLTF,
  ContactShadows,
  OrbitControls,
  useIntersect,
  ScreenSizer,
  shaderMaterial,
} from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useProgress } from "@react-three/drei";
import vertexShader from "@/shaders/GlowShader/vertex.js";
import fragmentShader from "@/shaders/GlowShader/fragment.js";
import { useControls } from "leva";
import { transform, useScroll, useSpring } from "framer-motion";
export default function ContactCanvas() {
  const ref = useRef();
  const { progress } = useProgress();
  const { scrollYProgress } = useScroll({});
  const scrollSpring = useSpring(scrollYProgress);
  useEffect(() => {
    console.log(ref.current);
    ref.current.u_resolution = [window.innerWidth, window.innerHeight];
  }, [progress]);

  useFrame(({ state, clock }) => {
    const uDisplace = transform(
      scrollYProgress.get(),
      [0, 0.3, 1],
      [0.0, 0.15, 1.0]
    );
    ref.current.uDisplace = uDisplace;
    //ref.current.uDisplace = Math.sin(clock.getElapsedTime() * 0.5) * 2;
    console.log(uDisplace);
  });
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 50]} />
      <ScreenSizer
        scale={1} // scale factor
      >
        <Box
          scale={10}
          args={[101, 100, 100]} // will render roughly as a 100px box
        >
          <glowShader ref={ref} />
        </Box>
      </ScreenSizer>
    </>
  );
}

function BasicModel(props) {
  const ref = useIntersect((visible) =>
    console.log("object is visible", visible)
  );
  return (
    <mesh ref={ref} {...props} dispose={null}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

function HeavyModel({ uniforms }) {
  const { scene, nodes } = useGLTF("/heave-car.glb");
  return <primitive object={scene} scale={1} />;
}

const GlowShader = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(),
    uDisplace: 2,
    uSpread: 4,
    uNoise: 16,
  },
  vertexShader,
  fragmentShader
);

// declaratively
extend({ GlowShader });
