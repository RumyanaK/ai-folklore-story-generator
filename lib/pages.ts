export type PageId =
  | "cover"
  | "home"
  | "village"
  | "sunmother"
  | "sun"
  | "miracle"
  | "end";

export const PAGES: {
  id: PageId;
  hasIllustration: boolean;
}[] = [
  { id: "cover", hasIllustration: true },
  { id: "home", hasIllustration: true },
  { id: "village", hasIllustration: true },
  { id: "sunmother", hasIllustration: true },
  { id: "sun", hasIllustration: true },
  { id: "miracle", hasIllustration: true },
  { id: "end", hasIllustration: true },
];