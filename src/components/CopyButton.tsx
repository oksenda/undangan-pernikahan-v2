// components/CopyButton.tsx
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  copied: boolean;
  onClick: () => void;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ copied, onClick }) => {
  // Gunakan class Bootstrap sebagai string
  const variantClass = copied ? "btn-success" : "btn-outline-light";
  const icon = copied ? <Check size={14} /> : <Copy size={14} />;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn ${variantClass} rounded-circle p-0 d-flex align-items-center justify-content-center border-opacity-50`}
      style={{ 
        width: 32, 
        height: 32,
        transition: "all 0.2s ease" 
      }}
    >
      {icon}
    </button>
  );
};