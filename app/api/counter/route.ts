import { NextResponse } from "next/server";
import { getStoriesCreated } from "@/lib/counter";

export async function GET() {
  try {
    const count = await getStoriesCreated();

    return NextResponse.json({
      stories_created: count,
    });
  } catch (err) {
    console.error("COUNTER GET ERROR:", err);
    return NextResponse.json(
      { error: "Failed to read counter" },
      { status: 500 }
    );
  }
}
