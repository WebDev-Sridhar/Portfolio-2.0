import React, { Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// ——— LIST OF ICONS ———
import {
  SiReact,
  SiJavascript,
  SiPython,
  SiFirebase,
  SiTailwindcss,
  SiNodedotjs,
  SiHtml5,
  SiCss3,
  SiGit,
  SiMongodb,
  SiMysql,
  SiTypescript,
  SiRedux
} from "react-icons/si";

// Icon List (fixed order around the sphere)
const ICONS = [
  SiReact, SiJavascript, SiPython, SiFirebase, SiTailwindcss, SiNodedotjs,
  SiHtml5, SiCss3, SiGit, SiMongodb, SiMysql, SiTypescript, SiRedux
];

// ----------------------------------------------------
// ICON POSITIONING ON A SPHERE
// ----------------------------------------------------
function useSpherePoints(count, radius) {
  return useMemo(() => {
    const pts = [];
    const phiStep = Math.PI / (count / 2);

    for (let i = 0; i < count; i++) {
      const phi = i * phiStep;
      const theta = i * phiStep * 0.008; // golden angle in radians

      pts.push(
        new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        )
      );
    }
    return pts;
  }, [count, radius]);
}

// ----------------------------------------------------
// ICON OBJECT (3D POSITIONED)
// ----------------------------------------------------
function Icon3D({ Icon, position, size }) {
  return (
    <Html position={position} center style={{ pointerEvents: "none" }}>
      <div

        
      >
        <Icon size={size} color = "#7c3ca1" />
      </div>
    </Html>
  );
}

// ----------------------------------------------------
// ROTATING SPHERE OF ICONS
// ----------------------------------------------------
function SphereIcons() {
  const radius = 2;
  const points = useSpherePoints(ICONS.length, radius);
  const groupRef = React.useRef();

  // Continuous rotation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.006; // horizontal spin
      groupRef.current.rotation.x += 0.008; // slight tilt spin
    }
  });

  return (
    <group ref={groupRef}>
      {points.map((pos, i) => (
        <Icon3D
          key={i}
          Icon={ICONS[i]}
          position={[pos.x, pos.y, pos.z]}
          size={30}
          
        />
      ))}
    </group>
  );
}

// ----------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------
export default function TechSphere() {
  return (
    <div className="w-full h[450px] md:h-[550px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <Suspense fallback={null}>

          {/* Lighting */}
          <ambientLight intensity={0.7} />
          <pointLight intensity={1.3} position={[4, 4, 4]} />
          <pointLight intensity={0.6} position={[-4, -4, -4]} />

          {/* Sphere icons */}
          <SphereIcons   />

          {/* Debug camera control (optional) */}
          {/* <OrbitControls enableZoom={false} /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}
