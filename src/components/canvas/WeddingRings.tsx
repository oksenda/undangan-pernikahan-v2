import { Float, Sparkles, Cloud } from "@react-three/drei"
import { useThree, useFrame } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import * as THREE from "three"

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const COUNT = 60;

function Petals() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const petalsData = useMemo(() => {
    const temp = []
    for (let i = 0; i < COUNT; i++) {
      temp.push({
        position: new THREE.Vector3(
          (pseudoRandom(i) - 0.5) * 10,
          pseudoRandom(i + 1) * 5 + 3,
          (pseudoRandom(i + 2) - 0.5) * 5
        ),
        rotation: new THREE.Euler(
          pseudoRandom(i + 3) * Math.PI,
          pseudoRandom(i + 4) * Math.PI,
          pseudoRandom(i + 5) * Math.PI
        ),
        scale: pseudoRandom(i + 6) * 0.12 + 0.05,
        speed: pseudoRandom(i + 7) * 0.01 + 0.005
      })
    }
    return temp
  }, [])

  useFrame(() => {
    if (!meshRef.current) return
    petalsData.forEach((petal, i) => {
      petal.position.y -= petal.speed
      petal.rotation.x += 0.01
      if (petal.position.y < -4) petal.position.y = 6
      dummy.position.copy(petal.position)
      dummy.rotation.copy(petal.rotation)
      dummy.scale.setScalar(petal.scale)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current!.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <circleGeometry args={[0.15, 5]} />
      <meshBasicMaterial color="#fff0f0" transparent opacity={0.5} side={THREE.DoubleSide} />
    </instancedMesh>
  )
}

export function WeddingRings() {
  const { size } = useThree()
  const isMobile = size.width < 768
  const scale = isMobile ? 0.7 : 1.3

  return (
    <>
      <group position={[0, -1, -5]}>
        <Cloud 
          opacity={0.5} 
          speed={0.4} 
            bounds={[15, 3, 3]}
            position={[-3, 0, 0]}
          segments={20} 
          color="#ffffff"
        />
      </group>
      <Sparkles 
        count={isMobile ? 50 : 150} 
        scale={8} 
        size={3} 
        speed={0.3} 
        color="#FFD700" 
        opacity={0.6} 
      />
      <Petals />
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
        <group scale={scale} position={[0, isMobile ? -0.2 : 0, 0]}>
          <mesh position={[-0.8, 0, 0]} rotation={[Math.PI / 3, 0.5, 0]}>
            <torusGeometry args={[1, 0.1, 32, 100]} />
            <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.05} />
          </mesh>
          <mesh position={[0.8, -0.3, -0.5]} rotation={[Math.PI / -3, 1, 0.5]}>
            <torusGeometry args={[1, 0.1, 32, 100]} />
            <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.05} />
          </mesh>
        </group>
      </Float>
    </>
  )
}