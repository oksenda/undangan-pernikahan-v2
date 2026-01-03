import React from "react";
import { Container, Card, Row, Col, Image } from "react-bootstrap";
import weddingData from "../data/wddingData.json";

interface GreetingSectionProps {
  guestName: string;
}
const { pengantin } = weddingData;

export const GreetingSection: React.FC<GreetingSectionProps> = ({ guestName }) => {
  return (
    <section 
      className="w-100 d-flex align-items-center justify-content-center py-5"
      style={{ 
        minHeight: "100vh",
        background: "transparent" 
      }}
    >
      <Container className="d-flex justify-content-center px-3">
        <Card
          className="border-0 shadow-lg text-center"
          style={{
            maxWidth: "600px",
            width: "100%",
            padding: "calc(1.5rem + 1vw)", // Padding dinamis
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            borderRadius: "30px",
            border: "1px solid rgba(212, 175, 55, 0.3)",
          }}
        >
          <Card.Body className="text-light p-0">
            
            {/* AREA FOTO PROFIL (Sekarang Responsif) */}
            <Row className="justify-content-center align-items-center mb-4 g-2 g-md-3">
              {/* Foto Pria */}
              <Col xs={4} sm="auto" className="d-flex justify-content-center">
                <div style={{
                  padding: "3px",
                  border: "1.5px solid #D4AF37",
                  borderRadius: "50%",
                }}>
                  <Image 
                    src={pengantin.pria.foto} 
                    roundedCircle 
                    style={{ 
                      width: "calc(50px + 3vw)", // Ukuran dinamis
                      height: "calc(50px + 3vw)", 
                      objectFit: "cover" 
                    }}
                    alt="Mempelai Pria"
                  />
                </div>
              </Col>
              
              {/* Nama Tengah */}
              <Col xs={12} sm="auto" className="order-3 order-sm-2 my-2 my-sm-0">
                <span style={{ 
                  fontSize: "calc(1.1rem + 0.5vw)", 
                  color: "#D4AF37", 
                  fontFamily: "serif",
                  display: "block" 
                }}>
                  {pengantin.pria.namaPanggilan} & {pengantin.wanita.namaPanggilan}
                </span>
              </Col>

              {/* Foto Wanita */}
              <Col xs={4} sm="auto" className="d-flex justify-content-center order-2 order-sm-3">
                <div style={{
                  padding: "3px",
                  border: "1.5px solid #D4AF37",
                  borderRadius: "50%",
                }}>
                  <Image 
                    src={pengantin.wanita.foto}
                    roundedCircle 
                    style={{ 
                      width: "calc(50px + 3vw)", 
                      height: "calc(50px + 3vw)", 
                      objectFit: "cover" 
                    }}
                    alt="Mempelai Wanita"
                  />
                </div>
              </Col>
            </Row>

            <h2 
              className="fw-bold mb-3" 
              style={{ 
                color: "#D4AF37", 
                fontFamily: "serif", 
                fontSize: "calc(1.5rem + 1vw)", // Judul responsif
                letterSpacing: "1px"
              }}
            >
              Salam Hormat
            </h2>

            <div 
              className="fst-italic opacity-90" 
              style={{ 
                fontSize: "calc(0.9rem + 0.2vw)", // Teks responsif
                lineHeight: "1.6",
                color: "#f8f9fa" 
              }}
            >
              <p className="mb-0">
                &quot;Keluarga besar kami sangat menghargai kehadiran 
                <span className="d-block fw-bold my-2" style={{ color: "#D4AF37", fontSize: "calc(1.1rem + 0.2vw)" }}>
                  {guestName || "Tamu Undangan"}
                </span> 
                untuk menjadi bagian dari kebahagiaan kami.&quot;
              </p>
            </div>

            <div className="mt-4">
               <p className="mb-0" style={{ letterSpacing: "2px", fontSize: "0.7rem", color: "#D4AF37", textTransform: "uppercase" }}>
                  Kami yang berbahagia,
               </p>
               <h4 className="mt-2" style={{ 
                 fontFamily: "serif", 
                 color: "white",
                 fontSize: "calc(1rem + 0.5vw)" 
               }}>
                 {pengantin.pria.namaLengkap} <br className="d-block d-sm-none"/> & <br className="d-block d-sm-none"/> {pengantin.wanita.namaLengkap}
               </h4>
            </div>

            <div 
              className="mx-auto mt-4" 
              style={{ 
                width: "60px", 
                height: "2px", 
                background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" 
              }} 
            />
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};