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
  shaderMaterial,
} from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useProgress } from "@react-three/drei";
import vertexShader from "@/shaders/GlowShader/vertex.js";
import fragmentShader from "@/shaders/GlowShader/fragment.js";
export default function ContactCanvas() {
  const ref = useRef();
  const { progress } = useProgress();
  useEffect(() => {
    console.log(progress);
  }, [progress]);
  useFrame(({ state, clock }) => {
    ref.current.uNoise = Math.sin(clock.getElapsedTime()) * 20;
    console.log();
  });
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 50]} />
      <Box args={[10, 20, 20]}>
        <glowShader ref={ref} />
      </Box>
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

function HeavyModel() {
  const { scene, nodes } = useGLTF("/heave-car.glb");
  return <primitive object={scene} scale={1} />;
}

const GlowShader = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(),
    uDisplace: 2,
    uSpread: 1.2,
    uNoise: 16,
  },
  vertexShader,
  fragmentShader
);

// declaratively
extend({ GlowShader });
