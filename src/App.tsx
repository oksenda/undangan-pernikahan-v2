"use client";
import { useState } from "react";
// Import aset dan data
import weddingData from "./data/weddingData.json";
import MusicPlayer from "./components/MusicPlayer";
import WeddingCanvas from "./components/WeddingCanvas";
import { FloatingNav } from "./components/FloatingNav";
import { ProfileProvider } from "./context/profileContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import InvitationCover from "./components/InvitationCover";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

const guestName =
  typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("to")?.trim() ||
      "Tamu Kehormatan"
    : "Tamu Kehormatan";

  // Fungsi untuk membuka undangan
  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true); // Musik otomatis menyala saat dibuka
  };

  // Fungsi toggle musik untuk dikirim ke FloatingNav
  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <ProfileProvider>
    <main style={{ 
      width: "100vw", 
      minHeight: "100vh", 
      height: isOpen ? "auto" : "100vh", 
      background: "black", 
      overflowY: isOpen ? "auto" : "hidden", 
      overflowX: "hidden", 
      position: "relative" 
    }}>
      
      {/* 1. PLAYER MUSIK (Sekarang dikontrol oleh state isPlaying) */}
      <MusicPlayer isPlaying={isPlaying} />

      {!isOpen ? (
       <InvitationCover
          guestName={guestName}
          bgFront={weddingData.assets.bgFront}  // ✅ dari acara → assets
          namaPria={weddingData.pengantin.pria.namaPanggilan}
          namaWanita={weddingData.pengantin.wanita.namaPanggilan}
          onOpen={handleOpenInvitation}
        />
      ) : (
        /* --- 3. ISI UNDANGAN + FLOATING NAV --- */
        <div className="animate__animated animate__fadeIn">
           <WeddingCanvas guestName={guestName} />
           
           {/* Masukkan Navigasi Melayang di sini */}
           <FloatingNav isPlaying={isPlaying} toggleMusic={toggleMusic} />
        </div>
      )}
    </main>
    </ProfileProvider>
  );
}

export default App;