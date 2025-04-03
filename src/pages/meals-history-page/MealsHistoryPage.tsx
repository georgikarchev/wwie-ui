import React, { useCallback } from "react";
import MealHistoryItem from "../../components/meal-history-item/MealHistoryItem";
import { useMeals } from "../../hooks/useMeals";
import { useUserMealsHistory } from "../../hooks/useUserMealsHistory";
import { MealType } from "../../types/MealType";

interface Props {}

const MealsHistoryPage: React.FC<Props> = ({}) => {
  const { meals } = useMeals();
  const { history, loading, error } = useUserMealsHistory();

  const findMealById = useCallback(
    (id: string): MealType | undefined => meals.find((m) => m.id === id),
    [meals],
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="page page--meal-history">
      <h1 className="page__title">Meal history</h1>
      {/* <section className="page__block"> */}
      {/* <div className="history"> */}
      {history.length > 0 ? (
        history.map((mhi) => {
          if (!mhi?.id) return;

          const meal = findMealById(mhi.mealId);
          console.log(`here`, meal);

          if (!meal || !meal?.id) return;

          return (
            <MealHistoryItem
              key={mhi.id}
              id={mhi.id}
              name={meal.name}
              consumedOn={mhi.consumedOn}
              rating={mhi.rating}
            />
            // <article key={mhi.id} className="meal-history-item">
            //   <h4>{meal?.name}</h4>
            // </article>
          );
        })
      ) : (
        <p>No meal history available.</p>
      )}
      {/* </div> */}
      {/* </section> */}
    </div>
  );
};

export default MealsHistoryPage;
