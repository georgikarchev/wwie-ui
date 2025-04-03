import React, { JSX } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { backState } from "../../state/backState";
import { pageState } from "../../state/pageState";
import "./MealHistoryItem.scss";

interface Props {
  id: string;
  name: string;
  imageUrl?: string;
  consumedOn: string;
  rating: number;
}

const PLACEHOLDER_IMAGE =
  "src/assets/luisa-brimble-2RrBE90w0T8-unsplash-small.jpg";

// const getStars = (rating: number, keyPrefix: string): JSX.Element[] => {
//   return Array.from({ length: rating }, (_, i) => (
//     <img
//       key={keyPrefix + "--" + i}
//       src="src/assets/icons/outlined/star_outline.png"
//       alt={"star"}
//     />
//   ));
// };

const getStars = (rating: number, keyPrefix: string): JSX.Element[] => {
  return Array.from({ length: 10 }, (_, i) => (
    <img
      key={keyPrefix + "--" + i}
      src={
        i < rating
          ? "src/assets/icons/outlined/star_purple500.png"
          : "src/assets/icons/outlined/star_outline.png"
      }
      alt={"star"}
    />
  ));
};

const MealHistoryItem: React.FC<Props> = ({
  id,
  name,
  imageUrl,
  consumedOn,
  rating,
}) => {
  const [page, setPage] = useRecoilState(pageState);
  const setBack = useSetRecoilState(backState);

  return (
    <article className="meal-history-item">
      <h3 className="meal-history-item__title">{name}</h3>
      <span className="meal-history-item__consumed-on">
        {new Date(consumedOn).toLocaleDateString()}
      </span>
      <span className="meal-history-item__rating">{getStars(rating, id)}</span>
      <img src={imageUrl ?? PLACEHOLDER_IMAGE} alt={name} />
    </article>
  );
};

export default MealHistoryItem;
