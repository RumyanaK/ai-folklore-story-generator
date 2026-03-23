export default function Header() {
  return (
    <div
      style={{
        position: "fixed",
        top: 24,
        left: 30,
        fontSize: 15,
        fontWeight: 600,
        zIndex: 10,
      }}
    >
      <a
        href="/about"
        style={{
          textDecoration: "none",
          color: "#3f7f4c",
        }}
      >
        ℹ️ За проекта
      </a>
    </div>
  );
}