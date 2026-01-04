import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";

interface WeddingTimeSectionProps {
  targetDate: string;
  title: string;
}

export const WeddingTimeSection: React.FC<WeddingTimeSectionProps> = ({ 
  targetDate,
  title,
}) => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // 1. Format Tanggal Indonesia Lengkap
  const formatIndonesianDate = (isoString: string) => {
    try {
      const dateObj = new Date(isoString);
      return new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(dateObj);
    } catch (e) {
       console.error(e);
      throw new Error("Format waktu tidak valid atau data kosong");
    }
  };

  // 2. Perbaikan RangeError Jam (Tanpa Karakter Aneh)
  const formatTimeRange = (isoString: string) => {
    try {
      const dateObj = new Date(isoString);
      const jam = dateObj.getHours().toString().padStart(2, '0');
      const menit = dateObj.getMinutes().toString().padStart(2, '0');
      return `${jam}:${menit} WIB`;
    } catch (e) {
      console.error(e);
      throw new Error("Format waktu tidak valid atau data kosong");
    }
  };

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(timer);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section 
      className="w-auto d-flex align-items-center justify-content-center py-1" 
      style={{ background: "transparent" }}
    >
      <Container className="d-flex justify-content-center px-3">
        <Card
          className="border-0 shadow-lg text-center text-white"
          style={{
            maxWidth: "500px",
            width: "100%",
            padding: "20px 10px", 
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            borderRadius: "30px",
            border: "1px solid rgba(212, 175, 55, 0.3)",
          }}
        >
          <Card.Body>
            {/* Judul Responsif: calc(dasar + variabel lebar layar) */}
            <h2 
              className="fw-bold mb-4" 
              style={{ 
                color: "#D4AF37", 
                fontFamily: "serif", 
                fontSize: "calc(1.4rem + 1vw)" 
              }}
            >
              {title}
            </h2>

            <div className="mb-4">
              <div className="mb-2">
                <i className="bi bi-calendar3 d-block mb-2 text-warning fs-4"></i>
                <h6 className="text-uppercase opacity-50" style={{ fontSize: "0.7rem", letterSpacing: "2px" }}>Tanggal</h6>
                <p className="fw-bold mb-0" style={{ fontSize: "calc(1rem + 0.3vw)" }}>
                  {formatIndonesianDate(targetDate)}
                </p>
              </div>
              
              <hr className="mx-auto opacity-25" style={{ width: "30%", color: "#D4AF37" }} />
              
              <div className="mt-2">
                <i className="bi bi-clock d-block mb-2 text-warning fs-4"></i>
                <h6 className="text-uppercase opacity-50" style={{ fontSize: "0.7rem", letterSpacing: "2px" }}>Pukul</h6>
                <p className="fw-bold mb-0" style={{ fontSize: "calc(1rem + 0.3vw)" }}>
                  {formatTimeRange(targetDate)} - Selesai
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-top border-white border-opacity-10">
              <h6 className="text-uppercase mb-3 opacity-75" style={{ fontSize: "0.6rem", letterSpacing: "3px" }}>Menuju Hari Bahagia</h6>
              
              <Row className="g-2 justify-content-center">
                {[
                  { label: "Hari", val: countdown.days },
                  { label: "Jam", val: countdown.hours },
                  { label: "Menit", val: countdown.minutes },
                  { label: "Detik", val: countdown.seconds }
                ].map((item, i) => (
                  <Col xs={3} key={i}>
                    <div 
                      className="py-2 rounded-3" 
                      style={{ 
                        background: "rgba(212, 175, 55, 0.1)", 
                        border: "1px solid rgba(212, 175, 55, 0.2)" 
                      }}
                    >
                      {/* Angka Countdown Responsif */}
                      <span 
                        className="d-block fw-bold text-warning" 
                        style={{ fontSize: "calc(1.1rem + 0.5vw)" }}
                      >
                        {item.val}
                      </span>
                      <small className="text-uppercase opacity-50" style={{ fontSize: "0.5rem" }}>
                        {item.label}
                      </small>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};