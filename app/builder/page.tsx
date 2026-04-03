"use client";

import Header from "@/app/components/Header";
import React, { useState } from "react";
import { ArchetypeId } from "@/lib/archetypes/types";
import { archetypes } from "@/lib/archetypes/config";

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

  const [archetypeId, setArchetypeId] = useState<ArchetypeId>("kindness");
  const storyType = archetypeId;
  const [storyData, setStoryData] = useState<StoryData | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [error, setError] = useState("");
  
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

    try {
      const res = await fetch("/api/story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          archetypeId,
          heroName,
          friendName,
          heroGender,
          friendGender,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Грешка при създаване на приказката");
        return;
      }

      setStoryData(data);
    } catch {
      setError("Грешка при създаване на приказката");
    } finally {
      setLoading(false);
    }
  }

  function resetStory() {
    setStoryData(null);
    setCurrentPage(0);
    setError("");
  }

  function getIllustration(pageIndex: number) {
    const hair = heroAppearance.hairColor || "brown";
    const eyes = heroAppearance.eyeColor || "brown";

    return `/illustrations/${storyType}/${pageIndex}/${heroGender}-${hair}-${eyes}.png`;
  }

  /* ===== PDF ===== */
  async function downloadPdf() {
  if (!storyData) return;

  setPdfLoading(true);

  try {
    const allImages: Record<number, string> = {};

    const hair = heroAppearance.hairColor || "brown";
    const eyes = heroAppearance.eyeColor || "brown";

    for (let i = 0; i < storyData.pages.length; i++) {
      const imagePath = `/illustrations/${storyType}/${i}/${heroGender}-${hair}-${eyes}.png`;
      allImages[i] = imagePath;
    }

    const baseUrl = window.location.origin;

    const fullHtml = `
<!DOCTYPE html>
<html lang="bg">
<head>
<meta charset="utf-8" />
<base href="${baseUrl}/" />

<style>
  @page {
    size: A4;
    margin: 20mm;
  }

  html, body {
    margin: 0;
    padding: 0;
    background: white;
    font-family: "DejaVu Sans", Arial, sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  .pdf-page {
    break-after: page;
    page-break-after: always;
    box-sizing: border-box;
    width: 210mm;
    height: 297mm;
    padding: 20mm;
    overflow: hidden;
    background: white;
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
    line-height: 1.2;
  }

  .cover-inner p {
    font-size: 20px;
    margin: 0;
    text-align: center;
    line-height: 1.5;
  }

  .text-page {
    width: 210mm;
    height: 297mm;
    padding: 20mm 18mm;
    box-sizing: border-box;
    font-size: 18px;
    line-height: 1.6;
    color: #222;
  }

  .text-page h1,
  .text-page h2,
  .text-page h3 {
    margin-top: 0;
    margin-bottom: 14px;
    line-height: 1.25;
  }

  .text-page p {
    margin-top: 0;
    margin-bottom: 14px;
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
    display: block;
  }
</style>
</head>

<body>
${storyData.pages
  .map((page, i) => {
    const textPage = `
      <div class="pdf-page text-page">
        ${page.html}
      </div>
    `;

    const imagePage = allImages[i]
      ? `
        <div class="pdf-page image-page">
          <img
            src="${allImages[i]}"
            onerror="this.onerror=null;this.src='/illustrations/${storyType}/${i}/placeholder.png'"
            alt=""
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

    const printWindow = window.open("", "_blank", "width=1200,height=900");

    if (!printWindow) {
      alert("Браузърът блокира новия прозорец. Разреши pop-up и опитай пак.");
      return;
    }

    printWindow.document.open();
    printWindow.document.write(fullHtml);
    printWindow.document.close();

    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 700);
    };
  } catch (err) {
    console.error("PDF PRINT ERROR:", err);
    alert("Грешка при подготвяне на PDF");
  } finally {
    setPdfLoading(false);
  }
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

        {!storyData && (
          <>
                    <CharacterBlock title="🪄 Избери тип приказка">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 14,
                marginTop: 10,
              }}
            >
              {Object.values(archetypes).map((archetype) => {
                const isSelected = archetypeId === archetype.id;
                const isAvailable = archetype.id === "kindness";

                return (
                  <button
                    key={archetype.id}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => {
                      if (isAvailable) {
                        setArchetypeId(archetype.id as ArchetypeId);
                      }
                    }}
                    style={{
                      textAlign: "left",
                      padding: 18,
                      borderRadius: 16,
                      border: isSelected ? "2px solid #3f7f4c" : "1px solid #d8d8d8",
                      background: isSelected ? "#f3fbf4" : "white",
                      opacity: isAvailable ? 1 : 0.65,
                      cursor: isAvailable ? "pointer" : "not-allowed",
                    }}
                  >
                    <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 6,
                    }}
                  >
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#2f4f35",
                    }}
                  >
                    {archetype.title}
                  </div>

                  {isSelected && (
                    <span
                      style={{
                        display: "inline-block",
                        padding: "6px 12px",
                        borderRadius: 999,
                        background: "#dff3e3",
                        color: "#2d6a39",
                        fontSize: 12,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Избрано
                    </span>
                  )}
                </div>

                    <div
                      style={{
                        fontSize: 14,
                        color: "#7a1f1f",
                        marginBottom: 8,
                      }}
                    >
                      ({archetype.secondaryThemes.join(", ")})
                    </div>

                    <div
                      style={{
                        fontSize: 15,
                        color: "#444",
                        lineHeight: 1.5,
                      }}
                    >
                      {archetype.shortDescription}
                    </div>
                    {!isAvailable && (
                      <div
                        style={{
                          marginTop: 14,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            padding: "6px 12px",
                            borderRadius: 999,
                            background: "#f5e9cf",
                            color: "#8a5a00",
                            fontSize: 13,
                            fontWeight: 700,
                          }}
                        >
                          Очаквайте скоро
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </CharacterBlock>
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
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    e.currentTarget.src = `/illustrations/${storyType}/${currentPage}/placeholder.png`;
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
    flexWrap: "wrap",
  }}
>
      <button onClick={resetStory} style={buttonStyle}>
        🔄 Нова приказка
      </button>
      <button onClick={downloadPdf} style={buttonStyle} disabled={pdfLoading}>
        {pdfLoading ? "⏳ Подготвям PDF..." : "🖨️ Запази като PDF"}
      </button>
    </div>

    <p
      style={{
        fontSize: 13,
        color: "#666",
        marginTop: 12,
        textAlign: "center",
      }}
    >
      Ще се отвори прозорец за печат. Изберте <strong>Save as PDF</strong>.
    </p>
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