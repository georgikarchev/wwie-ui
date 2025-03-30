import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import DietaryCategories from "../../components/dietary-categories/DietaryCategories";
import GoBack from "../../components/go-back/GoBack";
import Ingredients from "../../components/ingredients/Ingredients";
import MealTypes from "../../components/meal-types/MealTypes";
import { useApi } from "../../hooks/useApi";
import { pageState, PageStateType } from "../../state/pageState";
import { MealType } from "../../types/MealType";

interface Props {}

const ComponentName: React.FC<Props> = ({}) => {
  const page = useRecoilValue(pageState);
  const api = useApi();
  const [meal, setMeal] = useState<MealType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await api.get(`meals/${page?.queryParams?.id}`);
        setMeal(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Error fetching meals");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const mealsListing: PageStateType = { name: "meals" };

  return (
    <div className="page page--meal">
      <GoBack to={mealsListing} />
      <h1 className="page__title">{meal?.name}</h1>

      {meal?.description && (
        <section className="page__block">{meal?.description}</section>
      )}

      {meal?.dietaryCategories && (
        <DietaryCategories categories={meal?.dietaryCategories} />
      )}

      {meal?.mealTypes && <MealTypes types={meal?.mealTypes} />}

      {meal?.ingredients && <Ingredients ingredients={meal?.ingredients} />}
    </div>
  );
};

export default ComponentName;
