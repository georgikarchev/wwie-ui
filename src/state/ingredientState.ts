import { atom } from "recoil";
import { IngredientType } from "../types/IngredientType";

export const ingredientState = atom<IngredientType>({
  key: "ingredientState",
  default: {} as IngredientType,
});
