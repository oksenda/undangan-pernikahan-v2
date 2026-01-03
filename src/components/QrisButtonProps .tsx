"use client";
import React from "react";
// Kita tetap import OverlayTrigger & Tooltip, tapi hapus Button
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { QrCode } from "lucide-react";

interface QrisButtonProps {
  qris: string;
}

export const QrisButton: React.FC<QrisButtonProps> = ({ qris }) => {
  const handleClick = () => {
    window.open(qris, "_blank");
  };

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="qris-tooltip">QRIS</Tooltip>}
    >
      <button
        type="button"
        onClick={handleClick}
        className="btn btn-outline-light rounded-circle p-0 d-flex align-items-center justify-content-center border-opacity-50"
        style={{ width: "32px", height: "32px" }}
      >
        <QrCode size={14} />
      </button>
    </OverlayTrigger>
  );
};