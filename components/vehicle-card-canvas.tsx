"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group } from "three";
import type { Vehicle } from "@/data/vehicles";

const profiles: Record<Vehicle["id"], { scale: [number, number, number]; y: number }> = {
  sedan: { scale: [1, 1, 1], y: 0 },
  hatchback: { scale: [0.88, 0.92, 0.88], y: 0.04 },
  suv: { scale: [1.08, 1.16, 1.08], y: -0.02 },
  muv: { scale: [1.12, 1.08, 1.12], y: -0.02 },
};

function Model({ vehicle }: { vehicle: Vehicle["id"] }) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF("/models/low-poly-car.glb");
  const model = useMemo(() => scene.clone(), [scene]);
  const profile = profiles[vehicle];

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.2;
  });

  return <group ref={group} scale={profile.scale} position={[0, profile.y, 0]} rotation={[0.05, -0.4, 0]}><primitive object={model} /></group>;
}

export function VehicleCardCanvas({ vehicle }: { vehicle: Vehicle["id"] }) {
  return <Canvas camera={{ position: [3.2, 1.8, 3.8], fov: 38 }} dpr={[1, 1.25]} frameloop="always"><ambientLight intensity={1.5} /><directionalLight position={[3, 4, 3]} intensity={2.2} /><Model vehicle={vehicle} /></Canvas>;
}

useGLTF.preload("/models/low-poly-car.glb");
