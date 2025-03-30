import { IngredientType } from "./IngredientType";

export type MealType = {
  id: string;
  name: string;
  description: string;
  dietaryCategories: string[];
  mealTypes: string[];
  createdOn?: string;
  updatedOn?: string;
  ingredients?: IngredientType[];
  deleted: string;
};
