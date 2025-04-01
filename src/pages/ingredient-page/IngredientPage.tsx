import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import DeleteButton from "../../components/delete-button/DeleteButton";
import DietaryCategories from "../../components/dietary-categories/DietaryCategories";
import GoBack from "../../components/go-back/GoBack";
import { useApi } from "../../hooks/useApi";
import { useIsUserAdmin } from "../../hooks/useIsUserAdmin";
import { backState } from "../../state/backState";
import { pageState } from "../../state/pageState";
import { IngredientType } from "../../types/IngredientType";

const IngredientPage: React.FC = () => {
  const isAdmin = useIsUserAdmin();
  const [page, setPage] = useRecoilState(pageState);
  const back = useRecoilValue(backState);
  const api = useApi();
  const [ingredient, setIngredient] = useState<IngredientType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- make hook
  const deleteIngredient = async (ingredientId: string) => {
    try {
      setLoading(true);
      await api.delete("/ingredients/" + ingredientId);
    } catch (err) {
      setError("Error deleting ingredient");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async () => {
    console.log(`here`, ingredient?.id);
    if (!!ingredient?.id && ingredient?.id !== undefined) {
      console.log("[LOG] delete item");
      await deleteIngredient(ingredient?.id);
      setPage(back);
    }
  };
  // ---

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await api.get(`ingredients/${page?.queryParams?.id}`);
        setLoading(true);
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
  console.log(`isAdmin:`, isAdmin);

  return (
    <div className="page page--meal">
      <section className="page__actions">
        <GoBack to={back} />
        {isAdmin && <DeleteButton onClick={deleteItem} />}
      </section>
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
