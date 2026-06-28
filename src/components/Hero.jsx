export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#08111f,#0f172a,#1e3a8a)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "100px 20px 40px",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          fontWeight: "800",
          marginBottom: "20px",
          lineHeight: "1.2",
        }}
      >
        Your AI Powered <br />
        Personal Safety Companion
      </h1>

      <p
        style={{
          maxWidth: "700px",
          fontSize: "1.2rem",
          color: "#cbd5e1",
          marginBottom: "35px",
        }}
      >
        Real-time SOS • Live Location • Guardian Mode • AI Emergency Assistant
        • Designed to keep you safe anywhere, anytime.
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "16px 30px",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "700",
          }}
        >
          Get Started
        </button>

        <button
          style={{
            background: "transparent",
            color: "white",
            border: "2px solid white",
            padding: "16px 30px",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "700",
          }}
        >
          Watch Demo
        </button>
      </div>
    </section>
  );
}