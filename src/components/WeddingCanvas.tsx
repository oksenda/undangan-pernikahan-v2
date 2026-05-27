"use client";
// import React, { Suspense } from "react";
// import { Canvas } from "@react-three/fiber";
// import { useScroll, useSpring } from "framer-motion";

// Import komponen UI
import { HeroSection } from "./HeroSection";
import { GreetingSection } from "./GreetingSectionProps";
import { LocationSection } from "./LocationSection";
import { FamilySection } from "./FamilySectionProps";
import { GallerySection } from "./GallerySectionProps";
import { WeddingTimeSection } from "./WeddingTimeSection";
import WeddingGiftList from "./gif/WeddingGiftList";
import { RSVPSection } from "./RSVPSection";
// import { Environment } from "@react-three/drei";

// Data & 3D
import weddingData from "../data/weddingData.json";
// import { WeddingRingsScroll } from "./canvas/WeddingRingScroll";
import GuestPhotoCapture from "./GuestPhotoCapture";
import ScrollReveal from "./ScrollReveal";
import CoupleSection from "./sections/CoupleSection";
import SlideshowBackground from "./canvas/SlideshowBackground";
import {useProfile} from "../hooks/useProfile";

const WeddingCanvas: React.FC<{ guestName: string }> = ({ guestName }) => {
  const galleryImages = weddingData.assets.galleryImages;
    const { profile} = useProfile();
  const profileData = profile; 

  // const { scrollYProgress } = useScroll();
  // const smoothProgress = useSpring(scrollYProgress, {
  //   stiffness: 100,
  //   damping: 30,
  //   restDelta: 0.001
  // });

  return (
    <div style={{ position: "relative", background: "black", width: "100%", minHeight: "100vh" }}>
      
      {/* 1. LAYER BACKGROUND 3D */}
      {/* <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none" 
      }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <Suspense fallback={null}>
          <Environment preset="sunset" /> 
          <WeddingRingsScroll scrollProgress={smoothProgress} />
        </Suspense>
      </Canvas>
      </div> */}
      <SlideshowBackground
        images={weddingData.assets.galleryImages}
      />

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
            <ScrollReveal>
            <HeroSection guestName={guestName} />
            </ScrollReveal>
          </section>

          <section id="couple-section">
            <ScrollReveal>
            <GreetingSection guestName={guestName} />
            </ScrollReveal>
            <CoupleSection/>
          </section>
          
          <section id="event-section">
            <ScrollReveal>
            <WeddingTimeSection 
              targetDate={profileData.timeAkad} 
              title="Akad Pernikahan"
            />
            </ScrollReveal>
            <ScrollReveal>
            <WeddingTimeSection 
              targetDate={profileData.timeResepsi} 
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
            <RSVPSection guestName={guestName} />
            </ScrollReveal>
          </section>

          <section id="capture-section">
            <ScrollReveal>
            <GuestPhotoCapture />
            </ScrollReveal>
          </section>
          
          {/* Family Section bisa dimasukkan ke bagian penutup */}
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
}

export default WeddingCanvas;