import { NextResponse } from "next/server";
import { girlKindnessTemplate } from "@/app/templates/girl-kindness";
import { PageId } from "@/lib/pages";

/* ===============================
   Types
   =============================== */

type StoryPage = {
  html: string;
  pageId: PageId;
};

/* ===============================
   Minimal HTML escaping
   =============================== */

function escapeHtml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

/* ===============================
   Safe template replacement
   =============================== */

function fillTemplate(
  template: string,
  data: { heroName: string; friendName: string }
) {
  return template
    .replaceAll("{{heroName}}", escapeHtml(data.heroName))
    .replaceAll("{{friendName}}", escapeHtml(data.friendName));
}

/* ===============================
   POST handler
   =============================== */

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { heroName, friendName } = body;

    if (!heroName || !friendName) {
      return NextResponse.json(
        { error: "Missing heroName or friendName" },
        { status: 400 }
      );
    }

    const fullHtml = fillTemplate(girlKindnessTemplate, {
      heroName,
      friendName,
    });

    const rawPages = fullHtml
      .split('<section class="page">')
      .filter(Boolean)
      .map((p) => `<section class="page">${p}`);

    const pages: StoryPage[] = rawPages.map((html, index) => ({
      html,
      pageId: String(index) as PageId,
    }));

    return NextResponse.json({
      title: `Добрината на ${escapeHtml(heroName)}`,
      pages,
    });
  } catch (err) {
    console.error("STORY POST ERROR:", err);
    return NextResponse.json(
      { error: "Failed to generate story" },
      { status: 500 }
    );
  }
}