"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useScroll, useSpring } from "framer-motion";

// Import komponen UI
import { HeroSection } from "./HeroSection";
import { GreetingSection } from "./GreetingSectionProps";
import { LocationSection } from "./LocationSection";
import { FamilySection } from "./FamilySectionProps";
import { GallerySection } from "./GallerySectionProps";
import { WeddingTimeSection } from "./WeddingTimeSection";
import WeddingGiftList from "./gif/WeddingGiftList";
import { RSVPSection } from "./RSVPSection";
import { Environment } from "@react-three/drei";

// Data & 3D
import weddingData from "../data/wddingData.json";
import { WeddingRingsScroll } from "./canvas/WeddingRingScroll";
import GuestPhotoCapture from "./GuestPhotoCapture";

const WeddingCanvas: React.FC<{ guestName: string }> = ({ guestName }) => {
  const galleryImages = weddingData.assets.galleryImages;

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div style={{ position: "relative", background: "black", width: "100%", minHeight: "100vh" }}>
      
      {/* 1. LAYER BACKGROUND 3D */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none" 
      }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Berikan ambientLight agar jika HDR gagal, objek tetap terlihat */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <Suspense fallback={null}>
          {/* Gunakan preset agar tidak memanggil file .hdr eksternal yang bikin error fetch */}
          <Environment preset="sunset" /> 
          <WeddingRingsScroll scrollProgress={smoothProgress} />
        </Suspense>
      </Canvas>
      </div>

      {/* 2. LAYER KONTEN HTML */}
      <div style={{ 
        position: "relative", 
        zIndex: 1, 
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div className="w-100 animate__animated animate__fadeIn">
          
          {/* Tambahkan ID pada pembungkus section agar navigasi bisa melacak posisi */}
          
          <section id="home-section">
            <HeroSection guestName={guestName} />
          </section>

          <section id="couple-section">
            <GreetingSection guestName={guestName} />
          </section>
          
          <section id="event-section">
            <WeddingTimeSection 
              targetDate={weddingData.acara.time} 
            />
            <LocationSection />
          </section>
          
          <section id="gallery-section">
            <GallerySection images={galleryImages} />
          </section>

          <section id="gift-section">
            <WeddingGiftList />
          </section>

          <section id="rsvp-section">
            <RSVPSection />
          </section>

          <section id="capture-section">
            <GuestPhotoCapture />
          </section>
          
          {/* Family Section bisa dimasukkan ke bagian penutup */}
          <FamilySection
            title="Keluarga Besar"
            maleMembers={weddingData.acara.maleMembers}
            femaleMembers={weddingData.acara.femaleMembers}
          />
          

          {/* Spacer Akhir */}
          <div style={{ height: "20vh" }} />
        </div>
      </div>
    </div>
  );
}

export default WeddingCanvas;