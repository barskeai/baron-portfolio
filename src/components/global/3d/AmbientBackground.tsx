import { Component, useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

import { Scene } from "@/components/global/3d/Scene";
import { useOSStore } from "@/store/osStore";

const ENERGIZED_SPEED_MULTIPLIER = 2.2;
const ENERGY_LERP_RATE = 2;

interface DriftingShapeProps {
  position: [number, number, number];
  speed: number;
  radius?: number;
  opacity?: number;
  variant?: "icosahedron" | "octahedron";
}

function DriftingShape({
  position,
  speed,
  radius = 1,
  opacity = 0.16,
  variant = "icosahedron",
}: DriftingShapeProps) {
  const meshRef = useRef<Mesh>(null);
  const energyRef = useRef(1);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const transitioning = useOSStore.getState().portalTransition.phase !== "idle";
    const targetEnergy = transitioning ? ENERGIZED_SPEED_MULTIPLIER : 1;
    energyRef.current += (targetEnergy - energyRef.current) * Math.min(delta * ENERGY_LERP_RATE, 1);

    meshRef.current.rotation.x += delta * speed * energyRef.current;
    meshRef.current.rotation.y += delta * speed * 0.6 * energyRef.current;
  });

  return (
    <mesh ref={meshRef} position={position}>
      {variant === "octahedron" ? (
        <octahedronGeometry args={[radius, 0]} />
      ) : (
        <icosahedronGeometry args={[radius, 0]} />
      )}
      <meshStandardMaterial color="#7cff6b" wireframe transparent opacity={opacity} />
    </mesh>
  );
}

interface SceneErrorBoundaryState {
  hasError: boolean;
}

class SceneErrorBoundary extends Component<{ children: ReactNode }, SceneErrorBoundaryState> {
  state: SceneErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export function AmbientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <SceneErrorBoundary>
        <Scene className="h-full w-full">
          <DriftingShape position={[-3, 1.8, -2]} speed={0.05} radius={1.1} opacity={0.18} />
          <DriftingShape position={[3.2, -1.4, -2.5]} speed={0.04} radius={0.9} opacity={0.15} variant="octahedron" />
          <DriftingShape position={[-2.2, -2.1, -3.5]} speed={0.06} radius={0.8} opacity={0.14} />
          <DriftingShape position={[2.6, 2.1, -3]} speed={0.045} radius={1.3} opacity={0.16} variant="octahedron" />
        </Scene>
      </SceneErrorBoundary>
    </div>
  );
}
