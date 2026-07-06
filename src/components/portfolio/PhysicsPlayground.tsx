"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Octahedron, Tetrahedron, Box, Torus, Icosahedron } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import SectionHeading from "./SectionHeading";
import { motion } from "framer-motion";
import { Sparkles, Activity } from "lucide-react";

/**
 * Custom physics simulation — no WASM dependency.
 * Each marble has position, velocity, angular velocity. We integrate
 * gravity, floor/wall collisions, and sphere-sphere collisions manually.
 * Always works, no external libs needed.
 */

type Marble = {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  angVel: THREE.Vector3;
  rot: THREE.Euler;
  radius: number;
  color: string;
  type: "octahedron" | "tetrahedron" | "box" | "torus" | "icosa";
  mesh: THREE.Object3D | null;
};

const NEON_COLORS = [
  "#00ffff", // cyan
  "#ff00ff", // magenta
  "#00ff88", // green
  "#ff0066", // hot pink
  "#ffaa00", // amber
  "#8800ff", // violet
  "#0088ff", // blue
  "#ffff00", // yellow
];

const MARBLE_COUNT = 10;

function Simulation() {
  const groupRef = useRef<THREE.Group>(null);
  // Use a ref for mutable physics state — lint forbids mutating useMemo values
  const marblesRef = useRef<Marble[] | null>(null);
  if (marblesRef.current === null) {
    const types: Marble["type"][] = ["octahedron", "tetrahedron", "box", "torus", "icosa"];
    marblesRef.current = Array.from({ length: MARBLE_COUNT }).map((_, i) => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        3 + Math.random() * 3,
        (Math.random() - 0.5) * 2
      ),
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        0,
        (Math.random() - 0.5) * 1
      ),
      angVel: new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      ),
      rot: new THREE.Euler(0, 0, 0),
      radius: 0.22 + Math.random() * 0.1,
      color: NEON_COLORS[i % NEON_COLORS.length],
      type: types[i % types.length],
      mesh: null,
    }));
  }
  const marbles = marblesRef.current;

  // Physics constants
  const GRAVITY = -5;
  const FLOOR_Y = -2.5;
  const WALL_X = 5.5;
  const WALL_Z = 2.5;
  const RESTITUTION = 0.75;
  const FRICTION = 0.99;

  useFrame((_, delta) => {
    // Clamp delta to prevent instability on tab switch
    const dt = Math.min(delta, 1 / 30);

    // Update each marble
    for (let i = 0; i < marbles.length; i++) {
      const m = marbles[i];

      // Apply gravity
      m.vel.y += GRAVITY * dt;

      // Apply friction (air resistance)
      m.vel.multiplyScalar(FRICTION);

      // Update position
      m.pos.x += m.vel.x * dt;
      m.pos.y += m.vel.y * dt;
      m.pos.z += m.vel.z * dt;

      // Floor collision
      if (m.pos.y - m.radius < FLOOR_Y) {
        m.pos.y = FLOOR_Y + m.radius;
        m.vel.y = -m.vel.y * RESTITUTION;
        m.vel.x *= 0.92;
        m.vel.z *= 0.92;
      }

      // Wall collisions (X)
      if (m.pos.x - m.radius < -WALL_X) {
        m.pos.x = -WALL_X + m.radius;
        m.vel.x = -m.vel.x * RESTITUTION;
      }
      if (m.pos.x + m.radius > WALL_X) {
        m.pos.x = WALL_X - m.radius;
        m.vel.x = -m.vel.x * RESTITUTION;
      }

      // Wall collisions (Z)
      if (m.pos.z - m.radius < -WALL_Z) {
        m.pos.z = -WALL_Z + m.radius;
        m.vel.z = -m.vel.z * RESTITUTION;
      }
      if (m.pos.z + m.radius > WALL_Z) {
        m.pos.z = WALL_Z - m.radius;
        m.vel.z = -m.vel.z * RESTITUTION;
      }

      // Update rotation
      m.rot.x += m.angVel.x * dt;
      m.rot.y += m.angVel.y * dt;
      m.rot.z += m.angVel.z * dt;

      // Apply to mesh
      if (m.mesh) {
        m.mesh.position.copy(m.pos);
        m.mesh.rotation.copy(m.rot);
      }
    }

    // Sphere-sphere collisions
    for (let i = 0; i < marbles.length; i++) {
      for (let j = i + 1; j < marbles.length; j++) {
        const a = marbles[i];
        const b = marbles[j];
        const dx = b.pos.x - a.pos.x;
        const dy = b.pos.y - a.pos.y;
        const dz = b.pos.z - a.pos.z;
        const distSq = dx * dx + dy * dy + dz * dz;
        const minDist = a.radius + b.radius;
        if (distSq < minDist * minDist && distSq > 0.0001) {
          const dist = Math.sqrt(distSq);
          const nx = dx / dist;
          const ny = dy / dist;
          const nz = dz / dist;
          // Separate
          const overlap = (minDist - dist) / 2;
          a.pos.x -= nx * overlap;
          a.pos.y -= ny * overlap;
          a.pos.z -= nz * overlap;
          b.pos.x += nx * overlap;
          b.pos.y += ny * overlap;
          b.pos.z += nz * overlap;
          // Relative velocity along normal
          const rvx = b.vel.x - a.vel.x;
          const rvy = b.vel.y - a.vel.y;
          const rvz = b.vel.z - a.vel.z;
          const velAlongNormal = rvx * nx + rvy * ny + rvz * nz;
          if (velAlongNormal > 0) continue; // moving apart
          // Impulse
          const impulse = -(1 + RESTITUTION) * velAlongNormal / 2;
          a.vel.x -= impulse * nx;
          a.vel.y -= impulse * ny;
          a.vel.z -= impulse * nz;
          b.vel.x += impulse * nx;
          b.vel.y += impulse * ny;
          b.vel.z += impulse * nz;
        }
      }
    }
  });

  return (
    <group ref={groupRef}>
      {marbles.map((m, i) => {
        const mat = (
          <meshStandardMaterial
            color={m.color}
            emissive={m.color}
            emissiveIntensity={1.2}
            wireframe={false}
            roughness={0.2}
            metalness={0.4}
          />
        );
        return (
          <group
            key={i}
            ref={(el) => { if (el) m.mesh = el; }}
            position={[m.pos.x, m.pos.y, m.pos.z]}
            rotation={[m.rot.x, m.rot.y, m.rot.z]}
          >
            {m.type === "octahedron" && <Octahedron args={[m.radius]}>{mat}</Octahedron>}
            {m.type === "tetrahedron" && <Tetrahedron args={[m.radius * 1.2]}>{mat}</Tetrahedron>}
            {m.type === "box" && <Box args={[m.radius * 1.4, m.radius * 1.4, m.radius * 1.4]}>{mat}</Box>}
            {m.type === "torus" && <Torus args={[m.radius, m.radius * 0.35, 12, 32]}>{mat}</Torus>}
            {m.type === "icosa" && <Icosahedron args={[m.radius]}>{mat}</Icosahedron>}
          </group>
        );
      })}
    </group>
  );
}

/* Container walls — neon wireframe box */
function Container() {
  return (
    <group>
      {/* Floor grid */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
        <planeGeometry args={[11, 5]} />
        <meshBasicMaterial color="#0004eb" wireframe transparent opacity={0.15} />
      </mesh>
      {/* Wireframe box edges */}
      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(11, 5, 5)]} />
        <lineBasicMaterial color="#00ffff" transparent opacity={0.4} />
      </lineSegments>
    </group>
  );
}

export default function PhysicsPlayground() {
  return (
    <section id="playground" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00ffff]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-[#ff00ff]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          index="04"
          title="Physics Playground"
          subtitle="A live physics simulation running in your browser. 10 neon marbles tumbling under real gravity with sphere-sphere collisions — no WASM, pure Three.js."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative h-[480px] sm:h-[560px] rounded-2xl glass overflow-hidden"
        >
          {/* Top-left HUD */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full glass">
            <Activity size={11} className="text-[#00ffff]" />
            <span className="text-xs font-mono text-muted-foreground">
              10 bodies · 60fps · pure-three.js
            </span>
          </div>

          {/* Top-right tag */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full glass">
            <Sparkles size={11} className="text-[#ff00ff]" />
            <span className="text-xs font-mono text-muted-foreground">live simulation</span>
          </div>

          {/* The Canvas */}
          <Canvas
            camera={{ position: [0, 1, 9], fov: 50 }}
            dpr={[1, 1.8]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <pointLight position={[4, 6, 4]} intensity={2.5} color="#00ffff" />
              <pointLight position={[-4, 4, 4]} intensity={2.0} color="#ff00ff" />
              <pointLight position={[0, -3, 4]} intensity={1.5} color="#8800ff" />

              <Container />
              <Simulation />
            </Suspense>
          </Canvas>

          {/* Bottom caption */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full glass text-xs font-mono text-muted-foreground text-center">
            <span className="text-[#00ffff]">gravity</span> ·
            <span className="text-[#ff00ff]"> collisions</span> ·
            <span className="text-[#00ff88]"> friction</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-center text-sm text-muted-foreground max-w-2xl mx-auto"
        >
          Each shape has its own velocity, angular velocity, and collider. The simulation
          integrates gravity, floor/wall bounces, and sphere-sphere impulses every frame —
          written in pure Three.js, no physics engine dependency.
        </motion.p>
      </div>
    </section>
  );
}
