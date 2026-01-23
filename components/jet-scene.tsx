'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import type { Line2 } from 'three/examples/jsm/lines/Line2';
import type { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';

type RouteConfig = {
  id: string;
  points: THREE.Vector3[];
  color?: string;
  opacity?: number;
  dashSpeed?: number;
  dashPhase?: number;
  dotSpeed?: number;
  dotPhase?: number;
  dotSize?: number;
  showPlane?: boolean;
  showDot?: boolean;
  planeScale?: number;
};

type FlightRouteProps = RouteConfig & {
  planeGeometry: THREE.ShapeGeometry;
};

function StartMarker({ position, color, size }: { position: THREE.Vector3; color: string; size: number }) {
  return (
    <group position={position}>
      <mesh>
        <ringGeometry args={[size * 0.62, size, 28]} />
        <meshBasicMaterial color={color} depthWrite={false} depthTest={false} />
      </mesh>
      <mesh>
        <circleGeometry args={[size * 0.28, 24]} />
        <meshBasicMaterial color={color} depthWrite={false} depthTest={false} />
      </mesh>
    </group>
  );
}

function DestinationPin({ position, color, size }: { position: THREE.Vector3; color: string; size: number }) {
  const tipHeight = size * 0.7;
  const circleRadius = size * 0.45;
  const circleCenter = tipHeight + circleRadius * 0.25;

  const tipGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(-size * 0.22, tipHeight);
    shape.lineTo(size * 0.22, tipHeight);
    shape.lineTo(0, 0);
    return new THREE.ShapeGeometry(shape);
  }, [size, tipHeight]);

  const ringGeometry = useMemo(
    () => new THREE.RingGeometry(circleRadius * 0.7, circleRadius, 28),
    [circleRadius]
  );

  const centerGeometry = useMemo(
    () => new THREE.CircleGeometry(circleRadius * 0.36, 24),
    [circleRadius]
  );

  return (
    <group position={position}>
      <mesh geometry={tipGeometry}>
        <meshBasicMaterial color={color} depthWrite={false} depthTest={false} />
      </mesh>
      <mesh position={[0, circleCenter, 0]} geometry={ringGeometry}>
        <meshBasicMaterial color={color} depthWrite={false} depthTest={false} />
      </mesh>
      <mesh position={[0, circleCenter, 0]} geometry={centerGeometry}>
        <meshBasicMaterial color="#f3e1cf" depthWrite={false} depthTest={false} />
      </mesh>
    </group>
  );
}

function FlightRoute({
  points,
  color = '#5b4b3f',
  opacity = 0.85,
  dashSpeed = 0.6,
  dashPhase = 0,
  dotSpeed = 0.04,
  dotPhase = 0,
  dotSize = 0.055,
  showPlane = false,
  showDot = true,
  planeScale = 0.26,
  planeGeometry,
}: FlightRouteProps) {
  const lineRef = useRef<Line2>(null);
  const dotRef = useRef<THREE.Mesh>(null);
  const planeRef = useRef<THREE.Mesh>(null);

  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.45),
    [points]
  );
  const pathPoints = useMemo(() => curve.getPoints(160), [curve]);

  useFrame((state) => {
    const material = lineRef.current?.material as LineMaterial | undefined;
    if (material) {
      material.dashOffset = -(state.clock.elapsedTime * dashSpeed + dashPhase);
    }

    const t = (state.clock.elapsedTime * dotSpeed + dotPhase) % 1;
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t);

    if (showDot && dotRef.current) {
      dotRef.current.position.copy(point);
    }

    if (showPlane && planeRef.current) {
      planeRef.current.position.copy(point);
      planeRef.current.rotation.z = Math.atan2(tangent.y, tangent.x);
    }
  });

  return (
    <group>
      <Line
        ref={lineRef}
        points={pathPoints}
        color={color}
        lineWidth={1}
        dashed
        dashScale={1}
        dashSize={0.25}
        gapSize={0.4}
        transparent
        opacity={opacity}
      />
      {showDot && (
        <mesh ref={dotRef}>
          <circleGeometry args={[dotSize, 20]} />
          <meshBasicMaterial color={color} depthWrite={false} depthTest={false} />
        </mesh>
      )}
      {showPlane && (
        <mesh ref={planeRef} geometry={planeGeometry} scale={planeScale}>
          <meshBasicMaterial color={color} depthWrite={false} depthTest={false} />
        </mesh>
      )}
    </group>
  );
}

function FlightPath() {
  const { viewport } = useThree();

  const planeGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0.9, 0);
    shape.lineTo(0.3, 0.08);
    shape.lineTo(0.08, 0.22);
    shape.lineTo(-0.18, 0.22);
    shape.lineTo(-0.08, 0.06);
    shape.lineTo(-0.55, 0.18);
    shape.lineTo(-0.42, 0.02);
    shape.lineTo(-0.72, 0.02);
    shape.lineTo(-0.72, -0.02);
    shape.lineTo(-0.42, -0.02);
    shape.lineTo(-0.55, -0.18);
    shape.lineTo(-0.08, -0.06);
    shape.lineTo(-0.18, -0.22);
    shape.lineTo(0.08, -0.22);
    shape.lineTo(0.3, -0.08);
    shape.lineTo(0.9, 0);
    return new THREE.ShapeGeometry(shape);
  }, []);

  const layout = useMemo(() => {
    const halfW = viewport.width * 0.5;
    const halfH = viewport.height * 0.5;
    const point = (x: number, y: number) => new THREE.Vector3(x * halfW, y * halfH, 0);

    const start = point(-0.82, -0.28);
    const destination = point(0.82, 0.02);

    const routes: RouteConfig[] = [
      {
        id: 'route-main',
        points: [
          start,
          point(-0.5, -0.05),
          point(-0.15, 0.1),
          point(0.2, 0.18),
          point(0.55, 0.1),
          destination,
        ],
        showPlane: true,
        showDot: false,
        planeScale: 0.3,
        dashSpeed: 0.65,
      },
      {
        id: 'route-upper',
        points: [
          start,
          point(-0.45, 0.08),
          point(-0.1, 0.25),
          point(0.3, 0.3),
          point(0.6, 0.18),
          destination,
        ],
        showPlane: true,
        showDot: false,
        planeScale: 0.22,
        dotSpeed: 0.035,
        dashSpeed: 0.55,
        dashPhase: 1.4,
        opacity: 0.7,
      },
      {
        id: 'route-lower',
        points: [
          start,
          point(-0.55, -0.32),
          point(-0.2, -0.38),
          point(0.15, -0.28),
          point(0.52, -0.18),
          destination,
        ],
        showPlane: true,
        showDot: false,
        planeScale: 0.2,
        dotSpeed: 0.03,
        dashSpeed: 0.5,
        dashPhase: 2.2,
        opacity: 0.6,
      },
    ];

    return { start, destination, routes };
  }, [viewport.height, viewport.width]);

  return (
    <group>
      {layout.routes.map((route) => (
        <FlightRoute key={route.id} {...route} planeGeometry={planeGeometry} />
      ))}
      <StartMarker position={layout.start} color="#5b4b3f" size={0.22} />
      <DestinationPin position={layout.destination} color="#5b4b3f" size={0.3} />
    </group>
  );
}

export function JetScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 10], zoom: 80 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        dpr={[1, 2]}
      >
        <FlightPath />
      </Canvas>
    </div>
  );
}
