import { NextResponse } from "next/server";
import { chromium } from "playwright";

export async function POST(req: Request) {
  let browser;

  try {
    console.log("PDF ROUTE HIT");

    const { html } = await req.json();

    if (!html) {
      return NextResponse.json(
        { error: "Missing HTML" },
        { status: 400 }
      );
    }

    browser = await chromium.launch({
      headless: true,
      args: [
        "--disable-gpu",
        "--no-sandbox",
        "--disable-dev-shm-usage",
      ],
    });

    const page = await browser.newPage();

    // фиксиран viewport за A4 landscape
    await page.setViewportSize({
      width: 1123,
      height: 794,
    });

    await page.setContent(html, {
      waitUntil: "networkidle",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
      margin: {
        top: "0mm",
        bottom: "0mm",
        left: "0mm",
        right: "0mm",
      },
    });

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="storybook.pdf"',
      },
    });
  } catch (err) {
    console.error("PDF ERROR:", err);

    return NextResponse.json(
      { error: "PDF generation failed" },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}