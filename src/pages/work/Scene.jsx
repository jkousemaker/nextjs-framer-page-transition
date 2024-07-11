"use client";

import dynamic from "next/dynamic";
import { Suspense, useRef, useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion-3d";
import { useMotionValue, useSpring } from "framer-motion";
import { useThree, useFrame, extend } from "@react-three/fiber";
import {
  MeshReflectorMaterial,
  Environment,
  Image,
  Text,
  useCursor,
  useTexture,
  shaderMaterial,
  Plane,
} from "@react-three/drei";
import * as THREE from "three";
import { projects as work } from "@/data/projects";

export default function Scene() {
  return (
    <>
      <Environment preset="city" />
      <fog attach="fog" args={["#191920", 0, 15]} />
    </>
  );
}
