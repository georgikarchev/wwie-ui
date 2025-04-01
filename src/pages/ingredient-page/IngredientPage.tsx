import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import DietaryCategories from "../../components/dietary-categories/DietaryCategories";
import GoBack from "../../components/go-back/GoBack";
import { useApi } from "../../hooks/useApi";
import { backState } from "../../state/backState";
import { pageState } from "../../state/pageState";
import { IngredientType } from "../../types/IngredientType";

const IngredientPage: React.FC = () => {
  const page = useRecoilValue(pageState);
  const back = useRecoilValue(backState);
  const api = useApi();
  const [ingredient, setIngredient] = useState<IngredientType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await api.get(`ingredients/${page?.queryParams?.id}`);
        setIngredient(response.data);
      } catch (err) {
        setError("Error fetching ingredient data");
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
      <GoBack to={back} />
      <h1 className="page__title">{ingredient?.name}</h1>

      {ingredient?.description && (
        <section className="page__block">{ingredient?.description}</section>
      )}

      {ingredient?.dietaryCategories && (
        <DietaryCategories categories={ingredient?.dietaryCategories} />
      )}
    </div>
  );
};

export default IngredientPage;
