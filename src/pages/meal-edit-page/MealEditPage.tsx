import React, { useState } from "react";
import { useRecoilState } from "recoil";
import DeleteButton from "../../components/delete-button/DeleteButton";
import GoBack from "../../components/go-back/GoBack";
import { useApi } from "../../hooks/useApi";
import { useIsUserAdmin } from "../../hooks/useIsUserAdmin";
import { useMeal } from "../../hooks/useMeal";
import { backState } from "../../state/backState";
import { mealState } from "../../state/mealState";
import { pageState } from "../../state/pageState";

interface Props {}

const MealEditPage: React.FC<Props> = ({}) => {
  const isAdmin = useIsUserAdmin();
  const [page, setPage] = useRecoilState(pageState);
  const [back, setBack] = useRecoilState(backState);
  useMeal(page?.queryParams?.id);
  const [meal, setMeal] = useRecoilState(mealState);
  const api = useApi();
  const [error, setError] = useState<string | null>(null);

  const updateMeal = async (name: string, description: string) => {
    const res = await api.put(`/meals/${meal?.id}`, {
      name,
      description,
    });
    setMeal(res.data);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handle submit edit meal page");
    updateMeal(meal.name, meal.description);
  };

  const setMealProp = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.name) {
      return;
    }

    setMeal((state) => ({
      ...state,
      [`${e.target.name}`]: e.target.value,
    }));
  };

  const deleteIngredient = async (ingredientId: string) => {
    try {
      await api.delete("/meals/" + ingredientId);
    } catch (err) {
      setError("Error deleting meal");
    } finally {
    }
  };

  const deleteItem = async () => {
    if (!!meal?.id && meal?.id !== undefined) {
      console.log("[LOG] delete item");
      await deleteIngredient(meal?.id);
      setPage(back);
    }
  };

  return (
    <div className="page page--meal-edit">
      <section className="page__actions">
        <GoBack to={back} />
        {isAdmin && <DeleteButton onClick={deleteItem} />}
      </section>
      <h1 className="page__title">{meal?.name}</h1>
      <section className="page__block">
        <section className="login-form">
          <form onSubmit={handleSubmit} className="login-form__form">
            <div className="form-row">
              <label>Name</label>
              <input
                name="name"
                type="text"
                value={meal?.name || ""}
                onChange={setMealProp}
                required
              />
            </div>
            <div className="form-row">
              <label>Description</label>
              <input
                name="description"
                type="description"
                value={meal?.description || ""}
                onChange={setMealProp}
                required
              />
            </div>
            <button className="form-submit" type="submit">
              Save
            </button>
          </form>
        </section>
        <br />
        {meal?.createdOn && <div>Created on: {meal?.createdOn}</div>}
        <br />
        {meal?.createdOn && <div>Updated on: {meal?.updatedOn}</div>}
      </section>
    </div>
  );
};

export default MealEditPage;
