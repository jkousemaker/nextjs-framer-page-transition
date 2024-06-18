import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { extend } from "@react-three/fiber";
import { useRef } from "react";
import {
  PerspectiveCamera,
  shaderMaterial,
  SpotLight,
} from "@react-three/drei";
import {
  useVelocity,
  transform,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { useControls } from "leva";
import { vertex, fragment } from "@/shaders/NoisyMaterial";

export default function Scene({ scrollY }) {
  const { uthreshold } = useControls({
    u_threshold: { value: 0.25, min: 0, max: 20, step: 0.1 },
    u_color: { value: "#ff0000" },
  });
  const uniforms = useRef({
    u_time: 0,
    u_threshold: 1.0,
    u_resolution: new THREE.Vector2(0.0, 0.0),
    u_color: new THREE.Color(0.2, 0.0, 0.1),
  });
  const noisyMaterial = useRef();
  const velocity = useVelocity(scrollY);
  const springVelocity = useSpring(velocity, { stiffness: 100, damping: 20 });
  useMotionValueEvent(velocity, "change", (latest) => {
    console.log(latest);
  });
  const { scene, camera, size } = useThree();
  const threshold = transform(springVelocity.get(), [0, 1], [5.0, 30.0], {
    clamp: false,
  });
  useFrame((state, delta, clock) => {
    noisyMaterial.current.uniforms.uniforms.current.u_time += delta;
    noisyMaterial.current.uniforms.uniforms.current.u_threshold = threshold;
    console.log(noisyMaterial.current.uniforms.uniforms.current);
  });
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.4, 18.22]} />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={5} position={[0, 10, 5]} />
      <ShaderBlob />
      <mesh position={0}>
        <icosahedronGeometry args={[4, 30]} />
        <shaderMaterial
          uniforms={{
            uniforms,
          }}
          u_resolution={[size.width, size.height]}
          fragmentShader={fragment}
          vertexShader={vertex}
          ref={noisyMaterial}
          wireframe
        />
        {/* <noisyMaterial
          uTime={0}
          uResolution={[size.width, size.height]}
          color="indigo"
          metalness={0.6}
          roughness={0.4}
          ref={noisyMaterial}
          wireframe
        /> */}
      </mesh>
    </>
  );
}

function ShaderBlob() {
  return <></>;
}
