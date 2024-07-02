"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { r3f } from "@/utils/global";
import * as THREE from "three";
import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

export default function RatCanvas({ ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  const progress = useProgress();
  return (
    <Canvas
      {...props}
      onCreated={(state) => (state.gl.toneMapping = THREE.AgXToneMapping)}
      eventSource={document.getElementById("__next")}
    >
      <r3f.Out />
      <Preload all />
    </Canvas>
  );
}
