
import React from "react"

interface InputOverlayProps {
  guestName: string
  setGuestName: (name: string) => void
  handleOpen: () => void
}

export const InputOverlay: React.FC<InputOverlayProps> = ({ guestName, setGuestName, handleOpen }) => {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(10px)',
      color: 'white',
      textAlign: 'center',
      padding: '20px'
    }}>
      {/* Header */}
      <p style={{ letterSpacing: '0.3em', marginBottom: '20px', fontFamily: 'serif', fontSize: '1em' }}>THE WEDDING OF</p>
      <h1 style={{ fontSize: '3em', color: '#D4AF37', marginBottom: '40px', fontFamily: 'serif' }}>Kiki & Nia</h1>

      {/* Input Box */}
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        padding: '40px 30px',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.1)',
        width: '350px',
        maxWidth: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
      }}>
        <p style={{ marginBottom: '15px', fontSize: '1em' }}>Masukkan Nama Anda:</p>
        
        {/* Input */}
        <input
          type="text"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          placeholder="Nama Tamu..."
          style={{
            width: '100%',
            padding: '16px 20px',     // input tinggi dan nyaman
            borderRadius: '12px',
            border: '2px solid #D4AF37',
            background: 'transparent',
            color: 'white',
            textAlign: 'center',
            fontSize: '1.05em',
            marginBottom: '25px',
            outline: 'none',
            transition: 'border 0.3s, background 0.3s',
          }}
          onFocus={(e) => e.currentTarget.style.border = '2px solid #FFD700'}
          onBlur={(e) => e.currentTarget.style.border = '2px solid #D4AF37'}
        />

        {/* Button */}
        <button
          onClick={handleOpen}
          style={{
            width: '100%',
            padding: '16px',
            background: 'linear-gradient(45deg, #D4AF37, #FFD700)',
            border: 'none',
            borderRadius: '50px',
            color: 'black',
            fontWeight: 'bold',
            fontSize: '1.05em',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,215,0,0.6)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          BUKA UNDANGAN
        </button>
      </div>
    </div>
  )
}
