"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges } from "@react-three/drei/core/Edges";
import { Component, useEffect, useMemo, useRef, type ReactNode } from "react";
import { AdditiveBlending, CatmullRomCurve3, Color, DoubleSide, Group, MathUtils, Vector3, type ShaderMaterial } from "three";

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
  uniform float uTime;
  varying vec3 face;
  varying vec2 tex;
  void main() {
    vec2 edge = min(tex, 1.0 - tex);
    float rim = exp(-min(edge.x, edge.y) * 22.0);
    float seam = exp(-abs(tex.x + tex.y - 1.0) * 48.0);
    float facet = step(tex.x, tex.y) * .075 + step(1.0 - tex.x, tex.y) * .055;
    float reflection = exp(-pow((tex.x * .68 + tex.y * .56 - .69) * 11.0, 2.0));
    float side = abs(face.x) * .36 + abs(face.y) * .16 + abs(face.z) * .27;
    float sweep = exp(-pow((tex.x + tex.y * .7 - .85 - sin(uTime * .46) * .7) * 12.0, 2.0));
    float lattice = pow(max(0.0, sin(tex.x * 24.0 + uTime * .45) * sin(tex.y * 24.0 - uTime * .25)), 12.0);
    vec3 color = mix(vec3(.055,.052,.085), vec3(.39,.37,.56), side + facet + reflection * .35);
    color += vec3(.46,.36,.78) * rim * .47;
    color += vec3(.14,.12,.22) * seam * .30;
    color += vec3(.26,.34,.43) * sweep * .32 + vec3(.28,.22,.46) * lattice * .16;
    gl_FragColor = vec4(color, .42 + rim * .3 + sweep * .08);
  }
`;

const orbitFragment = `
  uniform float uTime;
  varying vec2 tex;
  void main() {
    float trail = exp(-pow((fract(tex.x - uTime * .055) - .5) * 19.0, 2.0));
    vec3 color = mix(vec3(.48,.41,.67), vec3(.91,.94,1.0), trail);
    gl_FragColor = vec4(color, .8 + trail * .2);
  }
`;

const initial = [-.48, -.55, -.43] as const;

function Prism({ active }: { active: boolean }) {
  const prism = useRef<Group>(null);
  const mechanism = useRef<Group>(null);
  const core = useRef<Group>(null);
  const glassMaterial = useRef<ShaderMaterial>(null);
  const orbitMaterial = useRef<ShaderMaterial>(null);
  const elapsed = useRef(0);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
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
    const step = Math.min(delta, .05);
    elapsed.current += step;
    const time = elapsed.current;
    if (glassMaterial.current) glassMaterial.current.uniforms.uTime.value = time;
    if (orbitMaterial.current) orbitMaterial.current.uniforms.uTime.value = time;
    const { rotation } = prism.current;
    const targetX = initial[0] - aim.current.y * .24 + aim.current.scroll * .45 + Math.sin(time * .3) * .065;
    const targetY = initial[1] + aim.current.x * .28 - aim.current.scroll * .72 + Math.sin(time * .24) * .12;
    rotation.x = MathUtils.damp(rotation.x, targetX, 7, step);
    rotation.y = MathUtils.damp(rotation.y, targetY, 7, step);
    prism.current.position.y = Math.sin(time * .55) * .04;
    if (mechanism.current) {
      mechanism.current.rotation.set(time * .18, time * .27, Math.sin(time * .35) * .2);
    }
    if (core.current) core.current.rotation.set(-time * .3, time * .42, time * .17);
    invalidate();
  });

  return <>
    <group ref={prism} rotation={[...initial]}>
      <group ref={mechanism}>
        <mesh>
          <boxGeometry args={[1.35, 1.35, 1.35]} />
          <meshBasicMaterial color="#a8a4c6" transparent opacity={.025} depthWrite={false} />
          <Edges color="#a9a2c6" />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[.86, .017, 8, 64]} />
          <meshBasicMaterial color="#8e99ae" />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[.86, .017, 8, 64]} />
          <meshBasicMaterial color="#aa98cc" />
        </mesh>
        <group ref={core}>
          <mesh>
            <octahedronGeometry args={[.48, 0]} />
            <meshStandardMaterial color="#b9b7d0" metalness={.75} roughness={.28} emissive="#5d4c99" emissiveIntensity={.35} />
            <Edges color="#e0dcef" />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[.78, .78, .78]} />
            <meshBasicMaterial color="#8b7aae" wireframe transparent opacity={.55} />
          </mesh>
        </group>
      </group>
      <mesh renderOrder={2}>
        <boxGeometry args={[2.35, 2.35, 2.35]} />
        <shaderMaterial ref={glassMaterial} uniforms={uniforms} vertexShader={vertex} fragmentShader={fragment} transparent depthWrite={false} side={DoubleSide} />
        <Edges color="#c4acff" threshold={14} />
      </mesh>
    </group>
    <mesh>
      <tubeGeometry args={[orbit, 128, .011, 6, true]} />
      <shaderMaterial ref={orbitMaterial} uniforms={uniforms} vertexShader={vertex} fragmentShader={orbitFragment} transparent depthWrite={false} />
    </mesh>
    <mesh renderOrder={2}>
      <tubeGeometry args={[orbit, 128, .038, 6, true]} />
      <meshBasicMaterial color="#a99bd2" blending={AdditiveBlending} opacity={.12} transparent depthWrite={false} />
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
    <ambientLight intensity={1.3} />
    <directionalLight position={[3, 4, 5]} intensity={2.2} color="#e5e9f4" />
    <Prism active={visible} />
  </Canvas></SceneBoundary>;
}
