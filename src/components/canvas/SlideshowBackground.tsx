"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";

interface SlideshowBackgroundProps {
  images: string[];
  autoInterval?: number;
  fadeDuration?: number;
}

const SlideshowBackground: React.FC<SlideshowBackgroundProps> = ({
  images,
  autoInterval = 5000,
  fadeDuration = 2000,
}) => {
  const [current, setCurrent] = useState(0);
  const [next, setNext]       = useState<number | null>(null);
  const [opacity, setOpacity] = useState(0);
  const lockRef               = useRef(false);
  const timerRef              = useRef<ReturnType<typeof setTimeout> | null>(null);

  const transition = useCallback((nextIdx: number) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setNext(nextIdx);
    setOpacity(0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setOpacity(1));
    });
    setTimeout(() => {
      setCurrent(nextIdx);
      setNext(null);
      setOpacity(0);
      lockRef.current = false;
    }, fadeDuration + 100);
  }, [fadeDuration]);

  const goNext = useCallback(() => {
    transition((current + 1) % images.length);
  }, [transition, current, images.length]);

  useEffect(() => {
    timerRef.current = setTimeout(goNext, autoInterval);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, goNext, autoInterval]);

  if (!images?.length) return null;

  const imgStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",       // selalu cover penuh, tidak ada sisi kosong
    objectPosition: "center 60%",
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",   // ikut lebar layar
      height: "100vh",  // ikut tinggi layar
      zIndex: 0,
      overflow: "hidden",
      background: "#111",
      pointerEvents: "none",
    }}>

      {/* Current image */}
      <img
        src={images[current]}
        alt=""
        draggable={false}
        style={{ ...imgStyle, zIndex: 1 }}
      />

      {/* Next image fade in */}
      {next !== null && (
        <img
          key={next}
          src={images[next]}
          alt=""
          draggable={false}
          style={{
            ...imgStyle,
            zIndex: 2,
            opacity,
            transition: `opacity ${fadeDuration}ms ease-in-out`,
          }}
        />
      )}

      {/* Dark overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 3,
        background: "rgba(0,0,0,0.38)",
      }} />

      {/* Dots */}
      <div style={{
        position: "absolute",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
        display: "flex",
        gap: 8,
        pointerEvents: "auto",
      }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (timerRef.current) clearTimeout(timerRef.current);
              transition(i);
            }}
            aria-label={`Gambar ${i + 1}`}
            style={{
              padding: 0,
              border: "1px solid rgba(255,255,255,0.7)",
              borderRadius: i === current ? 4 : "50%",
              width: i === current ? 22 : 8,
              height: 8,
              background: i === current ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
              cursor: "pointer",
              outline: "none",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SlideshowBackground;