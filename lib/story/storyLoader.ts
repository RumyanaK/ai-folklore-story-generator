import { archetypes } from "@/lib/archetypes/config";
import { storyTemplates } from "@/lib/story/templateRegistry";

type Gender = "girl" | "boy";

export function getArchetypeConfig(archetypeId: string) {
  const config = archetypes[archetypeId];

  if (!config) {
    throw new Error(`Invalid archetype: ${archetypeId}`);
  }

  return config;
}

export async function loadStoryTemplate(
  archetypeId: string,
  heroGender: Gender,
  friendGender: Gender
) {
  const config = getArchetypeConfig(archetypeId);

  const templateOrGetter =
    storyTemplates[config.id as keyof typeof storyTemplates];

  if (!templateOrGetter) {
    throw new Error(`Template not found for archetype: ${archetypeId}`);
  }

  if (typeof templateOrGetter === "function") {
    return templateOrGetter(heroGender, friendGender);
  }

  return templateOrGetter;
}