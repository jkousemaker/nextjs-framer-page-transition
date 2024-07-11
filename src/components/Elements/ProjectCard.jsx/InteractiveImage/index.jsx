"use client";
import { useEffect, useRef, useState } from "react";
import { useFrame, extend, useThree } from "@react-three/fiber";
import {
  useTexture,
  Plane,
  shaderMaterial,
  Box,
  MeshDistortMaterial,
  useAspect,
  CameraShake,
  OrthographicCamera,
} from "@react-three/drei";
import Image from "next/image";
import * as THREE from "three";
import vertexShader from "!!raw-loader!@/shaders/BackgroundShader/vertexShader.glsl";
import fragmentShader from "!!raw-loader!@/shaders/BackgroundShader/fragmentShader.glsl";
import dynamic from "next/dynamic";
import { motion } from "framer-motion-3d";
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
import { lerp } from "three/src/math/MathUtils";
import { useSpring } from "framer-motion";
export default function InteractiveImage({ project }) {
  const shakeRef = useRef();

  return (
    <div className="relative pt-[65%]">
      <View className="absolute size-full inset-0">
        <Model />
        <OrthographicCamera makeDefault position={[0, 0, 1]} zoom={1} />
      </View>
    </div>
  );
}

function Model(props) {
  const imageRef = useRef();
  const depthMaterial = useRef();
  const [hovered, setHovered] = useState(false);
  const texture = useTexture("/imgs/home.webp");
  const depthMap = useTexture("/imgs/home_depth.webp");
  const size = useAspect(1920, 1080, 1);

  const currentMouse = useRef([0, 0]);
  const targetMouse = useRef([0, 0]);

  useFrame((state) => {
    if (hovered) {
      targetMouse.current = [state.pointer.x * 0.01, state.pointer.y * 0.01];
    } else {
      targetMouse.current = [0, 0];
    }

    // Smooth interpolation
    currentMouse.current[0] = lerp(
      currentMouse.current[0],
      targetMouse.current[0],
      0.1
    );
    currentMouse.current[1] = lerp(
      currentMouse.current[1],
      targetMouse.current[1],
      0.1
    );

    depthMaterial.current.uMouse = currentMouse.current;
  });

  return (
    <>
      <Rig hovered={hovered} />

      <Plane
        ref={imageRef}
        args={[1, 1]}
        scale={size}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <pseudo3DMaterial
          ref={depthMaterial}
          uImage={texture}
          uDepthMap={depthMap}
        />
      </Plane>
    </>
  );
}
function Rig({ hovered }) {
  const [vec] = useState(() => new THREE.Vector3());
  const cameraPosition = useRef(new THREE.Vector3(0, 1, 60));
  const targetPosition = useRef(new THREE.Vector3(0, 1, 60));
  const initialPosition = new THREE.Vector3(0, 1, 60);

  useFrame((state) => {
    if (hovered) {
      // Update target position when hovered
      targetPosition.current.set(state.pointer.x * 20, 1, 60);
    } else {
      // Reset target position when not hovered
      targetPosition.current.copy(initialPosition);
    }

    // Smoothly interpolate current camera position to target position
    cameraPosition.current.lerp(targetPosition.current, 0.05);

    // Apply the smoothed position to the camera
    state.camera.position.copy(cameraPosition.current);

    // Make the camera look at the center
    //state.camera.lookAt(0, 0, 0);
  });

  return (
    <CameraShake
      maxYaw={0.1}
      maxPitch={0.5}
      maxRoll={0}
      yawFrequency={5}
      pitchFrequency={5}
      rollFrequency={0}
      intensity={hovered ? 1 : 0.1} // Adjust intensity based on hover state
    />
  );
}

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
  
       vec2 parallax = (uMouse) * parallaxMult ;
  
       vec4 original = texture2D(uImage, (vUv + parallax));
       gl_FragColor = linearTosRGB(original);
    }
    `
);

extend({ Pseudo3DMaterial });
