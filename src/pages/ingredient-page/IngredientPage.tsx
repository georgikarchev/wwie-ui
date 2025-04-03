import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import DietaryCategories from "../../components/dietary-categories/DietaryCategories";
import EditButton from "../../components/edit-button/EditButton";
import GoBack from "../../components/go-back/GoBack";
import { useApi } from "../../hooks/useApi";
import { useIsUserAdmin } from "../../hooks/useIsUserAdmin";
import { backState } from "../../state/backState";
import { pageState, PageStateType } from "../../state/pageState";
import { IngredientType } from "../../types/IngredientType";

const IngredientPage: React.FC = () => {
  const isAdmin = useIsUserAdmin();
  const [page, setPage] = useRecoilState(pageState);
  const setBack = useSetRecoilState(backState);
  const api = useApi();
  const [ingredient, setIngredient] = useState<IngredientType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ingredientsListing: PageStateType = { name: "ingredients" };

  // --- make hook
  // const deleteIngredient = async (ingredientId: string) => {
  //   try {
  //     setLoading(true);
  //     await api.delete("/ingredients/" + ingredientId);
  //   } catch (err) {
  //     setError("Error deleting ingredient");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const deleteItem = async () => {
  //   console.log(`here`, ingredient?.id);
  //   if (!!ingredient?.id && ingredient?.id !== undefined) {
  //     console.log("[LOG] delete item");
  //     await deleteIngredient(ingredient?.id);
  //     setPage(back);
  //   }
  // };
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

  const goEditIngredient = () => {
    if (ingredient?.id === undefined) return;

    console.log(ingredient);
    const newPageState: PageStateType = {
      name: "ingredient-edit",
      queryParams: { id: ingredient?.id },
    };

    console.log(newPageState);

    setBack(page);
    setPage(newPageState);
  };

  return (
    <div className="page page--meal">
      <section className="page__actions">
        <GoBack to={ingredientsListing} />
        {isAdmin && <EditButton go={goEditIngredient} />}
        {/* {isAdmin && <DeleteButton onClick={deleteItem} />} */}
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
