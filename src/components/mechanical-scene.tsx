"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei/core/RoundedBox";
import { Component, useEffect, useMemo, useRef, type ReactNode } from "react";
import { Color, Group, MathUtils, Path, Shape, type Mesh } from "three";

const layers = [
  { depth: -.68, size: 1.12, color: "#514863", angle: -.08 },
  { depth: -.39, size: 1.02, color: "#a6a0ad", angle: .06 },
  { depth: -.10, size: .95, color: "#786695", angle: .15 },
  { depth: .20, size: .88, color: "#c6bfd0", angle: .23 },
  { depth: .51, size: .78, color: "#a18abf", angle: .3 },
];

function outline(scale: number, offset = 0) {
  const points = Array.from({ length: 8 }, (_, index) => {
    const angle = (index * Math.PI) / 4 + Math.PI / 8;
    return [Math.cos(angle) * scale, Math.sin(angle) * scale] as const;
  });
  const path = offset ? new Path() : new Shape();
  const ordered = offset ? points.reverse() : points;
  ordered.forEach(([x, y], index) => index ? path.lineTo(x, y) : path.moveTo(x, y));
  path.closePath();
  return path;
}

function Mechanism({ active }: { active: boolean }) {
  const rotor = useRef<Group>(null);
  const pieces = useRef<(Mesh | null)[]>([]);
  const progress = useRef(0);
  const aim = useRef({ x: 0, y: 0 });
  const invalidate = useThree(state => state.invalidate);
  const canvas = useThree(state => state.gl.domElement);
  const ring = useMemo(() => {
    const shape = outline(1.36) as Shape;
    shape.holes.push(outline(.82, 1));
    return shape;
  }, []);
  const extrusion = useMemo(() => ({ depth: .13, bevelEnabled: true, bevelSegments: 2, bevelSize: .035, bevelThickness: .035, steps: 1, curveSegments: 4 }), []);

  useEffect(() => {
    if (!active) return;
    function update() {
      progress.current = Math.min(window.scrollY / Math.max(360, window.innerHeight * .8), 1);
      invalidate();
    }
    function point(event: PointerEvent) {
      const box = canvas.getBoundingClientRect();
      aim.current.x = ((event.clientX - box.left) / box.width) * 2 - 1;
      aim.current.y = 1 - ((event.clientY - box.top) / box.height) * 2;
      invalidate();
    }
    function reset() {
      aim.current = { x: 0, y: 0 };
      invalidate();
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    canvas.addEventListener("pointermove", point, { passive: true });
    canvas.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("scroll", update);
      canvas.removeEventListener("pointermove", point);
      canvas.removeEventListener("pointerleave", reset);
    };
  }, [active, canvas, invalidate]);

  useFrame((_, dt) => {
    const group = rotor.current;
    if (!group || !active) return;
    const scroll = progress.current;
    const targetX = -.54 - aim.current.y * .18 + scroll * .36;
    const targetY = -.46 + aim.current.x * .24 - scroll * .52;
    group.rotation.x = MathUtils.damp(group.rotation.x, targetX, 7, dt);
    group.rotation.y = MathUtils.damp(group.rotation.y, targetY, 7, dt);
    for (const [index, mesh] of pieces.current.entries()) {
      if (mesh) mesh.position.z = MathUtils.damp(mesh.position.z, layers[index].depth * (1 + scroll * 1.8), 7, dt);
    }
    const gap = Math.abs(group.rotation.x - targetX) + Math.abs(group.rotation.y - targetY);
    if (gap > .0005 || pieces.current.some((mesh, index) => mesh && Math.abs(mesh.position.z - layers[index].depth * (1 + scroll * 1.8)) > .001)) invalidate();
  });

  return <group ref={rotor} rotation={[-.54, -.46, -.30]}>
    {layers.map(({ size, depth, color, angle }, index) => <mesh key={depth} ref={mesh => { pieces.current[index] = mesh; }} position-z={depth} scale={[size, size, 1]} rotation-z={angle}>
      <extrudeGeometry args={[ring, extrusion]} />
      <meshStandardMaterial color={color} metalness={.28} roughness={.36} />
    </mesh>)}
    <mesh position={[0, 0, .05]} rotation={[Math.PI / 2, 0, .2]}><cylinderGeometry args={[.49, .49, .94, 8, 1]} /><meshStandardMaterial color="#272332" metalness={.3} roughness={.45} /></mesh>
    <RoundedBox args={[.64, .64, .21]} radius={.035} smoothness={2} position={[0, 0, .62]} rotation-z={Math.PI / 4}>
      <meshStandardMaterial color="#c1a7f3" metalness={.26} roughness={.32} />
    </RoundedBox>
    {[-1, 1].flatMap(x => [-1, 1].map(y => <mesh key={`${x}/${y}`} position={[x * .68, y * .68, .69]} rotation-x={Math.PI / 2}><cylinderGeometry args={[.055, .055, .03, 12]} /><meshStandardMaterial color="#241e30" metalness={.5} roughness={.4} /></mesh>))}
  </group>;
}

class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function MechanicalScene({ visible, onReady, onError }: { visible: boolean; onReady: () => void; onError: () => void }) {
  return <SceneBoundary onError={onError}><Canvas camera={{ position: [0, 0, 6.4], fov: 39 }} dpr={[1, 1.45]} frameloop="demand" gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    onCreated={({ gl }) => {
      gl.setClearColor(new Color("#0b0b0f"), 0);
      gl.domElement.addEventListener("webglcontextlost", onError, { once: true });
      onReady();
    }}>
    <ambientLight intensity={.8} />
    <directionalLight position={[-3, 5, 5]} intensity={2.7} color="#e8e4fa" />
    <directionalLight position={[4, -2, 2]} intensity={1.1} color="#8e6bd6" />
    <directionalLight position={[0, 3, -3]} intensity={1.7} color="#cfbedc" />
    <Mechanism active={visible} />
  </Canvas></SceneBoundary>;
}
