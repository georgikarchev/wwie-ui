import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import GoBack from "../../components/go-back/GoBack";
import { useApi } from "../../hooks/useApi";
import { pageState, PageStateType } from "../../state/pageState";
import { MealType } from "../../types/MealType";

interface Props {}

const ComponentName: React.FC<Props> = ({}) => {
  const [page, setPage] = useRecoilState(pageState);
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

  console.log(meal);

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
        <section className="page__block">{meal?.dietaryCategories}</section>
      )}
    </div>
  );
};

export default ComponentName;
