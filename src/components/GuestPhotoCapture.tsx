import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import Webcam from 'react-webcam';
import Swal from 'sweetalert2';

// Definisi interface untuk data galeri dari Google Drive
interface GalleryFile {
  id: string;
  thumbnailLink: string;
}

const GuestPhotoCapture = () => {
  // 1. Perbaikan Type pada useRef
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 2. Perbaikan Type pada useState
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [gallery, setGallery] = useState<GalleryFile[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [showCamera, setShowCamera] = useState<boolean>(false);

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxql-Gitbyyu6mSekjuzwGOnW-gBTr738KMdQgDWEZBfUIZXj3-v4T5DPKLSYfEef-izA/exec';

  // 3. Perbaikan Parameter Types pada luxurySwal
  const luxurySwal = (title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info') => {
    return Swal.fire({
      title,
      text,
      icon,
      background: '#1a1a1a',
      color: '#ffffff',
      confirmButtonColor: '#d4af37',
      iconColor: icon === 'success' ? '#d4af37' : '#ff4d4d',
      customClass: {
        popup: 'border-gold-swal',
        title: 'gold-text-swal'
      }
    });
  };

  const handleOpenCamera = async () => {
    try {
      // Perbaikan: navigator.mediaDevices.getUserMedia adalah fungsi yang harus di-check keberadaannya saja
      if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
        setShowCamera(true);
      } else {
        luxurySwal('Tidak Didukung', 'Browser Anda tidak mendukung akses kamera.', 'error');
      }
    } catch (err) {
       console.error(err);
      luxurySwal('Izin Ditolak', 'Mohon aktifkan izin kamera pada browser Anda.', 'error');
    }
  };

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImgSrc(imageSrc);
        setShowCamera(false);
      }
    }
  };

  // 4. Perbaikan Type pada Event Handler Upload
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImgSrc(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadPhoto = async () => {
    if (!imgSrc) return;
    setIsUploading(true);
    
    Swal.fire({
      title: 'Mengabadikan Momen...',
      background: '#1a1a1a',
      color: '#d4af37',
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); }
    });

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        cache: 'no-cache',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ image: imgSrc }),
      });

      luxurySwal('Terima Kasih!', 'Kenangan Anda telah tersimpan.', 'success');
      setImgSrc(null);
      setTimeout(() => fetchGallery(), 3000);
    } catch (error) {
      luxurySwal('Oops!', 'Gagal mengunggah foto.', 'error');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const fetchGallery = async () => {
    try {
      const res = await fetch(SCRIPT_URL);
      const data = await res.json();
      setGallery(data.files || []);
    } catch (err) { 
       console.error(err);
      console.log("Galeri belum tersedia."); 
    }
  };

  useEffect(() => { fetchGallery(); }, []);

  return (
    <div className="guest-photo-section py-4 py-md-5 px-2 px-md-3">
      <div className="container-fluid shadow-lg rounded-4 p-3 p-md-5 border-gold shadow-gold bg-black-transparent text-white mt-4 mt-md-5 mx-auto" style={{ maxWidth: '900px' }}>
        
        <div className="text-center mb-4 mb-md-5">
          <h2 className="font-serif gold-text mb-2 text-uppercase tracking-widest fs-3 fs-md-1">Guest Memories</h2>
          <div className="divider-gold mb-3" style={{ width: '80px' }}></div>
          <p className="text-light-white fw-light italic fs-6 fs-md-5">Sentuhan kenangan Anda adalah hadiah bagi kami</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            
            {!imgSrc && !showCamera && (
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mb-4 animate__animated animate__fadeIn">
                <button className="btn btn-outline-gold px-4 py-3 rounded-pill flex-grow-1" onClick={handleOpenCamera}>
                  <i className="bi bi-camera-fill me-2"></i> OPEN CAMERA
                </button>
                {/* 5. Perbaikan: Optional chaining pada ref.current */}
                <button className="btn btn-gold-solid px-4 py-3 rounded-pill shadow flex-grow-1" onClick={() => fileInputRef.current?.click()}>
                  <i className="bi bi-image me-2"></i> FROM GALLERY
                </button>
                <input type="file" ref={fileInputRef} className="d-none" accept="image/*" onChange={handleFileUpload} />
              </div>
            )}

            {showCamera && (
              <div className="camera-wrap position-relative rounded-4 overflow-hidden border-gold shadow-lg animate__animated animate__zoomIn bg-dark">
                <Webcam 
                  audio={false} 
                  ref={webcamRef} 
                  screenshotFormat="image/jpeg" 
                  className="w-100 d-block"
                  videoConstraints={{ 
                    facingMode: "user",
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                  }}
                  onUserMediaError={() => {
                    luxurySwal('Kamera Gagal', 'Tidak dapat mengakses kamera.', 'error');
                    setShowCamera(false);
                  }}
                />
                <div className="camera-controls p-2 p-md-3 bg-black-overlay position-absolute bottom-0 w-100 d-flex justify-content-between align-items-center">
                  <button className="btn btn-sm btn-outline-light rounded-pill px-3" onClick={() => setShowCamera(false)}>CANCEL</button>
                  <button className="btn btn-gold-solid rounded-pill px-4 py-2" onClick={capture}>CAPTURE</button>
                </div>
              </div>
            )}

            {imgSrc && (
              <div className="preview-wrap animate__animated animate__fadeIn">
                <div className="position-relative rounded-4 overflow-hidden border-gold shadow-lg">
                  <img src={imgSrc} alt="Preview" className="w-100 d-block shadow" />
                </div>
                <div className="mt-4 d-flex flex-row justify-content-center gap-2 gap-md-3">
                  <button className="btn btn-outline-light rounded-pill px-3 px-md-4 py-2 flex-grow-1" onClick={() => setImgSrc(null)}>ULANGI</button>
                  <button className="btn btn-gold-solid rounded-pill px-4 px-md-5 py-2 shadow-gold flex-grow-1" onClick={uploadPhoto} disabled={isUploading}>
                    {isUploading ? 'MENGIRIM...' : 'SHARE PHOTO'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="divider-gold my-5 opacity-50"></div>

        <div className="gallery-section text-center">
          <h4 className="gold-text font-serif mb-4 fw-light tracking-wide">Captured Moments</h4>
          <div className="row g-2 g-md-3 justify-content-center">
            {gallery.length > 0 ? gallery.map((f) => (
              <div key={f.id} className="col-4 col-sm-3 col-lg-2">
                <div className="gallery-item border-gold-thin rounded-3 overflow-hidden shadow-sm hvr-grow aspect-ratio-square">
                   <img 
                    src={f.thumbnailLink?.replace("s220", "s600")} 
                    className="img-gallery" 
                    alt="guest-memory" 
                    loading="lazy" 
                   />
                </div>
              </div>
            )) : (
              <div className="col-12 py-4">
                <p className="text-muted small italic opacity-75">Belum ada kenangan yang dibagikan.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .bg-black-transparent { background: rgba(10, 10, 10, 0.85); backdrop-filter: blur(15px); }
        .border-gold { border: 1.5px solid #d4af37 !important; }
        .border-gold-thin { border: 1px solid rgba(212, 175, 55, 0.3); }
        .gold-text { color: #d4af37; letter-spacing: 3px; }
        .text-light-white { color: rgba(255, 255, 255, 0.7); }
        .btn-gold-solid { background: linear-gradient(135deg, #d4af37 0%, #f4e07d 50%, #d4af37 100%); color: #000 !important; font-weight: 700; border: none; }
        .btn-outline-gold { border: 1.5px solid #d4af37; color: #d4af37; }
        .aspect-ratio-square { position: relative; width: 100%; padding-top: 100%; }
        .img-gallery { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }
        .divider-gold { height: 2px; background: linear-gradient(90deg, transparent, #d4af37, transparent); margin: 0 auto; }
        .border-gold-swal { border: 1px solid #d4af37 !important; border-radius: 20px !important; }
        .gold-text-swal { color: #d4af37 !important; }
      `}</style>
    </div>
  );
};

export default GuestPhotoCapture;