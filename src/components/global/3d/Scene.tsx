import type { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";

import { Lighting } from "@/components/global/3d/Lighting";

interface SceneProps {
  children?: ReactNode;
  className?: string;
}

export function Scene({ children, className }: SceneProps) {
  return (
    <Canvas className={className} camera={{ position: [0, 0, 6], fov: 45 }}>
      <Lighting />
      {children}
    </Canvas>
  );
}
