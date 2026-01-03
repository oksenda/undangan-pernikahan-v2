"use client";
import { useState, useLayoutEffect } from "react";
import { Container } from "react-bootstrap";
// Import aset dan data
import weddingData from "./data/wddingData.json";
import MusicPlayer from "./components/MusicPlayer";
import WeddingCanvas from "./components/WeddingCanvas";
import { FloatingNav } from "./components/FloatingNav"; // Pastikan path benar
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // State untuk kontrol musik manual
  const [guestName, setGuestName] = useState("Tamu Kehormatan");

  useLayoutEffect(() => {
    // Mengambil nama tamu dari URL (?to=Nama)
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    if (to && to.trim() !== "") {
      setGuestName(to);
    }
  }, []);

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
        /* --- 2. OVERLAY COVER --- */
        <div 
          className="d-flex align-items-center justify-content-center text-center"
          style={{
            position: "fixed", 
            inset: 0,
            zIndex: 999, // Naikkan z-index agar menutupi segalanya
            background: "radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)",
          }}
        >
          <Container className="animate__animated animate__fadeIn">
            <div className="mb-4" style={{ color: "#D4AF37", fontSize: "1.5rem" }}>
              <i className="bi bi-heart-fill"></i>
            </div>

            <p className="text-uppercase mb-2" style={{ color: "#D4AF37", letterSpacing: "5px", fontSize: "0.8rem", fontWeight: "300" }}>
              The Wedding Of
            </p>
            
            <h1 
              className="mb-4" 
              style={{ 
                color: "#D4AF37", 
                fontFamily: "serif", 
                fontSize: "calc(2.5rem + 2vw)",
                fontWeight: "bold",
                textShadow: "0 0 20px rgba(212, 175, 55, 0.3)"
              }}
            >
              {weddingData.pengantin.pria.namaPanggilan} & {weddingData.pengantin.wanita.namaPanggilan}
            </h1>

            <div 
              className="mx-auto my-5 p-4"
              style={{
                maxWidth: "450px",
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(10px)",
                borderRadius: "25px",
                border: "1px solid rgba(212, 175, 55, 0.2)",
              }}
            >
              <p className="text-light opacity-75 mb-3" style={{ fontSize: "0.9rem" }}>
                Kepada Bapak/Ibu/Saudara/i:
              </p>
              <h2 className="mb-4" style={{ color: "white", fontFamily: "serif", fontWeight: "300" }}>
                {guestName}
              </h2>
              
              <button
                type="button"
                onClick={handleOpenInvitation}
                className="btn px-5 py-2 border-0 shadow-lg animate__animated animate__pulse animate__infinite"
                style={{
                  background: "linear-gradient(45deg, #D4AF37, #F9E498)",
                  color: "black",
                  borderRadius: "50px",
                  fontWeight: "bold",
                }}
              >
                Buka Undangan
              </button>
            </div>
            <div style={{ color: "rgba(212, 175, 55, 0.5)", fontSize: "0.8rem", letterSpacing: "2px" }}>
              #oktech
            </div>
          </Container>
        </div>
      ) : (
        /* --- 3. ISI UNDANGAN + FLOATING NAV --- */
        <div className="animate__animated animate__fadeIn">
           <WeddingCanvas guestName={guestName} />
           
           {/* Masukkan Navigasi Melayang di sini */}
           <FloatingNav isPlaying={isPlaying} toggleMusic={toggleMusic} />
        </div>
      )}
    </main>
  );
}

export default App;