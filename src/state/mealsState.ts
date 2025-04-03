import { atom } from "recoil";
import { MealType } from "../types/MealType";

export const mealsState = atom<MealType[]>({
  key: "mealsState",
  default: [] as MealType[],
});
