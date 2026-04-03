import { ArchetypeConfig } from "./types";

export const archetypes: Record<string, ArchetypeConfig> = {
  kindness: {
    id: "kindness",
    title: "Доброта и сърце",
    secondaryThemes: ["смелост", "съпричастност", "приятелство"],
    shortDescription:
      "Топла приказка за добро сърце, човечност и силата да направиш правилното.",
    templateFile: "kindness.ts",
    endingText:
      "[heroName] разбра, че понякога най-голямата сила се крие в доброто сърце.",
    illustrationPlan: "kindnessPlan",
    isAvailable: true,
  },

  courage: {
    id: "courage",
    title: "Смелост и избор",
    secondaryThemes: ["отговорност", "честност", "вътрешна сила"],
    shortDescription:
      "Приключенска история за труден избор, изпитание и смелостта да постъпиш правилно.",
    templateFile: "courage.ts",
    endingText:
      "[heroName] разбра, че смелостта не е да не се страхуваш, а да направиш правилното, дори когато е трудно.",
    illustrationPlan: "couragePlan",
    isAvailable: true,
  },

  wisdom: {
    id: "wisdom",
    title: "Мъдрост и находчивост",
    secondaryThemes: ["справедливост", "търпение", "наблюдателност"],
    shortDescription:
      "Фолклорна история за ум, съобразителност и победа над трудностите с мъдрост.",
    templateFile: "wisdom.ts",
    endingText:
      "[heroName] научи, че умът и добротата често побеждават там, където силата не успява.",
    illustrationPlan: "wisdomPlan",
    isAvailable: false,
  },
};