
import { Container } from "react-bootstrap";

interface InvitationCoverProps {
  guestName: string;
  bgFront?: string;
  namaPria: string;
  namaWanita: string;
  onOpen: () => void;
}

const InvitationCover = ({
  guestName,
  bgFront,
  namaPria,
  namaWanita,
  onOpen,
}: InvitationCoverProps) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center text-center"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        background: bgFront
          ? `url(${bgFront}) no-repeat center center / cover`
          : "black",
      }}
    >
      <Container className="animate__animated animate__fadeIn">
        <div className="mb-4" style={{ color: "#D4AF37", fontSize: "1.5rem" }}>
          <i className="bi bi-heart-fill"></i>
        </div>

        <p
          className="text-uppercase mb-2"
          style={{
            color: "#D4AF37",
            letterSpacing: "5px",
            fontSize: "0.8rem",
            fontWeight: "300",
          }}
        >
          The Wedding Of
        </p>

        <h1
          className="mb-4"
          style={{
            color: "#D4AF37",
            fontFamily: "serif",
            fontSize: "calc(2.5rem + 2vw)",
            fontWeight: "bold",
            textShadow: "0 0 20px rgba(212, 175, 55, 0.3)",
          }}
        >
          {namaPria} & {namaWanita}
        </h1>

        <div
          className="mx-auto my-5 p-4"
          style={{
            maxWidth: "450px",
       background: "transparent", 
                backdropFilter: "none", 
            borderRadius: "25px",
            border: "3px solid rgba(212, 175, 55, 0.2)",
          }}
        >
          <p
            className="text-light opacity-75 mb-3"
            style={{ fontSize: "0.9rem" }}
          >
            Kepada Bapak/Ibu/Saudara/i:
          </p>
          <h2
            className="mb-4"
            style={{ color: "white", fontFamily: "serif", fontWeight: "300" }}
          >
            {guestName}
          </h2>

          <button
            type="button"
            onClick={onOpen}
            className="btn px-5 py-2 border-0 shadow-lg animate__animated animate__pulse animate__infinite"
            style={{
              background: "linear-gradient(45deg, #D4AF37, #F9E498)",
              color: "black",
              borderRadius: "50px",
              fontWeight: "bold",
            }}
          >
            Buka Undangan
          </button>
        </div>

        <div
          style={{
            color: "rgba(212, 175, 55, 0.5)",
            fontSize: "0.8rem",
            letterSpacing: "2px",
          }}
        >
          #oktech
        </div>
      </Container>
    </div>
  );
};

export default InvitationCover;