import React from "react";
import { IngredientType } from "../../types/IngredientType";
import Ingredient from "../ingredient/Ingredient";
import "./Ingredients.scss";

interface Props {
  ingredients: IngredientType[];
  disableLinks?: boolean;
}

const Ingredients: React.FC<Props> = ({
  ingredients,
  disableLinks = false,
}) => {
  return (
    <div className="ingredients">
      {ingredients.map((ingredient) => (
        <Ingredient
          key={ingredient.id}
          ingredient={ingredient}
          disableLink={disableLinks}
        />
      ))}
    </div>
  );
};

export default Ingredients;
