import { archetypes } from "@/lib/archetypes/config";

export function getArchetypeConfig(archetypeId: string) {
  const config = archetypes[archetypeId];

  if (!config) {
    throw new Error(`Invalid archetype: ${archetypeId}`);
  }

  return config;
}

export async function loadStoryTemplate(archetypeId: string) {
  const config = getArchetypeConfig(archetypeId);

  switch (config.id) {
    case "kindness":
      return (await import("@/app/templates/girl-kindness")).girlKindnessTemplate;

    case "courage":
      throw new Error("Courage template not implemented yet");

    case "wisdom":
      throw new Error("Wisdom template not implemented yet");

    default:
      throw new Error(`Template not found for archetype: ${archetypeId}`);
  }
}