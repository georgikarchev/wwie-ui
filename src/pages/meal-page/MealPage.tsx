import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import DietaryCategories from "../../components/dietary-categories/DietaryCategories";
import EditButton from "../../components/edit-button/EditButton";
import GoBack from "../../components/go-back/GoBack";
import Ingredients from "../../components/ingredients/Ingredients";
import MealTypes from "../../components/meal-types/MealTypes";
import { useApi } from "../../hooks/useApi";
import { useIsUserAdmin } from "../../hooks/useIsUserAdmin";
import { backState } from "../../state/backState";
import { pageState, PageStateType } from "../../state/pageState";
import { MealType } from "../../types/MealType";

const MealPage: React.FC = () => {
  const isAdmin = useIsUserAdmin();
  const [page, setPage] = useRecoilState(pageState);
  const [back, setBack] = useRecoilState(backState);
  const api = useApi();
  const [meal, setMeal] = useState<MealType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mealsListing: PageStateType = { name: "meals" };

  const goEditMeal = () => {
    if (meal?.id === undefined) return;

    console.log(meal);
    const newPageState: PageStateType = {
      name: "meal-edit",
      queryParams: { id: meal?.id },
    };

    console.log(newPageState);

    setBack(page);
    setPage(newPageState);
  };

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await api.get(`meals/${page?.queryParams?.id}`);
        setMeal(response.data);
      } catch (err) {
        setError("Error fetching meal data");
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="page page--meal">
      <section className="page__actions">
        <GoBack to={mealsListing} />
        {isAdmin && <EditButton go={goEditMeal} />}
      </section>
      <h1 className="page__title">{meal?.name}</h1>

      {meal?.description && (
        <section className="page__block">{meal?.description}</section>
      )}

      {meal?.dietaryCategories && (
        <DietaryCategories categories={meal?.dietaryCategories} />
      )}

      {meal?.mealTypes && <MealTypes types={meal?.mealTypes} />}

      {meal?.ingredients && (
        <Ingredients ingredients={meal?.ingredients} disableLinks={true} />
      )}
    </div>
  );
};

export default MealPage;
