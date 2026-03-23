"use client";

import Header from "@/app/components/Header";
import React, { useState } from "react";

/* ===== Types ===== */

type Appearance = {
  hairColor: string;
  eyeColor: string;
};

type StoryPage = {
  html: string;
  pageId: string;
};

type StoryData = {
  title: string;
  pages: StoryPage[];
};


/* ===== UI Components ===== */

function AppearanceFields({
  appearance,
  setAppearance,
}: {
  appearance: Appearance;
  setAppearance: (a: Appearance) => void;
}) {
  return (
    <>
      <label>Цвят на косата:</label>
      <select
        value={appearance.hairColor}
        onChange={(e) =>
          setAppearance({ ...appearance, hairColor: e.target.value })
        }
        style={selectStyle}
      >
       <option value="">Избери</option>
      <option value="blonde">Руса</option>
      <option value="brown">Кафява</option>
      <option value="black">Черна</option>
      <option value="red">Рижа</option>
      </select>

      <label>Цвят на очите:</label>
      <select
        value={appearance.eyeColor}
        onChange={(e) =>
          setAppearance({ ...appearance, eyeColor: e.target.value })
        }
        style={selectStyle}
      >
        <option value="">Избери</option>
        <option value="brown">Кафяви</option>
        <option value="blue">Сини</option>
        <option value="green">Зелени</option>
      </select>
    </>
  );
}

function CharacterBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 16,
        padding: 24,
        marginTop: 30,
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {children}
    </div>
  );
}

/* ===== Page ===== */

export default function Builder() {
  const [heroName, setHeroName] = useState("");
  const [friendName, setFriendName] = useState("");
  const [heroGender, setHeroGender] = useState<"girl" | "boy">("girl");
  const friendGender: "girl" | "boy" = heroGender === "girl" ? "boy" : "girl";

  const [heroAppearance, setHeroAppearance] = useState<Appearance>({
    hairColor: "",
    eyeColor: "",
  });

  const [storyType, setStoryType] = useState("kindness")
  const [storyData, setStoryData] = useState<StoryData | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [storiesCount, setStoriesCount] = useState<number | null>(null);


   /* ===== Story ===== */
  async function createStory() {

    if (heroGender === "boy") {
    setError("🚧 Скоро: версия с герой момче");
    return;
    }

    setError("");
    setStoryData(null);
    setCurrentPage(0);

    if (!heroName.trim() || !friendName.trim()) {
      setError("Моля, попълни всички полета.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      // ✅ genders към API
      body: JSON.stringify({ heroName, friendName, heroGender, friendGender }),
    });

const data = await res.json();

if (!res.ok) {
  setError(data?.message || "Грешка при създаване на приказката");
  setLoading(false);
  return;
}

setStoryData(data);
setLoading(false);

  }

  function resetStory() {
    setStoryData(null);
    setCurrentPage(0);
  }

  /* ===== PDF ===== */
  async function downloadPdf() {
    if (!storyData) return;

    // 1) Вземаме всички илюстрации от API като imageUrl (по 1 на страница)
    const allImages: Record<number, string> = {};

      const hair = heroAppearance.hairColor || "brown";
      const eyes = heroAppearance.eyeColor || "brown";

    for (let i = 0; i < storyData.pages.length; i++) {
    const imagePath =
      `/illustrations/${storyType}/${i}/${heroGender}-${hair}-${eyes}.png`;

allImages[i] = imagePath;
    }

    const fullHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<base href="http://localhost:3000/" />

<style>
  @page {
    size: A4;
    margin: 20mm;
  }

  body {
    margin: 0;
    font-family: "DejaVu Sans", Arial, sans-serif;
  }

.pdf-page {
  break-after: page;
  box-sizing: border-box;
  width: 210mm;
  height: 297mm;
  padding: 20mm;
  overflow: hidden;
}

  .cover {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .cover-inner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .cover-inner h1 {
    font-size: 42px;
    margin: 0 0 24px 0;
    text-align: center;
  }

  .cover-inner p {
    font-size: 20px;
    margin: 0;
    text-align: center;
  }

  .text-page {
  width: 210mm;
  height: 297mm;
  padding: 20mm 18mm;
  box-sizing: border-box;

  font-size: 18px;
  line-height: 1.6;
  }

  .image-page {
  width: 210mm;
  height: 297mm;
  padding: 20mm 18mm;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;
  }

  .image-page img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
</style>

</head>

<body>
${storyData.pages
  .map((page, i) => {
    const isLastPage = i === storyData.pages.length - 1;

    const textPage = `
      <div class="pdf-page text-page">
      ${page.html}
      </div>
    `;

    const imagePage =
      allImages[i]
        ? `
          <div class="pdf-page image-page">
          <img
            src="${allImages[i]}"
            onerror="this.src='/illustrations/${storyType}/${i}/placeholder.png'"
          />
          </div>
        `
        : "";

    return textPage + imagePage;
  })
  .join("")}

</body>
</html>
`;

    const res = await fetch("/api/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        html: fullHtml,
        title: storyData.title,
      }),
    });

    if (!res.ok) {
      alert("Грешка при създаване на PDF");
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${storyData.title}.pdf`;
    a.click();

    URL.revokeObjectURL(url);
  }

function getIllustration(pageIndex: number) {

  const hair = heroAppearance.hairColor || "brown"
  const eyes = heroAppearance.eyeColor || "brown"

 return `/illustrations/${storyType}/${pageIndex}/${heroGender}-${hair}-${eyes}.png`

}

  /* ===== Render ===== */
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f5f2e8 0%, #e6efe6 40%, #f0e1e1 100%)",
        fontFamily: "Segoe UI, Arial",
        padding: 40,
      }}
    >
       <Header />

      <main
        style={{
          maxWidth: storyData ? 1200 : 700,
          margin: "0 auto",
          background: "white",
          padding: 36,
          borderRadius: 24,
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        }}
      >
        <h2 style={{ color: "#7a1f1f" }}>📘 Създай персонализирана приказка</h2>

        {storiesCount !== null && (
          <p
            style={{
              marginTop: 8,
              marginBottom: 24,
              color: "#3f7f4c",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            ✨ Вече създадени <strong>{storiesCount}</strong> приказки
          </p>
        )}

        {!storyData && (
          <>
            <CharacterBlock title="👧 Герой">
              <label>Пол:</label>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 6,
                  marginBottom: 18,
                }}
              >
                  <button
                    type="button"
                    onClick={() => {
                      setHeroGender("girl");
                      setError("");
                    }}
                  style={{
                    ...navButtonStyle,
                    borderColor: heroGender === "girl" ? "#3f7f4c" : "#ccc",
                    color: heroGender === "girl" ? "#3f7f4c" : "#666",
                    opacity: heroGender === "girl" ? 1 : 0.8,
                  }}
                >
                  👧 Момиче
                </button>

                  <button
                    type="button"
                    onClick={() => {
                      setHeroGender("boy");
                      setError("");
                    }}
                  style={{
                    ...navButtonStyle,
                    borderColor: heroGender === "boy" ? "#3f7f4c" : "#ccc",
                    color: heroGender === "boy" ? "#3f7f4c" : "#666",
                    opacity: heroGender === "boy" ? 1 : 0.8,
                  }}
                >
                  🧒 Момче
                </button>
              </div>

              <label>Име:</label>
              <input
                value={heroName}
                onChange={(e) => setHeroName(e.target.value)}
                style={inputStyle}
              />
              <AppearanceFields
                appearance={heroAppearance}
                setAppearance={setHeroAppearance}
              />
            </CharacterBlock>

            <CharacterBlock title="🧒 Приятел">
              <label>Пол:</label>
              <div style={{ marginTop: 6, marginBottom: 18, color: "#444" }}>
                <strong>
                  {friendGender === "boy" ? "🧒 Момче" : "👧 Момиче"}{" "}
                </strong>
                <span style={{ color: "#777" }}>
                  🔒 (заключено според героя)
                </span>
              </div>

              <label>Име:</label>
              <input
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                style={inputStyle}
              />
            </CharacterBlock>

            <button onClick={createStory} style={buttonStyle}>
              🌟 Създай моята книжка
            </button>

            {loading && <p>Създаваме приказката…</p>}
            {error && <p style={{ color: "crimson" }}>{error}</p>}
          </>
        )}

        {storyData && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
                marginTop: 40,
              }}
            >
              <div
dangerouslySetInnerHTML={{
  __html: storyData.pages[currentPage].html,
}}
              />

              <div
                style={{
                  background: "#fff7ec",
                  borderRadius: 16,
                  padding: 20,
                  height: 420,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
  
                <img
                  src={getIllustration(currentPage)}
                  onError={(e) => {
                    e.currentTarget.src =
                      `/illustrations/${storyType}/${currentPage}/placeholder.png`
                  }}
                  alt=""
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <button
                style={navButtonStyle}
                disabled={currentPage === 0}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                ← Предишна
              </button>

              <button
                style={navButtonStyle}
                disabled={currentPage === storyData.pages.length - 1}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Следваща →
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 16,
                marginTop: 30,
              }}
            >
              <button onClick={resetStory} style={buttonStyle}>
                🔄 Нова приказка
              </button>
              <button onClick={downloadPdf} style={buttonStyle}>
                📄 Свали PDF
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

/* ===== styles ===== */

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 10,
  marginTop: 6,
  marginBottom: 18,
  borderRadius: 10,
  border: "1px solid #ccc",
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: 10,
  marginTop: 6,
  marginBottom: 18,
  borderRadius: 10,
  border: "1px solid #ccc",
};

const buttonStyle: React.CSSProperties = {
  marginTop: 30,
  padding: "16px 30px",
  borderRadius: 30,
  border: "none",
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
  background: "#3f7f4c",
  color: "white",
};

const navButtonStyle: React.CSSProperties = {
  padding: "10px 24px",
  borderRadius: 30,
  border: "2px solid #3f7f4c",
  background: "white",
  color: "#3f7f4c",
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
};