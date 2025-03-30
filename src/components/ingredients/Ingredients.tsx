import React from "react";
import { IngredientType } from "../../types/IngredientType";
import Ingredient from "../ingredient/Ingredient";
import "./Ingredients.scss";

interface Props {
  ingredients: IngredientType[];
}

const Ingredients: React.FC<Props> = ({ ingredients }) => {
  return (
    <div className="ingredients">
      {ingredients.map((ingredient) => (
        <Ingredient key={ingredient.id} ingredient={ingredient} />
      ))}
    </div>
  );
};

export default Ingredients;
