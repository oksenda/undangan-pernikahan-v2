
import React from "react";
import { Container, Carousel, Row, Col, Image } from "react-bootstrap";

interface GallerySectionProps {
  images: string[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ images }) => {
  const topImages = images;
  const groupedImages = [];
  for (let i = 0; i < images.length; i += 3) {
    groupedImages.push(images.slice(i, i + 3));
  }

  return (
    <section className="py-5 bg-transparent">
      <Container>
        {/* JUDUL */}
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3" style={{ color: "#D4AF37", fontFamily: "serif" }}>
            Galeri Momen
          </h2>
          <p className="fst-italic text-white opacity-75 mx-auto" style={{ maxWidth: "600px" }}>
            "Cinta tidak terlihat dengan mata, tetapi dengan hati."
          </p>
        </div>

        {/* --- CAROUSEL ATAS (FADE) --- */}
        <div className="mb-5 shadow-lg rounded-4 overflow-hidden border border-white border-opacity-10">
          <Carousel fade interval={2000} indicators={false}>
            {topImages.map((img, i) => (
              <Carousel.Item key={i} style={{ height: "450px" }}>
                <Image
                  src={img}
                  className="d-block w-100 h-100"
                  style={{ objectFit: "cover" }}
                  alt="Top Gallery"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        {/* --- CAROUSEL BAWAH (MULTI-ITEM 3 GAMBAR) --- */}
        <div className="mt-5">
          <Carousel 
            interval={2500} // Kecepatan otomatis berjalan
            indicators={true}
            controls={true}
            pause="hover" // Akan berhenti sebentar jika kursor di atasnya
          >
            {groupedImages.map((group, idx) => (
              <Carousel.Item key={idx}>
                <Row className="px-5 g-3">
                  {group.map((img, i) => (
                    <Col xs={4} key={i}>
                      <div 
                        className="bg-white p-1 p-md-2 shadow-sm rounded-3"
                        style={{ border: "1px solid rgba(212,175,55,0.2)" }}
                      >
                        <Image
                          src={img}
                          className="w-100 rounded-2 shadow-sm"
                          style={{ 
                            aspectRatio: "3/4", 
                            objectFit: "cover",
                            display: "block"
                          }}
                          alt={`Gallery group ${idx} item ${i}`}
                        />
                      </div>
                    </Col>
                  ))}
                  {/* Fallback jika dalam 1 grup kurang dari 3 gambar agar layout tidak berantakan */}
                  {group.length < 3 && Array(3 - group.length).fill(null).map((_, emptyIdx) => (
                    <Col xs={4} key={`empty-${emptyIdx}`} />
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </Container>

      {/* Custom CSS agar tombol navigasi terlihat jelas di atas background gelap */}
      <style>{`
        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          background-color: #D4AF37;
          border-radius: 50%;
          padding: 15px;
          background-size: 50%;
        }
        .carousel-indicators [data-bs-target] {
          background-color: #D4AF37;
        }
      `}</style>
    </section>
  );
};