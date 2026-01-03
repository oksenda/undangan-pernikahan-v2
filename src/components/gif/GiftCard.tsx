"use client";
import { useState } from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { CopyButton } from "../CopyButton";
import { QrisButton } from "../QrisButtonProps ";

export type GiftCardVariant = "dark" | "warning" | "danger" | "primary";

export interface GiftCardProps {
  provider: string;
  accountNumber: string;
  type: string;
  owner: string;
  qris?: string;
  variant?: GiftCardVariant;
}

export default function GiftCard({
  provider,
  accountNumber,
  owner,
  qris,
  variant = "dark",
}: GiftCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin:", err);
    }
  };

  // Format angka: 1234 5678 9012
  const formatted = accountNumber.replace(/(\d{4})(?=\d)/g, "$1 ");

  return (
    <div className="d-flex justify-content-center my-4 px-1 w-100">
      <Card
        className="border-0 shadow-lg position-relative overflow-hidden text-white"
        style={{ 
          maxWidth: "400px", // Maksimal lebar kartu
          width: "100%",      // Responsif mengikuti layar HP
          aspectRatio: "1.58 / 1", // Rasio kartu kredit standar (sangat responsif)
          borderRadius: "24px",
          background: variant === "dark" 
            ? "linear-gradient(135deg, #0f0f0f 0%, #2a2a2a 100%)" 
            : "linear-gradient(135deg, #b8860b 0%, #d4af37 100%)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 15px 35px rgba(0,0,0,0.4)"
        }}
      >
        {/* Efek Hologram / Kilauan (Decorative) */}
        <div className="position-absolute w-100 h-100" style={{
          background: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          top: 0, left: 0, pointerEvents: "none"
        }} />
        
        {/* Elemen Chip Kartu (Menambah kesan asli) */}
        <div className="position-absolute" style={{
          width: "45px",
          height: "35px",
          background: "linear-gradient(135deg, #ffd700 0%, #b8860b 100%)",
          borderRadius: "6px",
          top: "40%",
          left: "8%",
          opacity: 0.8,
          boxShadow: "inset 0 0 5px rgba(0,0,0,0.2)"
        }} />

        <Card.Body className="p-3 p-md-4 d-flex flex-column justify-content-between h-100 position-relative">
          
          {/* Header: Logo & Provider */}
          <div className="d-flex justify-content-between align-items-start">
            <div className="d-flex align-items-center gap-2">
              <div className="bg-white rounded-circle d-flex align-items-center justify-content-center p-1" style={{ width: "35px", height: "35px" }}>
                <img 
                  src={`https://www.google.com/s2/favicons?domain=${provider.toLowerCase()}.com&sz=64`} 
                  alt="logo"
                  style={{ width: "22px", height: "22px", objectFit: "contain" }}
                  onError={(e) => (e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/60/60378.png")}
                />
              </div>
              <span className="fw-bold tracking-wider" style={{ fontSize: "1.1rem", textTransform: "uppercase" }}>
                {provider}
              </span>
            </div>
            <div className="text-end">
                <span className="badge rounded-pill bg-white bg-opacity-10 text-uppercase" style={{ fontSize: "0.55rem", letterSpacing: "1px" }}>
                  Digital Gift Card
                </span>
            </div>
          </div>

          {/* Body: Nomor Rekening (Font Dinamis) */}
          <div className="mt-4 pt-2">
            <small className="d-block opacity-50 mb-1" style={{ fontSize: "0.6rem", letterSpacing: "2px" }}>ACCOUNT NUMBER</small>
            <h3 className="fw-bold mb-0 text-nowrap" style={{ 
                letterSpacing: "4px", 
                fontSize: "calc(1.1rem + 0.5vw)", // Ukuran font dinamis
                fontFamily: "monospace",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)"
            }}>
              {formatted}
            </h3>
          </div>

          {/* Footer: Nama & Tombol */}
          <div className="d-flex justify-content-between align-items-end">
            <div style={{ maxWidth: "60%" }}>
              <small className="d-block opacity-50" style={{ fontSize: "0.6rem", letterSpacing: "1px" }}>CARD HOLDER</small>
              <p className="fw-bold text-truncate mb-0 text-uppercase" style={{ fontSize: "0.8rem", letterSpacing: "1px" }}>
                {owner}
              </p>
            </div>
            
            <div className="d-flex gap-2">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="copy-tooltip">{copied ? "Copied!" : "Copy"}</Tooltip>}
              >
                <div>
                  <CopyButton copied={copied} onClick={handleCopy} />
                </div>
              </OverlayTrigger>

              {qris && (
                <div className="qris-wrapper">
                  <QrisButton qris={qris} />
                </div>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}