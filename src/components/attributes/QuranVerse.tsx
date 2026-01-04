import React from "react";
import ScrollReveal from "../ScrollReveal";

const QuranVerse: React.FC = () => {
  return (
    <section className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-11 col-md-8 text-center text-white">
          <ScrollReveal>
            {/* Teks Arab dengan Font Simpel/Elegant */}
            <h2 className="mb-4" style={{ 
              fontFamily: "'Amiri', serif", 
              fontSize: "1.8rem",
              lineHeight: "2.5rem",
              color: "#D4AF37" 
            }}>
              وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗاِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ
            </h2>

            {/* Garis Pembatas Kecil */}
            <div className="mx-auto my-4" style={{ 
              width: "50px", 
              height: "2px", 
              background: "linear-gradient(to right, transparent, #D4AF37, transparent)" 
            }}></div>

            {/* Terjemahan */}
            <p className="fst-italic opacity-75" style={{ fontSize: "0.95rem", letterSpacing: "0.5px" }}>
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
            </p>
            
            <p className="fw-bold mt-2" style={{ color: "#D4AF37", fontSize: "0.8rem" }}>
              (QS. AR-RUM: 21)
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default QuranVerse;