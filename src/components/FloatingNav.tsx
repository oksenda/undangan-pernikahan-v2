"use client";
import React, { useState, useEffect } from "react";
import { Home, Heart, Calendar, MessageSquare,Music } from "lucide-react";

interface FloatingNavProps {
  isPlaying: boolean;
  toggleMusic: () => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ isPlaying, toggleMusic }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // Jika 'top', scroll ke paling atas
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      // Offset 20px agar tidak terlalu mepet ke atas
      const offset = 20;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    } else {
      console.warn(`Element dengan id ${id} tidak ditemukan.`);
    }
  };

  return (
    <>
      {/* Tombol Back To Top - Muncul di pojok kanan atas piringan jika di mobile */}
<button
  onClick={() => scrollToSection("top")}
  className={`back-to-top ${showBackToTop ? "visible" : ""}`}
  style={{
    backgroundColor: "#333", // Background gelap
    border: "none",
    borderRadius: "50%",
    padding: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "45px",  // Ukuran lingkaran
    height: "45px",
    opacity: showBackToTop ? 1 : 0,
    transition: "opacity 0.3s ease"
    // z-index dan position sudah diatur di CSS .back-to-top
  }}
>
  <svg 
    width="24"     
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="white"  // Warna Putih
    strokeWidth="2.5" 
    strokeLinecap="round"
    strokeLinejoin="round"
    className="arrow-icon"
  >
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
</button>

      <div className="nav-fixed-wrapper">
        <div className="glass-dock">
          {/* Navigasi Utama */}
          <div className="nav-items-group">
            <NavItem icon={<Home size={20} />} label="HOME" onClick={() => scrollToSection("top")} />
            <NavItem icon={<Heart size={20} />} label="COUPLE" onClick={() => scrollToSection("couple-section")} />
            <NavItem icon={<Calendar size={20} />} label="EVENT" onClick={() => scrollToSection("event-section")} />
            <NavItem icon={<MessageSquare size={20} />} label="WISHES" onClick={() => scrollToSection("rsvp-section")} />
          </div>

          <div className="nav-divider"></div>

          {/* Vinyl Record Music Player (Sesuai gambar referensi) */}
          <div className="music-wrapper">
            {isPlaying && (
              <div className="music-bars">
                <span></span><span></span><span></span>
              </div>
            )}
            <button 
              className={`vinyl-record ${isPlaying ? "spinning" : ""}`} 
              onClick={toggleMusic}
            >
              <div className="vinyl-center">
                 <Music size={14} color={isPlaying ? "#D4AF37" : "#666"} />
              </div>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .nav-fixed-wrapper {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          width: 90%;
          max-width: 400px;
        }

        .glass-dock {
          background: rgba(18, 18, 18, 0.85);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 100px;
          padding: 8px 15px 8px 25px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 15px 35px rgba(0,0,0,0.6);
        }

        .nav-items-group {
          display: flex;
          gap: 15px;
          flex: 1;
          justify-content: space-around;
        }

        .nav-divider {
          width: 1px;
          height: 30px;
          background: rgba(212, 175, 55, 0.2);
          margin: 0 15px;
        }

        .music-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vinyl-record {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #1a1a1a;
          border: 2px solid #333;
          position: relative;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }

        .vinyl-record.spinning {
          animation: rotate 3s linear infinite;
          border-color: #D4AF37;
        }

        .vinyl-center {
          width: 16px;
          height: 16px;
          background: #000;
          border-radius: 50%;
          border: 1px solid #D4AF37;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .music-bars {
          position: absolute;
          top: -15px;
          display: flex;
          gap: 2px;
        }

        .music-bars span {
          width: 2px;
          height: 10px;
          background: #D4AF37;
          animation: pulse 0.5s infinite alternate;
        }

        .back-to-top {
          position: fixed;
          bottom: 95px;
          right: 30px;
          background: rgba(212, 175, 55, 0.9);
          color: black;
          border: none;
          width: 35px;
          height: 35px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s;
          z-index: 9998;
        }

        .back-to-top.visible {
          opacity: 1;
          visibility: visible;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          from { height: 4px; }
          to { height: 12px; }
        }

        @media (max-width: 400px) {
          .nav-items-group { gap: 10px; }
          .glass-dock { padding: 6px 10px 6px 15px; }
          .nav-divider { margin: 0 10px; }
        }
      `}</style>
    </>
  );
};

const NavItem = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) => (
  <div onClick={onClick} className="nav-item">
    <div className="nav-icon">{icon}</div>
    <span className="nav-label">{label}</span>
    <style>{`
      .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        transition: 0.2s;
      }
      .nav-item:hover .nav-icon {
        color: #D4AF37;
        transform: translateY(-3px);
      }
      .nav-icon {
        color: #888;
        transition: 0.3s;
      }
      .nav-label {
        font-size: 0.6rem;
        color: #D4AF37;
        font-weight: bold;
        margin-top: 4px;
        letter-spacing: 0.5px;
      }
    `}</style>
  </div>
);