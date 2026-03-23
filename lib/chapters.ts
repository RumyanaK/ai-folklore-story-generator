// app/lib/chapters.ts

export type ChapterId =
  | "cover"
  | "home"
  | "village"
  | "sunmother"
  | "sun"
  | "miracle"
  | "end";

export const CHAPTERS: {
  id: ChapterId;
  hasIllustration: boolean;
}[] = [
  { id: "cover", hasIllustration: true },
  { id: "home", hasIllustration: true },
  { id: "village", hasIllustration: true },
  { id: "sunmother", hasIllustration: true },
  { id: "sun", hasIllustration: true },
  { id: "miracle", hasIllustration: true },
  { id: "end", hasIllustration: true }, // по желание, ти каза че има
];