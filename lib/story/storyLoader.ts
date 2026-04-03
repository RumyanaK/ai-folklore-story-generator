import { archetypes } from "@/lib/archetypes/config";
import { storyTemplates } from "@/lib/story/templateRegistry";

export function getArchetypeConfig(archetypeId: string) {
  const config = archetypes[archetypeId];

  if (!config) {
    throw new Error(`Invalid archetype: ${archetypeId}`);
  }

  return config;
}

export async function loadStoryTemplate(archetypeId: string) {
  const config = getArchetypeConfig(archetypeId);

  const template =
    storyTemplates[config.id as keyof typeof storyTemplates];

  if (!template) {
    throw new Error(`Template not found for archetype: ${archetypeId}`);
  }

  return template;
}