import React from "react";
import { useSetRecoilState } from "recoil";
import { pageState } from "../../state/pageState";
import "./Meal.scss";

interface Props {
  id: string;
  name: string;
  imageUrl?: string;
}

const PLACEHOLDER_IMAGE =
  "src/assets/luisa-brimble-2RrBE90w0T8-unsplash-small.jpg";

const Meal: React.FC<Props> = ({ id, name, imageUrl }) => {
  const setPage = useSetRecoilState(pageState);
  const goMeal = () => setPage({ name: "meal", queryParams: { id: id } });

  return (
    <article className="meal" onClick={goMeal}>
      <h3 className="meal__title">{name}</h3>
      <img src={imageUrl ?? PLACEHOLDER_IMAGE} alt={name} />
    </article>
  );
};

export default Meal;
