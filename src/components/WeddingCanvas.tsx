"use client";
import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Cloud, Environment } from "@react-three/drei";
import * as THREE from "three";

// Import komponen UI
import { HeroSection } from "./HeroSection";
import { GreetingSection } from "./GreetingSectionProps";
import { LocationSection } from "./LocationSection";
import { FamilySection } from "./FamilySectionProps";
import { GallerySection } from "./GallerySectionProps";
import { WeddingTimeSection } from "./WeddingTimeSection";
import WeddingGiftList from "./gif/WeddingGiftList";
import { RSVPSection } from "./RSVPSection";
import weddingData from "../data/wddingData.json";
import GuestPhotoCapture from "./GuestPhotoCapture";
import ScrollReveal from "./ScrollReveal";
import CoupleSection from "./sections/CoupleSection";
import SlideshowBackground from "./canvas/SlideshowBackground";

// ============================================================
// EFEK 3D — copy paste dari WeddingRings (tanpa cincin)
// ============================================================
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const COUNT = 60;

function Petals() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const petalsData = useMemo(() => {
    const temp = [];
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
        speed: pseudoRandom(i + 7) * 0.01 + 0.005,
      });
    }
    return temp;
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    petalsData.forEach((petal, i) => {
      petal.position.y -= petal.speed;
      petal.rotation.x += 0.01;
      if (petal.position.y < -4) petal.position.y = 6;
      dummy.position.copy(petal.position);
      dummy.rotation.copy(petal.rotation);
      dummy.scale.setScalar(petal.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current!.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <circleGeometry args={[0.15, 5]} />
      <meshBasicMaterial color="#fff0f0" transparent opacity={0.5} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}

function WeddingEffects() {
  const { size } = useThree();
  const isMobile = size.width < 768;
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
    </>
  );
}

// ============================================================
// MAIN
// ============================================================
const WeddingCanvas: React.FC<{ guestName: string }> = ({ guestName }) => {
  const galleryImages = weddingData.assets.galleryImages;

  return (
    <div style={{ position: "relative", background: "black", width: "100%", minHeight: "100vh" }}>

      {/* LAYER 1 — Slideshow foto (HTML, no Canvas) */}
      <SlideshowBackground
        images={galleryImages}
        autoInterval={5000}
        fadeDuration={2000}
      />

      {/* LAYER 2 — Canvas Three.js hanya untuk efek Cloud+Sparkles+Petals */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        pointerEvents: "none",
      }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <Environment preset="sunset" />
            <WeddingEffects />
          </Suspense>
        </Canvas>
      </div>

      {/* LAYER 3 — Konten HTML */}
      <div style={{
        position: "relative",
        zIndex: 2,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <div className="w-100 animate__animated animate__fadeIn">

          <section id="home-section">
            <ScrollReveal>
              <HeroSection guestName={guestName} />
            </ScrollReveal>
          </section>

          <section id="couple-section">
            <ScrollReveal>
              <GreetingSection guestName={guestName} />
            </ScrollReveal>
            <CoupleSection />
          </section>

          <section id="event-section">
            <ScrollReveal>
              <WeddingTimeSection
                targetDate={weddingData.acara.time}
                title="Akad Pernikahan"
              />
            </ScrollReveal>
            <ScrollReveal>
              <WeddingTimeSection
                targetDate={weddingData.acara.timeResepsi}
                title="Resepsi Pernikahan"
              />
            </ScrollReveal>
            <ScrollReveal>
              <LocationSection />
            </ScrollReveal>
          </section>

          <section id="gallery-section">
            <ScrollReveal>
              <GallerySection images={galleryImages} />
            </ScrollReveal>
          </section>

          <section id="gift-section">
            <ScrollReveal>
              <WeddingGiftList />
            </ScrollReveal>
          </section>

          <section id="rsvp-section">
            <ScrollReveal>
              <RSVPSection />
            </ScrollReveal>
          </section>

          <section id="capture-section">
            <ScrollReveal>
              <GuestPhotoCapture />
            </ScrollReveal>
          </section>

          <ScrollReveal>
            <FamilySection
              title="Keluarga Besar"
              maleMembers={weddingData.acara.maleMembers}
              femaleMembers={weddingData.acara.femaleMembers}
            />
          </ScrollReveal>

          <div style={{ height: "20vh" }} />
        </div>
      </div>
    </div>
  );
};

export default WeddingCanvas;