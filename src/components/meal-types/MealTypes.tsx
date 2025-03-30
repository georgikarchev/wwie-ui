import React from "react";
import "./MealTypes.scss";

interface Props {
  types: string[];
}

const BREAKFAST = "BREAKFAST";
const LUNCH = "LUNCH";
const DINNER = "DINNER";

const MealTypes: React.FC<Props> = ({ types }) => {
  return (
    <div className="meal-type">
      <span className={`type ${types.includes(BREAKFAST) && "type-selected"}`}>
        Breakfast
      </span>
      <span className={`type ${types.includes(LUNCH) && "type-selected"}`}>
        Lunch
      </span>
      <span className={`type ${types.includes(DINNER) && "type-selected"}`}>
        Dinner
      </span>
    </div>
  );
};

export default MealTypes;
