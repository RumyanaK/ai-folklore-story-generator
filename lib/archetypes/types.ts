export type ArchetypeId =
  | "kindness"
  | "courage"
  | "wisdom";

export type ArchetypeConfig = {
  id: ArchetypeId;
  title: string;
  secondaryThemes: string[];
  shortDescription: string;
  templateFile: string;
  endingText: string;
  illustrationPlan: string;
};