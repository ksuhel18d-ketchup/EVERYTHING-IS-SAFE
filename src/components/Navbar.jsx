import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        background: "#0B1220",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 8%",
        color: "white",
        zIndex: 1000,
        boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
      }}
    >
      <h2
        style={{
          margin: 0,
          color: "#38BDF8",
          fontWeight: "800",
          letterSpacing: "1px",
        }}
      >
        EVERYTHING IS SAFE
      </h2>

      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
        }}
      >
        <a href="#features" style={linkStyle}>
          Features
        </a>

        <a href="#how" style={linkStyle}>
          How It Works
        </a>

        <a href="#guardian" style={linkStyle}>
          Guardian
        </a>

        <a href="#ai" style={linkStyle}>
          AI
        </a>

        <Link to="/login" style={buttonStyle}>
          Login
        </Link>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
};

const buttonStyle = {
  background: "#2563EB",
  color: "white",
  textDecoration: "none",
  padding: "10px 18px",
  borderRadius: "8px",
  fontWeight: "600",
};