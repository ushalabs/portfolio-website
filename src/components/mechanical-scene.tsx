"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges } from "@react-three/drei/core/Edges";
import { Component, useEffect, useMemo, useRef, type ReactNode } from "react";
import { AdditiveBlending, CatmullRomCurve3, Color, Group, MathUtils, Vector3 } from "three";

const vertex = `
  varying vec3 face;
  varying vec2 tex;
  void main() {
    face = normal;
    tex = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = `
  varying vec3 face;
  varying vec2 tex;
  void main() {
    vec2 edge = min(tex, 1.0 - tex);
    float rim = exp(-min(edge.x, edge.y) * 22.0);
    float seam = exp(-abs(tex.x + tex.y - 1.0) * 48.0);
    float facet = step(tex.x, tex.y) * .075 + step(1.0 - tex.x, tex.y) * .055;
    float reflection = exp(-pow((tex.x * .68 + tex.y * .56 - .69) * 11.0, 2.0));
    float side = abs(face.x) * .36 + abs(face.y) * .16 + abs(face.z) * .27;
    vec3 color = mix(vec3(.085,.059,.157), vec3(.49,.39,.73), side + facet + reflection * .35);
    color += vec3(.41,.26,.81) * rim * .47;
    color += vec3(.14,.12,.22) * seam * .30;
    color += vec3(.16,.10,.39) * smoothstep(.68, 1.0, tex.y) * abs(face.z);
    gl_FragColor = vec4(color, .94);
  }
`;

const initial = [-.48, -.55, -.43] as const;

function Prism({ active }: { active: boolean }) {
  const prism = useRef<Group>(null);
  const aim = useRef({ x: 0, y: 0, scroll: 0 });
  const invalidate = useThree(state => state.invalidate);
  const canvas = useThree(state => state.gl.domElement);
  const orbit = useMemo(() => {
    const angle = .55;
    return new CatmullRomCurve3(Array.from({ length: 128 }, (_, index) => {
      const t = (index / 128) * Math.PI * 2;
      const x = Math.cos(t) * 2.48;
      const y = Math.sin(t) * .8;
      return new Vector3(x * Math.cos(angle) - y * Math.sin(angle), x * Math.sin(angle) + y * Math.cos(angle), -Math.sin(t) * 1.67);
    }), true);
  }, []);

  useEffect(() => {
    if (!active) return;
    function update() {
      aim.current.scroll = Math.min(window.scrollY / Math.max(400, window.innerHeight), 1);
      invalidate();
    }
    function point(event: PointerEvent) {
      const box = canvas.getBoundingClientRect();
      aim.current.x = ((event.clientX - box.left) / box.width) * 2 - 1;
      aim.current.y = 1 - ((event.clientY - box.top) / box.height) * 2;
      invalidate();
    }
    function reset() {
      aim.current.x = 0;
      aim.current.y = 0;
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

  useFrame((_, delta) => {
    if (!prism.current || !active) return;
    const { rotation } = prism.current;
    const targetX = initial[0] - aim.current.y * .24 + aim.current.scroll * .45;
    const targetY = initial[1] + aim.current.x * .28 - aim.current.scroll * .72;
    rotation.x = MathUtils.damp(rotation.x, targetX, 7, delta);
    rotation.y = MathUtils.damp(rotation.y, targetY, 7, delta);
    if (Math.abs(rotation.x - targetX) + Math.abs(rotation.y - targetY) > .0005) invalidate();
  });

  return <>
    <group ref={prism} rotation={[...initial]}>
      <mesh>
        <boxGeometry args={[2.35, 2.35, 2.35]} />
        <shaderMaterial vertexShader={vertex} fragmentShader={fragment} transparent />
        <Edges color="#c4acff" threshold={14} />
      </mesh>
    </group>
    <mesh>
      <tubeGeometry args={[orbit, 128, .011, 6, true]} />
      <meshBasicMaterial color="#d8b8ff" toneMapped={false} />
    </mesh>
    <mesh renderOrder={2}>
      <tubeGeometry args={[orbit, 128, .038, 6, true]} />
      <meshBasicMaterial color="#a06aff" blending={AdditiveBlending} opacity={.19} transparent depthWrite={false} />
    </mesh>
  </>;
}

class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function MechanicalScene({ visible, onReady, onError }: { visible: boolean; onReady: () => void; onError: () => void }) {
  return <SceneBoundary onError={onError}><Canvas camera={{ position: [0, 0, 7.55], fov: 42 }} dpr={[1, 1.5]} frameloop="demand" gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    onCreated={({ gl }) => {
      gl.setClearColor(new Color("#101019"), 0);
      gl.domElement.addEventListener("webglcontextlost", onError, { once: true });
      onReady();
    }}>
    <Prism active={visible} />
  </Canvas></SceneBoundary>;
}
