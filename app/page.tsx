"use client";

import Header from "@/app/components/Header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [storiesCount, setStoriesCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/counter")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stories_created === "number") {
          setStoriesCount(data.stories_created);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.55)),
          url("/wallpaper.png")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "80px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Segoe UI, Arial",
        position: "relative",
      }}
    >
      <Header />
      {/* WELCOME / HEADLINE */}
      <h1
        style={{
          fontSize: 52,
          fontWeight: 600,
          marginBottom: 0,
          textAlign: "center",
          maxWidth: 900,
          lineHeight: 1.25,
          fontFamily:
            '"Gabriola", "Segoe Script", "Comic Sans MS", cursive',
          color: "#7a1f1f",
          textShadow: `
            0 0 6px rgba(255, 220, 120, 0.9),
            0 0 14px rgba(255, 200, 80, 0.6),
            0 0 24px rgba(255, 180, 60, 0.4)
          `,
          marginTop: -40,
          marginLeft: 20,
        }}
      >
        Всяко дете заслужава своя собствена приказка
      </h1>

            {/* FEATURE BLOCKS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
          maxWidth: 450,
          marginTop: 50,
          marginBottom: 56,
          marginLeft: -10,
          paddingLeft: 20,
          fontSize: 18,
        }}
      >
        <FeatureBlock
          icon="🧒🎨"
          title="Вашето дете участва в приказката"
          text="Когато историята е близка до детето, ценностите се запомнят естествено"
        />

        <FeatureBlock
          icon="🤍💚❤️"
          title="Вдъхновена от българския фолклор"
          text="Топли истории, носии и образи, които възпитават ценности и любов към корените."
        />

        <FeatureBlock
          icon="📕⬇️"
          title="Готова за четене и подарък"
          text="Красива дигитална книжка, която можеш да свалиш и запазиш завинаги."
        />
      </div>

      {/* CTA BUTTON */}
      <button
        onClick={() => router.push("/builder")}
        style={{
          padding: "18px 22px",
          borderRadius: 40,
          border: "none",
          fontSize: 18,
          fontWeight: 700,
          background: "#3f7f4c",
          color: "white",
          cursor: "pointer",
          boxShadow: "0 8px 22px rgba(0,0,0,0.25)",
          marginTop: 20,
          marginLeft: 0,
        }}
      >
        Създай своята персонализирана книжка
      </button>

      {/* TRUST BADGES */}
      <div
        style={{
          position: "absolute",
          right: 100,
          top: "25%",
          marginTop: -80,
          display: "flex",
          flexDirection: "column",
          gap: 0,
          background: "none",
          padding: 0,
          borderRadius: 0,
          boxShadow: "none",
          fontSize: 18,
          fontWeight: 700,
          color: "#3f7f4c",
        }}
      >
        {[
          "Етичен AI продукт",
          "Съобразен с EU AI Act",
          "Човешки текст, не AI",
          "Оригинален български фолклор",
          "Учим през доброто",
        ].map((text) => (
          <div
            key={text}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                color: "#3f7f4c",
                fontSize: 24,
                fontWeight: 800,
              }}
            >
              ✓
            </span>
            <span>{text}</span>
          </div>
        ))}
      </div>


      {/* BOTTOM COUNTER */}
{storiesCount !== null && (
  <div
    style={{
      position: "absolute",
      bottom: 24,
      fontSize: 16,
      fontWeight: 600,
      color: "#000000",
      opacity: 0.85,
      textAlign: "center",
    }}
  >
  </div>
)}

    </section>
  );
}

/* ===== Feature Block Component ===== */

function FeatureBlock({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.95)",
        borderRadius: 22,
        padding: "28px 24px",
        textAlign: "center",
        boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
      }}
    >
      <div style={{ fontSize: 40, marginBottom: 14 }}>{icon}</div>
      <h3 style={{ marginBottom: 10, fontWeight: 700 }}>{title}</h3>
      <p style={{ fontSize: 16, lineHeight: 1.5 }}>{text}</p>
    </div>
  );
}
