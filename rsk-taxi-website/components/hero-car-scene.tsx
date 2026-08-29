"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group } from "three";

function CarModel() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF("/models/low-poly-car.glb");
  const carModel = useMemo(() => scene.clone(), [scene]);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.18;
    }
  });

  useMemo(() => {
    carModel.traverse((child) => {
      if ("isMesh" in child) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [carModel]);

  return (
    <group ref={group} rotation={[0.05, -0.35, 0]} position={[0, -0.35, 0]}>
      <primitive object={carModel} scale={0.9} position={[0, 0.15, 0]} />
    </group>
  );
}

export function CarScene() {
  useGLTF.preload("/models/low-poly-car.glb");

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 2, opacity: .92 }}>
      <Canvas shadows camera={{ position: [4.2, 2.6, 5.2], fov: 36 }}>
        <ambientLight intensity={1.7} />
        <directionalLight position={[3, 5, 4]} intensity={3} color="#fff1d1" castShadow />
        <CarModel />
        <ContactShadows position={[0, -0.75, 0]} opacity={.25} scale={5} blur={2} />
        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={1.1} maxPolarAngle={1.8} />
      </Canvas>
    </div>
  );
}