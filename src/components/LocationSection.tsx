import React from "react";
import { Container, Card } from "react-bootstrap";
import { GoogleMapsButton } from "./GoogleMapsButtonProps ";

export const LocationSection: React.FC = () => {
  return (
    <section className="w-100 min-vh-100 d-flex align-items-center justify-content-center bg-transparent py-3 py-md-5">
      <Container className="d-flex justify-content-center px-2 px-md-3" fluid="md">
        <Card
          className="border-0 shadow-lg overflow-hidden text-white position-relative"
          style={{
            maxWidth: "900px", // Ukuran maksimal lebih besar agar lega di Tablet/PC
            width: "100%",
            borderRadius: "40px",
            height: "85vh", // Mengambil hampir seluruh tinggi layar
            border: "1px solid rgba(212, 175, 55, 0.3)",
          }}
        >
          {/* LAYER 1: PETA ANDA (TETAP SESUAI ASLINYA) */}
          <div 
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ 
              zIndex: 0,
              filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(90%)',
            }}
          >
            <iframe
              src="https://www.google.com/maps?q=0.1171486950210941,99.88443319856763&hl=id&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Lokasi"
            ></iframe>
          </div>

          {/* LAYER 2: OVERLAY GRADASI HALUS */}
          <div 
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ 
              zIndex: 1,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 50%, rgba(0,0,0,0.7) 100%)",
            }}
          />

          {/* LAYER 3: KONTEN TEKS & TOMBOL (FLOATING) */}
          <Card.Body 
            className="position-relative d-flex flex-column align-items-center justify-content-between text-center p-3 p-md-5" 
            style={{ zIndex: 2 }}
          >
            {/* Judul Atas dengan Kotak Transparan */}
            <div 
              className="mt-2 py-2 px-4"
              style={{
                background: "rgba(20, 20, 20, 0.6)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                borderRadius: "20px",
                border: "1px solid rgba(212, 175, 55, 0.2)",
              }}
            >
              <h2 
                style={{ 
                  color: '#D4AF37', 
                  fontFamily: 'serif', 
                  fontSize: 'calc(1.1rem + 0.5vw)', // Font dinamis
                  letterSpacing: '4px',
                  fontWeight: 'bold',
                  margin: 0,
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}
              >
                LOKASI ACARA
              </h2>
            </div>

            {/* Kotak Informasi Bawah (Glassmorphism diperluas) */}
            <div className="w-100 mb-2" style={{ maxWidth: "550px" }}>
              <div 
                className="p-3 p-md-4"
                style={{
                  background: "rgba(20, 20, 20, 0.75)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: "30px",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.6)"
                }}
              >
                <h4 
                  className="fw-bold mb-1" 
                  style={{ fontSize: 'calc(1.1rem + 0.3vw)', color: '#D4AF37' }}
                >
                  Aua Kuniang
                </h4>
                <p 
                  className="mb-3 opacity-90" 
                  style={{ 
                    fontSize: 'calc(0.75rem + 0.1vw)', 
                    lineHeight: '1.6',
                    color: '#f8f9fa'
                  }}
                >
                  Nagari Aua Kuniang, Kec. Pasaman, <br className="d-none d-md-block"/>
                  Kabupaten Pasaman Barat, Sumatera Barat
                </p>
                
                <div className="d-flex justify-content-center">
                  <div style={{ width: "100%", maxWidth: "300px" }}>
                    <GoogleMapsButton url="https://www.google.com/maps?q=0.1171486950210941,99.88443319856763" />
                  </div>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};