"use client";
import React, { useState, useEffect } from "react";
import { Container, Form, Card, Row, Col, Badge } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { CONFIG } from "./config/url";

const MySwal = withReactContent(Swal);
const API_URL = CONFIG.rsvpUrl;

type RsvpEntry = { nama: string; kehadiran: string; ucapan: string };

export const RSVPSection: React.FC = () => {
  const [formData, setFormData] = useState({ nama: "", kehadiran: "Hadir", ucapan: "" });
  const [comments, setComments] = useState<RsvpEntry[]>([]);   // hanya yang ada ucapan
  const [allRsvp, setAllRsvp] = useState<RsvpEntry[]>([]);     // semua data untuk counter
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: RsvpEntry[]) => {
        setAllRsvp(data);                                                                     // semua data
        const withMessage = data.filter((item) => item.ucapan && item.ucapan.trim() !== "");
        setComments([...withMessage].reverse());                                              // hanya yang ada ucapan
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  // Counter dari allRsvp — akurat meski ucapan kosong
  const totalHadir = allRsvp.filter(c => c.kehadiran === "Hadir").length;
  const totalAbsen = allRsvp.filter(c => c.kehadiran === "Tidak Hadir").length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(API_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(formData),
      });

      const newEntry: RsvpEntry = { ...formData };

      // Selalu tambah ke allRsvp untuk counter yang akurat
      setAllRsvp(prev => [newEntry, ...prev]);

      // Hanya tambah ke comments jika ada ucapan
      if (newEntry.ucapan.trim() !== "") {
        setComments(prev => [newEntry, ...prev]);
      }

      MySwal.fire({
        title: <span style={{ color: "#D4AF37", fontFamily: "serif" }}>Terima Kasih!</span>,
        html: <i style={{ color: "white" }}>Konfirmasi dan doa restu Anda telah kami terima.</i>,
        icon: "success",
        background: "#1a1a1a",
        confirmButtonColor: "#D4AF37",
        iconColor: "#D4AF37",
      });

      setFormData({ nama: "", kehadiran: "Hadir", ucapan: "" });
    } catch (error) {
      console.error("Error:", error);
      MySwal.fire("Error", "Gagal mengirim pesan", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5" style={{ 
      margin: "15px",
      borderRadius: "40px",
      border: "1px solid rgba(212, 175, 55, 0.2)",
      background: "rgba(0,0,0,0.2)",
      backdropFilter: "blur(10px)"
    }}>
      <Container>
        <Row className="justify-content-center g-4">
          
          {/* KOLOM FORM RSVP */}
          <Col lg={5} md={10} xs={12}>
            <Card className="p-4 shadow-lg border-0 h-100" style={{ 
              background: "rgba(255, 255, 255, 0.05)", 
              backdropFilter: "blur(15px)",
              WebkitBackdropFilter: "blur(15px)",
              borderRadius: "30px",
              border: "1px solid rgba(255, 255, 255, 0.1)" 
            }}>
              <h2 className="text-center mb-4" style={{ fontFamily: "serif", color: "#D4AF37", letterSpacing: "2px" }}>RSVP</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#D4AF37", fontSize: "0.9rem" }}>Nama Lengkap</Form.Label>
                  <Form.Control 
                    required
                    value={formData.nama}
                    onChange={(e) => setFormData({...formData, nama: e.target.value})}
                    style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "12px" }}
                    placeholder="Contoh: Budi Santoso"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#D4AF37", fontSize: "0.9rem" }}>Konfirmasi Kehadiran</Form.Label>
                  <Form.Select 
                    value={formData.kehadiran}
                    onChange={(e) => setFormData({...formData, kehadiran: e.target.value})}
                    style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "12px" }}
                  >
                    <option value="Hadir" className="text-dark">Hadir</option>
                    <option value="Tidak Hadir" className="text-dark">Tidak Hadir</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label style={{ color: "#D4AF37", fontSize: "0.9rem" }}>Ucapan & Doa</Form.Label>
                  <Form.Control 
                    as="textarea" rows={3} required
                    placeholder="Tulis ucapan manis Anda..."
                    value={formData.ucapan}
                    onChange={(e) => setFormData({...formData, ucapan: e.target.value})}
                    style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "12px" }}
                  />
                </Form.Group>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn w-100 py-3 fw-bold shadow-sm mb-2"
                  style={{ 
                    background: "linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)", 
                    color: "black", 
                    borderRadius: "15px",
                    letterSpacing: "1px",
                    border: "none"
                  }}
                >
                  {loading ? "MENGIRIM..." : "KIRIM UCAPAN"}
                </button>
              </Form>
            </Card>
          </Col>

          {/* KOLOM DAFTAR UCAPAN */}
          <Col lg={6} md={10} xs={12}>
            <div className="d-flex flex-column h-100 p-1">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0" style={{ fontFamily: "serif", color: "#D4AF37", letterSpacing: "1px" }}>Wishes</h4>
                <div className="d-flex gap-2">
                  <Badge bg="none" style={{ border: "1px solid #28a745", color: "#28a745" }} className="px-2 py-2">Hadir: {totalHadir}</Badge>
                  <Badge bg="none" style={{ border: "1px solid #dc3545", color: "#dc3545" }} className="px-2 py-2">Absen: {totalAbsen}</Badge>
                </div>
              </div>

              <div className="custom-scroll pe-2" style={{ 
                maxHeight: "410px",
                overflowY: "auto",
              }}>
                {comments.length === 0 ? (
                  <p className="text-center opacity-50 mt-5 text-white">Belum ada ucapan...</p>
                ) : (
                  comments.map((item, i) => (
                    <div key={i} className="mb-3 p-3 position-relative" style={{ 
                      background: "rgba(255,255,255,0.03)", 
                      borderRadius: "20px",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}>
                      <div className="d-flex align-items-start mb-2">
                        <div className="me-2" style={{ 
                          minWidth: "40px", height: "40px", 
                          background: "linear-gradient(135deg, #D4AF37, #B8860B)", 
                          borderRadius: "12px", display: "flex", alignItems: "center", 
                          justifyContent: "center", color: "black", fontWeight: "bold" 
                        }}>
                          {item.nama.charAt(0).toUpperCase()}
                        </div>
                        <div className="w-100">
                          <div className="d-flex justify-content-between align-items-center">
                             <h6 className="mb-0 fw-bold" style={{ color: "#FFFFFF", fontSize: "0.95rem" }}>{item.nama}</h6>
                             <small style={{ 
                               fontSize: "0.6rem", 
                               color: item.kehadiran === "Hadir" ? "#D4AF37" : "#ff4d4d",
                               textTransform: "uppercase",
                               letterSpacing: "1px"
                             }}>
                               {item.kehadiran === "Hadir" ? "Hadir" : "Absen"}
                             </small>
                          </div>
                          <p className="mb-0 mt-2 fw-light" style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", lineHeight: "1.6" }}>
                            {item.ucapan}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="text-center mt-2 opacity-50">
                 <small className="text-white" style={{ fontSize: "0.7rem" }}>Scroll untuk melihat lebih banyak ↑</small>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 3px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.4); border-radius: 10px; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.3) !important; font-size: 0.8rem; }
      `}</style>
    </section>
  );
};