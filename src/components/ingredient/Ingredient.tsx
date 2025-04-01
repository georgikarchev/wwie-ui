import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { backState } from "../../state/backState";
import { pageState } from "../../state/pageState";
import { IngredientType } from "../../types/IngredientType";
import "./Ingredient.scss";

interface Props {
  ingredient: IngredientType;
  disableLink?: boolean;
}

const Ingredient: React.FC<Props> = ({ ingredient, disableLink = false }) => {
  const [page, setPage] = useRecoilState(pageState);
  const setBack = useSetRecoilState(backState);
  const goIngredient = () => {
    if (disableLink) {
      return;
    }
    setBack(page);
    setPage({ name: "ingredient", queryParams: { id: ingredient?.id } });
  };

  return (
    <article className="ingredient" onClick={goIngredient}>
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
