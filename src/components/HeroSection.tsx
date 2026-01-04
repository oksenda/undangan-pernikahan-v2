import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import weddingData from "../data/wddingData.json";

interface HeroSectionProps {
  guestName: string;
  weddingDate?: string;
  cardImages?: string[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  guestName,
  weddingDate = weddingData.acara.time,
  cardImages = weddingData.assets.cardImages
}) => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const { pria, wanita } = weddingData.pengantin;
  const eventDate = new Date(weddingDate).toLocaleDateString("id-ID", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  // LOGIC: Auto-slide Background
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % cardImages.length);
    }, 4000); // Ganti gambar setiap 4 detik
    return () => clearInterval(slideTimer);
  }, [cardImages.length]);

  // LOGIC: Countdown
  useEffect(() => {
    const target = new Date(weddingDate).getTime();
    const timer = setInterval(() => {
      const diff = target - Date.now();
      if (diff <= 0) return clearInterval(timer);
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <section className="w-100 min-vh-100 d-flex align-items-center justify-content-center bg-transparent py-4">
      <Container className="d-flex justify-content-center px-2">
        <Card
          className="border-0 shadow-lg overflow-hidden text-white position-relative"
          style={{
            maxWidth: "480px",
            width: "100%", 
            borderRadius: "35px",
            height: "auto",
            minHeight: "80vh",
          }}
        >
          {/* BACKGROUND LAYER: Custom CSS Fade */}
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 0 }}>
            {cardImages.map((img, idx) => (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  top: 0, left: 0, width: "100%", height: "100%",
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: currentImgIndex === idx ? 1 : 0,
                  transition: "opacity 1.5s ease-in-out", // Efek fade yang sangat halus
                }}
              />
            ))}
          </div>

          {/* CONTENT AREA */}
          <Card.Body 
            className="position-relative d-flex flex-column align-items-center justify-content-between text-center" 
            style={{ zIndex: 1, padding: "calc(1.5rem + 2vw)" }}
          >
            <div className="w-100 mt-2">
              <div className="mb-2 opacity-75" style={{ letterSpacing: "8px", fontSize: "0.8rem" }}>✦ ✦ ✦</div>
              <p className="fw-light mb-1" style={{ letterSpacing: "4px", color: "#D4AF37", fontSize: "0.7rem" }}>THE WEDDING OF</p>
              <h1 
                className="fw-bold" 
                style={{ 
                  fontFamily: "serif", 
                  color: "#D4AF37",
                  fontSize: "calc(1.8rem + 1.2vw)",
                  lineHeight: "1.2"
                }}
              >
                {pria.namaPanggilan} & {wanita.namaPanggilan}
              </h1>
            </div>

            <div className="my-3">
              <p className="mb-1 opacity-75" style={{ fontSize: "0.85rem" }}>Kepada Yth. Bapak/Ibu/Saudara/i:</p>
              <h2 className="fw-bold" style={{ fontSize: "calc(1.4rem + 0.8vw)" }}>{guestName}</h2>
            </div>

            <div className="w-100 mb-2">
              <p className="small opacity-75 mb-3 px-3 fst-italic" style={{ lineHeight: "1.5", fontSize: "0.8rem" }}>
                “Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri...”
              </p>
              
              <div className="mb-4 text-warning">
                <p className="mb-0 fw-bold" style={{ letterSpacing: "1px", fontSize: "1rem" }}>{eventDate}</p>
                {/* <small className="opacity-75" style={{ fontSize: "0.7rem" }}>Resepsi Pernikahan</small> */}
              </div>

              {/* COUNTDOWN */}
              <div className="py-2 border-top border-bottom border-white border-opacity-25">
                <Row className="g-0">
                  <Col>
                    <div className="fw-bold" style={{ fontSize: "1.6rem" }}>{countdown.days}</div>
                    <small className="opacity-50 text-uppercase" style={{ fontSize: '0.6rem' }}>Hari</small>
                  </Col>
                  <Col className="border-start border-end border-white border-opacity-25">
                    <div className="fw-bold" style={{ fontSize: "1.6rem" }}>{countdown.hours}</div>
                    <small className="opacity-50 text-uppercase" style={{ fontSize: '0.6rem' }}>Jam</small>
                  </Col>
                  <Col>
                    <div className="fw-bold" style={{ fontSize: "1.6rem" }}>{countdown.minutes}</div>
                    <small className="opacity-50 text-uppercase" style={{ fontSize: '0.6rem' }}>Menit</small>
                  </Col>
                </Row>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}