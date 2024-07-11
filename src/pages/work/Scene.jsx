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
      <group position={[0, -0.5, 0]}>
        <Model />
      </group>

      <Environment preset="city" />
      <fog attach="fog" args={["#191920", 0, 15]} />
    </>
  );
}

function Model(props) {
  const [hovered, setHover] = useState(false);
  const depthMaterial = useRef();
  const texture = useTexture("/imgs/color-mountains.jpg");
  const depthMap = useTexture("/imgs/depth-mountains.png");
  const { viewport } = useThree();
  const mouse = useMotionValue({ x: 0, y: 0 });
  useFrame((state) => {
    if (hovered) {
      depthMaterial.current.uMouse = [
        state.pointer.x * 0.01,
        state.pointer.y * 0.01,
      ];
    }
  });
  useCursor(hovered);
  const MotionPlane = motion(Plane);
  return (
    <MotionPlane
      onPointerOver={(e) => {
        setHover(true);
        console.log("hovered");
      }}
      onPointerOut={(e) => setHover(false)}
      args={[1, 1]}
      scale={[viewport.width, viewport.height, 1]}
    >
      <pseudo3DMaterial
        ref={depthMaterial}
        uImage={texture}
        uDepthMap={depthMap}
      />
    </MotionPlane>
  );
}

export const ImageFadeMaterial = shaderMaterial(
  {
    effectFactor: 1.2,
    dispFactor: 0,
    tex: undefined,
    tex2: undefined,
    disp: undefined,
  },
  ` varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
  ` varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform sampler2D disp;
    uniform float _rot;
    uniform float dispFactor;
    uniform float effectFactor;
    void main() {
      vec2 uv = vUv;
      vec4 disp = texture2D(disp, uv);
      vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
      vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
      vec4 _texture = texture2D(tex, distortedPosition);
      vec4 _texture2 = texture2D(tex2, distortedPosition2);
      vec4 finalTexture = mix(_texture, _texture2, dispFactor);
      gl_FragColor = finalTexture;
      #include <tonemapping_fragment>
    }`
);

export const Pseudo3DMaterial = shaderMaterial(
  { uMouse: [0, 0], uImage: null, uDepthMap: null },
  `
  varying vec2 vUv;
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
    vUv = uv;
  }`,
  `
  precision mediump float;

  uniform vec2 uMouse;
  uniform sampler2D uImage;
  uniform sampler2D uDepthMap;

  varying vec2 vUv;

  vec4 linearTosRGB( in vec4 value ) {
    return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
  }
  
  
  void main() {
     vec4 depthDistortion = texture2D(uDepthMap, vUv);
     float parallaxMult = depthDistortion.r;

     vec2 parallax = (uMouse) * parallaxMult;

     vec4 original = texture2D(uImage, (vUv + parallax));
     gl_FragColor = linearTosRGB(original);
  }
  `
);

extend({ ImageFadeMaterial, Pseudo3DMaterial });
