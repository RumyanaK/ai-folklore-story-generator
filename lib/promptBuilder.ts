// app/lib/promptBuilder.ts

import { IllustrationScene } from "./illustrations";

type Appearance = {
  hairColor: string;
  hairType: string;
  hairLength: string;
  eyeColor: string;
};

type BuildPromptParams = {
  scene: IllustrationScene;
  heroAppearance: Appearance;
  friendAppearance?: Appearance;
  heroGender: "girl" | "boy";
};

/**
 * Builds a stable, layered prompt:
 * 1. Identity (from master image)
 * 2. Appearance (from builder form)
 * 3. Scene variation (from story)
 */
export function buildIllustrationPrompt({
  scene,
  heroAppearance,
  friendAppearance,
  heroGender,
}: BuildPromptParams): string {
  const heroPronoun = heroGender === "girl" ? "she" : "he";

  const heroAppearanceBlock = `
HERO APPEARANCE (stylistic variation only):
- Hair color: ${heroAppearance.hairColor || "natural"}
- Hair length: ${heroAppearance.hairLength || "medium"}
- Hair type: ${heroAppearance.hairType || "straight"}
- Eye color: ${heroAppearance.eyeColor || "brown"}
`;

  const friendAppearanceBlock = friendAppearance
    ? `
FRIEND APPEARANCE (stylistic variation only):
- Hair color: ${friendAppearance.hairColor || "natural"}
- Hair length: ${friendAppearance.hairLength || "short"}
- Hair type: ${friendAppearance.hairType || "straight"}
- Eye color: ${friendAppearance.eyeColor || "brown"}
`
    : "";

const sceneBlock = `
SCENE DESCRIPTION:
Setting: ${"setting" in scene ? scene.setting : ""}
Action: ${"action" in scene ? scene.action : ""}
${"composition" in scene && scene.composition ? `Composition: ${scene.composition}` : ""}
${"mood" in scene && scene.mood ? `Mood: ${scene.mood}` : ""}
`;

  return `
REFERENCE IMAGE RULES:
Use the provided reference image ONLY to preserve character identity:
- face shape
- facial proportions
- age
- clothes
- illustration style

Do NOT change identity.
Do not change the clothes.
Do NOT redesign the character.

${heroAppearanceBlock}
${friendAppearanceBlock}

${sceneBlock}

STYLE:
Children's book illustration.
Dora the Explorer illustration style.
Inspired by Bulgarian folklore.
No photorealism.
Safe and calming for children.

IMPORTANT:
The reference image defines identity.
The appearance attributes define stylistic variation only.
The scene defines pose, action, and environment.
`;
}
