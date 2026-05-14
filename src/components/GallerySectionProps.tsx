import { motion } from "framer-motion";
import React from "react";
import { Container, Carousel, Image } from "react-bootstrap";

interface GallerySectionProps {
  images: string[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ images }) => {

  // const rotations = useMemo(() => {
  //   return images.map((_, i) => {
  //     const tilt = ((i * 13) % 6) - 3;
  //     return tilt === 0 ? 2 : tilt;
  //   });
  // }, [images]);

  return (
    <section className="py-5" style={{ position: "relative", zIndex: 10 }}>
      <Container>
        {/* JUDUL - Tetap sesuai teks Anda */}
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3" style={{ color: "#D4AF37", fontFamily: "serif" }}>
            Galeri Momen
          </h2>
          <p className="fst-italic text-white opacity-75 mx-auto" style={{ maxWidth: "600px" }}>
            "Cinta tidak terlihat dengan mata, tetapi dengan hati."
          </p>
        </div>

        {/* --- CAROUSEL ATAS --- */}
        <div className="mb-5 shadow-lg rounded-4 overflow-hidden border border-white border-opacity-10">
          <Carousel fade interval={3000} indicators={false} controls={true}>
            {images.map((img, i) => (
              <Carousel.Item key={`carousel-${i}`} style={{ height: "450px" }}>
                <Image
                  src={img}
                  className="d-block w-100 h-100"
                  style={{ objectFit: "cover" }}
                  alt={`Top Gallery ${i}`}
                  loading="eager"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        {/* --- GRID MASONRY (FOTO ACAK BERTUMPUK) --- */}
        <div className="masonry-grid">
          {images.map((img, i) => (
            <motion.div
              key={`masonry-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ 
                opacity: 1, 
                y: 0
              }}
              viewport={{ once: true, amount: 0.1 }} 
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              style={{ 
                marginBottom: "1.5rem", 
                breakInside: "avoid", 
                display: "inline-block",
                width: "100%",
                willChange: "transform"
              }}
            >
              <div 
                className="shadow-lg rounded-3 p-1 border border-white border-opacity-10"
                style={{ 
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(4px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
                }}
              >
                <img
                  src={img}
                  alt={`Moment ${i}`}
                  loading="lazy"
                  className="w-100 rounded-2"
                  style={{ 
                    display: "block", 
                    height: "auto", 
                    objectFit: "cover",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* STYLING CSS */}
      <style>{`
        .masonry-grid {
          column-count: 2;
          column-gap: 1.2rem;
          width: 100%;
        }
        @media (min-width: 768px) {
          .masonry-grid {
            column-count: 3;
            column-gap: 1.5rem;
          }
        }
        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          background-color: #D4AF37;
          border-radius: 50%;
          padding: 15px;
        }
      `}</style>
    </section>
  );
};

export default GallerySection;