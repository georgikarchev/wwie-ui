import React from "react";
import { IngredientType } from "../../types/IngredientType";
import "./Ingredient.scss";

interface Props {
  ingredient: IngredientType;
}

const Ingredient: React.FC<Props> = ({ ingredient }) => {
  return (
    <article className="ingredient">
      <h4>{ingredient.name}</h4>
      <div className="ingredient__amount">
        <span className="ingredient__amount__quantity">
          {ingredient.quantity}
        </span>
        <span className="ingredient__amount__uom">
          {ingredient.unitOfMeasurement}
        </span>
      </div>
    </article>
  );
};

export default Ingredient;
