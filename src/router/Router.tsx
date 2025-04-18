import React from "react";
import { useRecoilValue } from "recoil";
import ChooseMealPage from "../pages/choose-meal-page/ChooseMealPage";
import Dasboard from "../pages/dashboard/Dashboard";
import Home from "../pages/home-page/HomePage";
import IngredientEditPage from "../pages/ingredient-edit-page/IngredientEditPage";
import IngredientPage from "../pages/ingredient-page/IngredientPage";
import IngredientsPage from "../pages/ingredients-page/IngredientsPage";
import Login from "../pages/login-page/LoginPage";
import MealEditPage from "../pages/meal-edit-page/MealEditPage";
import MealPage from "../pages/meal-page/MealPage";
import MealsHistoryPage from "../pages/meals-history-page/MealsHistoryPage";
import MealsPage from "../pages/meals-page/MealsPage";
import ProfilePage from "../pages/profile-page/ProfilePage";
import Register from "../pages/register-page/RegisterPage";
import UserPage from "../pages/user-page/UserPage";
import UsersPage from "../pages/users-page/UsersPage";
import { pageState } from "../state/pageState";

const Router: React.FC = () => {
  const page = useRecoilValue(pageState);

  return (
    <>
      {page?.name == "home" && <Home />}
      {page?.name == "meals" && <MealsPage />}
      {page?.name == "meal" && <MealPage />}
      {page?.name == "meal-edit" && <MealEditPage />}
      {page?.name == "choose-meal" && <ChooseMealPage />}
      {page?.name == "meals-history" && <MealsHistoryPage />}
      {page?.name == "ingredients" && <IngredientsPage />}
      {page?.name == "ingredient" && <IngredientPage />}
      {page?.name == "ingredient-edit" && <IngredientEditPage />}
      {page?.name == "login" && <Login />}
      {page?.name == "register" && <Register />}
      {page?.name == "dashboard" && <Dasboard />}
      {page?.name == "profile" && <ProfilePage />}
      {page?.name == "users" && <UsersPage />}
      {page?.name == "user" && <UserPage />}
    </>
  );
};

export default Router;
