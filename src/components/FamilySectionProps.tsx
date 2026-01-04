import React from "react";
import { Container } from "react-bootstrap";
import weddingData from "../data/wddingData.json";

interface FamilySectionProps {
  title: string;
  maleMembers: string[];  
  femaleMembers: string[]; 
}

export const FamilySection: React.FC<FamilySectionProps> = () => {
  return (
    <section 
      className="py-5 d-flex align-items-center" 
      style={{ 
        background: "rgba(255, 255, 255, 0.03)", // Glassmorphism lembut
        minHeight: "100vh",
        borderRadius: "40px",
        margin: "15px",
        backdropFilter: "blur(15px)",
        WebkitBackdropFilter: "blur(15px)",
        border: "1px solid rgba(212, 175, 55, 0.2)",
        color: "white"
      }}
    >
      <Container className="text-center py-4">
        {/* BAGIAN KATA PENGHORMATAN */}
        <div className="mb-5 px-2 animate__animated animate__fadeIn">
          <h3 
            className="mb-4" 
            style={{ 
              fontFamily: "'Playfair Display', serif", 
              color: "#D4AF37", 
              fontStyle: "italic",
              fontSize: "calc(1.5rem + 1vw)" // Responsif font
            }}
          >
            Atas Kehadiran & Doa Restunya
          </h3>
          <p 
            className="mx-auto opacity-75 fw-light" 
            style={{ 
              maxWidth: "700px", 
              lineHeight: "1.8", 
              fontSize: "calc(0.9rem + 0.2vw)",
              color: "#f8f9fa" 
            }}
          >
            Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga apabila 
            Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
          </p>
        </div>

        {/* NAMA PENGANTIN TENGAH */}
        <div className="my-5 py-4" style={{ position: "relative" }}>
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "150px",
            height: "150px",
            background: "radial-gradient(circle, rgba(212,175,55,0.1) 0%, rgba(0,0,0,0) 70%)",
            zIndex: 0
          }}></div>
          
          <p className="text-uppercase mb-3" style={{ letterSpacing: "5px", color: "#D4AF37", fontSize: "0.75rem", fontWeight: "300" }}>
            Hormat Kami Yang Berbahagia,
          </p>
          <h2 
            className="fw-bold mb-0" 
            style={{ 
              fontFamily: "'Playfair Display', serif", 
              color: "#D4AF37",
              fontSize: "calc(2.5rem + 1.5vw)",
              textShadow: "0 0 15px rgba(212, 175, 55, 0.2)"
            }}
          >
            {weddingData.pengantin.pria.namaPanggilan} & {weddingData.pengantin.wanita.namaPanggilan}
          </h2>
        </div>
        <div className="mt-5 px-3">
          <p className="mt-5 opacity-40 fst-italic" style={{ fontSize: "0.85rem", letterSpacing: "1px" }}>
            & Seluruh Keluarga Besar
          </p>
        </div>
        <div className="mt-5 pt-4 opacity-50" style={{ letterSpacing: "15px", color: "#D4AF37", fontSize: "1.2rem" }}>
          ✦ ✦ ✦
        </div>
      </Container>

      <style>{`
        .family-box {
          transition: all 0.3s ease;
        }
        li {
          position: relative;
          transition: color 0.3s ease;
        }
        li:hover {
          color: #D4AF37;
        }
        @media (max-width: 768px) {
          .family-box {
            background: rgba(255,255,255,0.02);
            border-radius: 20px;
            padding: 20px !important;
          }
        }
      `}</style>
    </section>
  );
};