import { Float, Sparkles, Cloud, Environment } from "@react-three/drei"
import { useThree, useFrame } from "@react-three/fiber"
import { useRef, useMemo, useEffect } from "react"
import * as THREE from "three"

// Helper untuk posisi acak kelopak bunga
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

const COUNT = 60

type Petal = {
  position: THREE.Vector3
  rotation: THREE.Euler
  scale: number
  speed: number
}

function Petals() {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const petalsData = useMemo<Petal[]>(() => {
    const temp: Petal[] = []
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
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null as any, null as any, COUNT]}>
      <circleGeometry args={[0.15, 5]} />
      <meshBasicMaterial color="#fff0f0" transparent opacity={0.6} side={THREE.DoubleSide} />
    </instancedMesh>
  )
}

// PERBAIKAN: Terima scrollProgress sebagai props (MotionValue dari Framer Motion)
export function WeddingRingsScroll({ scrollProgress }: { scrollProgress: any }) {
  const { size } = useThree()
  
  // HAPUS BARIS INI: const scroll = useScroll() 
  // Karena kita pakai scrollProgress dari props

  const isMobile = size.width < 768
  const scale = isMobile ? 0.7 : 1.3

  const ringsRef = useRef<THREE.Group>(null!)
  const cloudRef = useRef<THREE.Group>(null!)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener("mousemove", handler)
    return () => window.removeEventListener("mousemove", handler)
  }, [])

  useFrame(() => {
    // AMBIL NILAI SCROLL DARI PROPS
    const p = scrollProgress.get() 

    if (ringsRef.current) {
      ringsRef.current.rotation.y = p * Math.PI + mouse.current.x * 0.2
      ringsRef.current.rotation.x = mouse.current.y * 0.1
      ringsRef.current.position.y = isMobile ? -p * 0.5 : -p * 1.5
    }

    if (cloudRef.current) {
      cloudRef.current.position.x = -3 + p * 2
    }
  })

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <group ref={cloudRef} position={[0, -1, -5]}>
        <Cloud opacity={0.5} speed={0.4} bounds={[15, 3, 3]} position={[-3, 0, 0]} segments={20} color="#ffffff" />
      </group>

      <Sparkles count={isMobile ? 40 : 100} scale={8} size={3} speed={0.3} color="#FFD700" opacity={0.6} />

      <Petals />

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
        <group ref={ringsRef} scale={scale} position={[0, isMobile ? -0.2 : 0, 0]}>
          <mesh position={[-0.8, 0, 0]} rotation={[Math.PI / 3, 0.5, 0]}>
            <torusGeometry args={[1, 0.08, 32, 100]} />
            <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} />
          </mesh>
          <mesh position={[0.8, -0.3, -0.5]} rotation={[Math.PI / -3, 1, 0.5]}>
            <torusGeometry args={[1, 0.08, 32, 100]} />
            <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
          </mesh>
        </group>
      </Float>
    </>
  )
}