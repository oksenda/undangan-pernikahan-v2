"use client";
import { useEffect, useRef} from "react";
import weddingData from "../data/weddingData.json";

export default function MusicPlayer({ isPlaying }: { isPlaying: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.log("Play blocked", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <audio
      ref={audioRef}
      src={weddingData.assets.musikLatar}
      loop
      preload="auto"
    />
  );
}