export type IngredientType = {
  id: string;
  name: string;
  description: string;
  dietaryCategories: string[];
  createdOn: string;
  updatedOn: string;
  deleted: boolean;
  quantity?: number;
  unitOfMeasurement?: string;
};
