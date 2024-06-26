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

import "@/utils/materials";
export default function About() {
  return (
    <Curve backgroundColor="#999d9e">
      <section className="h-screen">
        <h1 className="text-9xl">About</h1>
      </section>
    </Curve>
  );
}
