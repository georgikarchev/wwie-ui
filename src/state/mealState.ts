import { atom } from "recoil";
import { MealType } from "../types/MealType";

export const mealState = atom<MealType>({
  key: "mealState",
  default: {} as MealType,
});
