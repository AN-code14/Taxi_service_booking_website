"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { Vehicle } from "@/data/vehicles";

const VehicleCardCanvas = dynamic(() => import("./vehicle-card-canvas").then((module) => module.VehicleCardCanvas), {
  ssr: false,
  loading: () => <VehicleFallback />,
});

function VehicleFallback() {
  return <div className="vehicle-fallback" aria-hidden="true"><span>▰</span></div>;
}

function canRender3d() {
  const media = window.matchMedia("(min-width: 761px) and (min-height: 500px) and (prefers-reduced-motion: no-preference)");
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  const slowConnection = connection?.saveData || ["slow-2g", "2g"].includes(connection?.effectiveType || "");
  return media.matches && !slowConnection;
}

export function VehicleCardScene({ vehicle }: { vehicle: Vehicle["id"] }) {
  const [render3d, setRender3d] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setRender3d(canRender3d()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  return <div className="vehicle-scene" aria-label={`${vehicle} 3D preview`}>{render3d ? <VehicleCardCanvas vehicle={vehicle} /> : <VehicleFallback />}</div>;
}
