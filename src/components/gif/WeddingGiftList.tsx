import { Container, Row, Col } from "react-bootstrap";
import GiftCard from "./GiftCard";
import { GifAccount } from "../../data/GifAccount";
import { useProfile } from "../../hooks/useProfile";

export default function WeddingGiftList() {
  const { profile } = useProfile();
  const profileName = profile.profileName;
  const gifAccounts = GifAccount[profileName] || [];

  return (
    <section 
      className="py-5 position-relative" 
      style={{ 
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "transparent" // Karena background utama Anda sudah hitam
      }}
    >
      <Container className="px-3"> 
        <div 
          className="p-4 p-md-5 shadow-lg position-relative"
          style={{
            background: "rgba(255, 255, 255, 0.02)", // Sangat tipis agar hitam background tetap dominan
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "50px",
            border: "1px solid rgba(212, 175, 55, 0.25)", // Border Emas Tipis
            margin: "0 auto",
            maxWidth: "1100px"
          }}
        >
          {/* Header Section */}
          <div className="text-center mb-5">
            <h2 
              className="fw-bold mb-3" 
              style={{ 
                fontFamily: 'serif', 
                color: '#D4AF37', // EMAS
                fontSize: 'calc(1.8rem + 1.2vw)',
                letterSpacing: '4px',
                textTransform: 'uppercase'
              }}
            >
              Wedding Gift
            </h2>
            
            {/* Divider Emas */}
            <div 
              style={{ 
                width: '60px', 
                height: '1.5px', 
                backgroundColor: '#D4AF37', 
                margin: '0 auto 25px',
              }} 
            />

            <p 
              className="mx-auto fw-light" 
              style={{ 
                maxWidth: "650px", 
                fontSize: "calc(0.85rem + 0.1vw)",
                lineHeight: "1.8",
                color: "#FFFFFF", // PUTIH
                opacity: 0.9
              }}
            >
              Doa restu Anda adalah hadiah terindah bagi kami. Namun, jika Anda ingin memberikan tanda kasih, Anda dapat menyampaikannya melalui:
            </p>
          </div>

          {/* Grid Kartu Gift */}
          <Row className="g-4 justify-content-center">
            {gifAccounts.map((acc, i) => (
              <Col xs={12} lg={6} xl={5} className="d-flex justify-content-center" key={i}>
                <GiftCard {...acc} />
              </Col>
            ))}
          </Row>

          {/* Footer Section */}
          <div className="mt-5 text-center pt-4" style={{ borderTop: "1px solid rgba(212, 175, 55, 0.15)" }}>
            <p 
              className="fw-bold mb-0" 
              style={{ 
                letterSpacing: "6px", 
                fontSize: "0.8rem", 
                color: '#D4AF37', // EMAS
                textTransform: 'uppercase'
              }}
            >
              Terima Kasih
            </p>
            <p 
              className="mt-2 mb-0" 
              style={{ 
                fontSize: "0.85rem", 
                color: "#FFFFFF", // PUTIH
                fontStyle: "italic",
                opacity: 0.7
              }}
            >
              — Atas segala doa dan kebaikan Anda —
            </p>
            
            {/* Ornamen Simbol Emas */}
            <div className="mt-3" style={{ color: '#D4AF37', fontSize: '1.2rem opacity-50' }}>
              ✦ ✦ ✦
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}