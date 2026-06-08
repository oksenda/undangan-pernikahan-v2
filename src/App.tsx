"use client";
import { useState } from "react";
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
      <MusicPlayer isPlaying={isPlaying} />

      {!isOpen ? (
               <InvitationCover
            guestName={guestName}
            bgFront={weddingData.assets.bgFront} 
            namaPria={weddingData.pengantin.pria.namaPanggilan}
            namaWanita={weddingData.pengantin.wanita.namaPanggilan}
            onOpen={handleOpenInvitation}
          />
      ) : (
        <div className="animate__animated animate__fadeIn">
           <WeddingCanvas guestName={guestName} />
           <FloatingNav isPlaying={isPlaying} toggleMusic={toggleMusic} />
        </div>
      )}
    </main>
    </ProfileProvider>
  );
}

export default App;