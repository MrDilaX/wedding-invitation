export default function LoadingSkeleton() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99,
      backgroundColor: "#F8F3EC",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: "2rem",
    }}>
      {/* Shimmer bars simulating content */}
      <div style={{ width: "200px", height: "1px", backgroundColor: "rgba(201,168,76,0.3)" }} />
      <div style={{
        width: "160px", height: "40px",
        background: "linear-gradient(90deg, #EDE4D6 25%, #F8F3EC 50%, #EDE4D6 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        borderRadius: "2px",
      }} />
      <div style={{
        width: "100px", height: "20px",
        background: "linear-gradient(90deg, #EDE4D6 25%, #F8F3EC 50%, #EDE4D6 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite 0.2s",
        borderRadius: "2px",
      }} />
      <div style={{ width: "200px", height: "1px", backgroundColor: "rgba(201,168,76,0.3)" }} />

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
