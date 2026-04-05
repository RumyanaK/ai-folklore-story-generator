import { NextResponse } from "next/server";
import { PageId } from "@/lib/pages";
import { loadStoryTemplate, getArchetypeConfig } from "@/lib/story/storyLoader";

/* ===============================
   Types
   =============================== */

type StoryPage = {
  html: string;
  pageId: PageId;
};

type Gender = "girl" | "boy";

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
    const {
      archetypeId,
      heroName,
      friendName,
      heroGender,
      friendGender,
    } = body as {
      archetypeId?: string;
      heroName?: string;
      friendName?: string;
      heroGender?: Gender;
      friendGender?: Gender;
    };

    if (!heroName || !friendName) {
      return NextResponse.json(
        { error: "Missing heroName or friendName" },
        { status: 400 }
      );
    }

    if (!heroGender || !friendGender) {
      return NextResponse.json(
        { error: "Missing heroGender or friendGender" },
        { status: 400 }
      );
    }

    const resolvedArchetypeId = archetypeId || "kindness";

    const template = await loadStoryTemplate(
      resolvedArchetypeId,
      heroGender,
      friendGender
    );

    const archetypeConfig = getArchetypeConfig(resolvedArchetypeId);
    const title =
      archetypeConfig.id === "kindness"
        ? `Добрината на ${escapeHtml(heroName)}`
        : `${archetypeConfig.title} — ${escapeHtml(heroName)}`;

    const fullHtml = fillTemplate(template, {
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
      title,
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