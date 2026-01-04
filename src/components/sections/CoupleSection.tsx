import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "../ScrollReveal";
import weddingData from "../../data/wddingData.json";
import QuranVerse from "../attributes/QuranVerse";
const CoupleSection: React.FC = () => {
  const coupleData = {
    groom: {
      name: weddingData.pengantin.pria.namaLengkap,
      info: `Putra pertama dari Bapak ${
        weddingData.pengantin.pria.ayah
      } & Ibu ${weddingData.pengantin.pria.ibu}`,
      image: weddingData.pengantin.pria.foto,
    },
    bride: {
      name: weddingData.pengantin.wanita.namaLengkap,
      info: `Putri pertama dari Bapak ${
        weddingData.pengantin.wanita.ayah
      } & Ibu ${weddingData.pengantin.wanita.ibu}`,
      image: weddingData.pengantin.wanita.foto,
    },
  };

  return (
    <section className="container py-4 rounded-4 mb-5"  style={{ 
                   background: "rgba(255, 255, 255, 0.05)", 
                   backdropFilter: "blur(10px)",
                   border: "1px solid rgba(255, 255, 255, 0.1)",
                   color: "#D4AF37"
                 }}>
      <div className="row justify-content-center align-items-center g-4">
        <QuranVerse />
        <div className="col-12 col-md-5">
          <ScrollReveal>
            <div className="text-center p-4 rounded-4 shadow-lg" 
                 style={{ 
                   background: "rgba(255, 255, 255, 0.05)", 
                   backdropFilter: "blur(10px)",
                   border: "1px solid rgba(255, 255, 255, 0.1)",
                   color: "#D4AF37" // Warna emas elegan
                 }}>
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={coupleData.groom.image}
                alt="Groom"
                className="img-fluid rounded-4 mb-4 shadow-sm"
                style={{ width: "100%", maxHeight: "450px", objectFit: "cover" }}
              />
              <h2 className="fw-bold mb-2" style={{ fontFamily: "serif" }}>
                {coupleData.groom.name}
              </h2>
              <p className="text-light opacity-75 small">
                {coupleData.groom.info}
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Simbol "&" di Tengah */}
        <div className="col-12 col-md-2 text-center py-3">
          <ScrollReveal>
            <h1 className="display-3" style={{ color: "#D4AF37", fontFamily: "serif italic" }}>&</h1>
          </ScrollReveal>
        </div>

        {/* Mempelai Wanita */}
        <div className="col-12 col-md-5">
          <ScrollReveal>
            <div className="text-center p-4 rounded-4 shadow-lg" 
                 style={{ 
                   background: "rgba(255, 255, 255, 0.05)", 
                   backdropFilter: "blur(10px)",
                   border: "1px solid rgba(255, 255, 255, 0.1)",
                   color: "#D4AF37"
                 }}>
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={coupleData.bride.image}
                alt="Bride"
                className="img-fluid rounded-4 mb-4 shadow-sm"
                style={{ width: "100%", maxHeight: "450px", objectFit: "cover" }}
              />
              <h2 className="fw-bold mb-2" style={{ fontFamily: "serif" }}>
                {coupleData.bride.name}
              </h2>
              <p className="text-light opacity-75 small">
                {coupleData.bride.info}
              </p>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};

export default CoupleSection;