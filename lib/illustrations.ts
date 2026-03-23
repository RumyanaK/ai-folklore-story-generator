import { PageId } from "./pages";

export type IllustrationScene = {
  pageId: PageId;
  hasIllustration: boolean;
};

const SCENES: Record<PageId, IllustrationScene> = {
  cover: { pageId: "cover", hasIllustration: true },
  home: { pageId: "home", hasIllustration: true },
  village: { pageId: "village", hasIllustration: true },
  sunmother: { pageId: "sunmother", hasIllustration: true },
  sun: { pageId: "sun", hasIllustration: true },
  miracle: { pageId: "miracle", hasIllustration: true },
  end: { pageId: "end", hasIllustration: true },
};

export function getIllustrationSceneForPage(pageId: PageId) {
  return SCENES[pageId];
}