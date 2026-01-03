// components/GoogleMapsButton.tsx
interface GoogleMapsButtonProps {
  url: string;
}

export const GoogleMapsButton: React.FC<GoogleMapsButtonProps> = ({ url }) => {
return (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    role="button"
    // Hapus 'btn-primary', ganti dengan class dasar dan border-0
    className="btn d-inline-flex align-items-center justify-content-center px-4 py-2 border-0 fw-bold shadow-sm"
    style={{
      background: "linear-gradient(45deg, #D4AF37, #F9E498)",
      color: "black",
      borderRadius: "15px", // Menyesuaikan dengan gaya tombol submit sebelumnya
      fontSize: "0.9rem",
      letterSpacing: "0.5px",
      transition: "all 0.3s ease",
      textDecoration: "none" // Memastikan tidak ada garis bawah khas link
    }}
  >
    <i className="bi bi-geo-alt-fill me-2"></i> Lihat Lokasi
  </a>
);
};