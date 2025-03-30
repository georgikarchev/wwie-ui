import React from "react";
import Tag from "../tag/Tag";
import "./DietaryCategories.scss";

interface Props {
  categories: string[];
}

const DietaryCategories: React.FC<Props> = ({ categories }) => {
  return (
    <div className="dietary-categories">
      {categories.map((category) => (
        <Tag key={`dietary-category--${category.replace("_", "-")}`}>
          {category.replace("_", " ")}
        </Tag>
      ))}
    </div>
  );
};

export default DietaryCategories;
