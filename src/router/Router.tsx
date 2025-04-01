import React from "react";
import { useRecoilValue } from "recoil";
import Dasboard from "../pages/dashboard/Dashboard";
import Home from "../pages/home-page/HomePage";
import IngredientPage from "../pages/ingredient-page/IngredientPage";
import IngredientsPage from "../pages/ingredients-page/IngredientsPage";
import Login from "../pages/login-page/LoginPage";
import MealEditPage from "../pages/meal-edit-page/MealEditPage";
import MealPage from "../pages/meal-page/MealPage";
import MealsPage from "../pages/meals-page/MealsPage";
import ProfilePage from "../pages/profile-page/ProfilePage";
import Register from "../pages/register-page/RegisterPage";
import { pageState } from "../state/pageState";

const Router: React.FC = () => {
  const page = useRecoilValue(pageState);

  return (
    <>
      {page?.name == "home" && <Home />}
      {page?.name == "meals" && <MealsPage />}
      {page?.name == "meal" && <MealPage />}
      {page?.name == "meal-edit" && <MealEditPage />}
      {page?.name == "ingredients" && <IngredientsPage />}
      {page?.name == "ingredient" && <IngredientPage />}
      {page?.name == "login" && <Login />}
      {page?.name == "register" && <Register />}
      {page?.name == "dashboard" && <Dasboard />}
      {page?.name == "profile" && <ProfilePage />}
    </>
  );
};

export default Router;
