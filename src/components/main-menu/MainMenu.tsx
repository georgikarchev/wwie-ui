import React from "react";
import { useSetRecoilState } from "recoil";
import { useIsUserAdmin } from "../../hooks/useIsUserAdmin";
import { pageState } from "../../state/pageState";
import "./MainMenu.scss";

const MainMenu: React.FC = ({}) => {
  const isAdmin = useIsUserAdmin();
  const setPage = useSetRecoilState(pageState);

  const go = (to: string) => setPage({ name: to });

  const goDashboard = () => go("dashboard");
  const goAddMeal = () => go("add-meal");
  const goHistory = () => go("meals-history");
  const goMeals = () => go("meals");
  const goIngredients = () => go("ingredients");
  const goShoppingList = () => go("shopping-list");
  const goUsers = () => go("users");

  return (
    <div className="main-menu">
      <button className="button" onClick={goDashboard}>
        <img className="icon" src="src/assets/icons/outlined/home.png" />
      </button>
      {!isAdmin && (
        <button className="button" onClick={goAddMeal}>
          <img className="icon" src="src/assets/icons/outlined/lightbulb.png" />
        </button>
      )}
      {!isAdmin && (
        <button className="button" onClick={goHistory}>
          <img className="icon" src="src/assets/icons/outlined/history.png" />
        </button>
      )}

      <button className="button" onClick={goMeals}>
        <img className="icon" src="src/assets/icons/outlined/restaurant.png" />
      </button>

      <button className="button" onClick={goIngredients}>
        <img className="icon" src="src/assets/icons/outlined/extension.png" />
      </button>

      {isAdmin && (
        <button className="button" onClick={goUsers}>
          <img
            className="icon"
            src="src/assets/icons/outlined/people_outline.png"
          />
        </button>
      )}

      {!isAdmin && (
        <button className="button" onClick={goShoppingList}>
          <img
            className="icon"
            src="src/assets/icons/outlined/shopping_cart.png"
          />
        </button>
      )}
    </div>
  );
};

export default MainMenu;
