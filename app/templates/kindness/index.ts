import { kindnessTemplate as girlBoy } from "./kindness-girl-boy";

type Gender = "girl" | "boy";

export function getKindnessTemplate(
  heroGender: Gender,
  friendGender: Gender
) {
  if (heroGender === "girl" && friendGender === "boy") {
    return girlBoy;
  }

  throw new Error(
    `Kindness template not implemented for variant: ${heroGender}-${friendGender}`
  );
}