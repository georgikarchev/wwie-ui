import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import DeleteButton from "../../components/delete-button/DeleteButton";
import GoBack from "../../components/go-back/GoBack";
import { useApi } from "../../hooks/useApi";
import { useIngredient } from "../../hooks/useIngredient";
import { useIsUserAdmin } from "../../hooks/useIsUserAdmin";
import { backState } from "../../state/backState";
import { ingredientState } from "../../state/ingredientState";
import { pageState } from "../../state/pageState";

const IngredientEditPage: React.FC = () => {
  const isAdmin = useIsUserAdmin();
  const [page, setPage] = useRecoilState(pageState);
  const back = useRecoilValue(backState);
  useIngredient(page?.queryParams?.id);
  const [ingredient, setIngredient] = useRecoilState(ingredientState);
  const api = useApi();
  const [error, setError] = useState<string | null>(null);

  console.log(ingredient);

  const updateIngredient = async (name: string, description: string) => {
    const res = await api.put(`/ingredients/${ingredient?.id}`, {
      name,
      description,
    });
    setIngredient(res.data);
    setPage(back);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handle submit edit ingredient page");
    updateIngredient(ingredient.name, ingredient.description);
  };

  const setIngredientProp = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.name) {
      return;
    }

    setIngredient((state) => ({
      ...state,
      [`${e.target.name}`]: e.target.value,
    }));
  };

  const deleteIngredient = async (ingredientId: string) => {
    try {
      await api.delete("/ingredients/" + ingredientId);
    } catch (err) {
      setError("Error deleting ingredient");
    } finally {
    }
  };

  const deleteItem = async () => {
    if (!!ingredient?.id && ingredient?.id !== undefined) {
      console.log("[LOG] delete item");
      await deleteIngredient(ingredient?.id);
      setPage(back);
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="page page--meal-edit">
      <section className="page__actions">
        <GoBack to={back} />
        {isAdmin && <DeleteButton onClick={deleteItem} />}
      </section>
      <h1 className="page__title">{ingredient?.name}</h1>
      <section className="page__block">
        <section className="login-form">
          <form onSubmit={handleSubmit} className="login-form__form">
            <div className="form-row">
              <label>Name</label>
              <input
                name="name"
                type="text"
                value={ingredient?.name || ""}
                onChange={setIngredientProp}
                required
              />
            </div>
            <div className="form-row">
              <label>Description</label>
              <input
                name="description"
                type="description"
                value={ingredient?.description || ""}
                onChange={setIngredientProp}
                required
              />
            </div>
            <button className="form-submit" type="submit">
              Save
            </button>
          </form>
        </section>
        <br />
        {ingredient?.createdOn && (
          <div>Created on: {ingredient?.createdOn}</div>
        )}
        <br />
        {ingredient?.createdOn && (
          <div>Updated on: {ingredient?.updatedOn}</div>
        )}
      </section>
    </div>
  );
};

export default IngredientEditPage;
