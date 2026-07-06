"use client";

import { useRef, useMemo, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Icosahedron, Float, Points, PointMaterial, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { easing } from "maath";
import * as THREE from "three";

/* ────────────────────────────────────────────────────────────
   Smooth central orb — slow, elegant, no flicker.
   Multi-color neon wireframe shells.
   ──────────────────────────────────────────────────────────── */
function CoreOrb() {
  const outerRef = useRef<THREE.Mesh>(null);
  const midRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.05;
      outerRef.current.rotation.y = t * 0.07;
    }
    if (midRef.current) {
      midRef.current.rotation.x = -t * 0.08;
      midRef.current.rotation.z = t * 0.06;
    }
    if (innerRef.current) {
      const s = 1 + Math.sin(t * 0.6) * 0.02;
      innerRef.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      {/* Outer wireframe shell — cyan */}
      <Icosahedron ref={outerRef} args={[2.0, 1]}>
        <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.3} />
      </Icosahedron>
      {/* Mid wireframe — magenta */}
      <Icosahedron ref={midRef} args={[1.6, 2]}>
        <meshBasicMaterial color="#ff00ff" wireframe transparent opacity={0.4} />
      </Icosahedron>
      {/* Inner core — solid violet, emissive */}
      <Icosahedron ref={innerRef} args={[1.1, 8]}>
        <meshStandardMaterial
          color="#8800ff"
          emissive="#00ffff"
          emissiveIntensity={0.5}
          roughness={0.18}
          metalness={0.85}
        />
      </Icosahedron>
      {/* Outer distorted wireframe — green accent */}
      <Icosahedron args={[1.18, 16]}>
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ffff"
          emissiveIntensity={0.3}
          roughness={0.25}
          metalness={0.7}
          transparent
          opacity={0.35}
          wireframe
        />
      </Icosahedron>
      {/* Hot center */}
      <Icosahedron args={[0.5, 3]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </Icosahedron>
    </group>
  );
}

/* ────────────────────────────────────────────────────────────
   Particle starfield — 2000 particles, slow drift
   ──────────────────────────────────────────────────────────── */
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 2000;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 7 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const colors = useMemo(() => {
    const arr = new Float32Array(2000 * 3);
    // Neon palette — cyan, magenta, violet, green, white
    const palette = [
      new THREE.Color("#00ffff"),
      new THREE.Color("#ff00ff"),
      new THREE.Color("#8800ff"),
      new THREE.Color("#00ff88"),
      new THREE.Color("#ffffff"),
    ];
    for (let i = 0; i < 2000; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.026}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

/* ────────────────────────────────────────────────────────────
   Floating accents — slow, gentle motion at the edges
   ──────────────────────────────────────────────────────────── */
function FloatingAccents() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.8}>
        <Icosahedron args={[0.32]} position={[3.8, 1.6, -1]}>
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.6} wireframe />
        </Icosahedron>
      </Float>
      <Float speed={0.9} rotationIntensity={1.0} floatIntensity={1.0}>
        <Icosahedron args={[0.4]} position={[-3.9, -1.0, 0.5]}>
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.5} wireframe />
        </Icosahedron>
      </Float>
      <Float speed={1.4} rotationIntensity={0.9} floatIntensity={0.9}>
        <Icosahedron args={[0.18]} position={[1.6, 2.6, -1.4]}>
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.7} wireframe />
        </Icosahedron>
      </Float>
      <Float speed={0.8} rotationIntensity={0.7} floatIntensity={0.7}>
        <Icosahedron args={[0.3]} position={[-2.9, 2.3, -0.8]}>
          <meshStandardMaterial color="#ffaa00" emissive="#ffaa00" emissiveIntensity={0.5} wireframe />
        </Icosahedron>
      </Float>
      <Float speed={1.1} rotationIntensity={0.8} floatIntensity={0.8}>
        <Icosahedron args={[0.24]} position={[3.2, -1.4, 0.8]}>
          <meshStandardMaterial color="#8800ff" emissive="#8800ff" emissiveIntensity={0.6} wireframe />
        </Icosahedron>
      </Float>
    </group>
  );
}

/* ────────────────────────────────────────────────────────────
   Mouse parallax + scroll-driven camera Z
   ──────────────────────────────────────────────────────────── */
function CameraRig() {
  const camera = useThree((s) => s.camera);
  const pointer = useThree((s) => s.pointer);
  const target = useRef(new THREE.Vector3(0, 0, 6));
  const scrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY / (window.innerHeight || 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state, delta) => {
    const bob = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    // As user scrolls through the 600vh hero, camera dollies in from z=6 → z=3
    // and the orb appears to grow. Capped at scroll progress 1.
    const scrollZ = 6 - Math.min(scrollRef.current, 1) * 2.5;
    target.current.set(pointer.x * 1.0, pointer.y * 0.7 + bob, scrollZ);
    easing.damp3(camera.position, target.current, 0.4, delta);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <pointLight position={[6, 6, 6]} intensity={2.2} color="#00ffff" />
        <pointLight position={[-6, -4, 4]} intensity={2.0} color="#ff00ff" />
        <pointLight position={[0, 6, -6]} intensity={1.2} color="#ffffff" />
        <pointLight position={[0, -6, 4]} intensity={1.5} color="#8800ff" />

        <CoreOrb />
        <FloatingAccents />
        <ParticleField />

        <Sparkles count={60} scale={10} size={2} speed={0.25} opacity={0.6} color="#00ffff" />
        <Sparkles count={30} scale={6} size={2.5} speed={0.35} opacity={0.5} color="#ff00ff" />

        <CameraRig />

        <EffectComposer>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.95}
            mipmapBlur
            radius={0.8}
          />
          <Vignette eskil={false} offset={0.3} darkness={0.7} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
