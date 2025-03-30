import React from "react";
import { useSetRecoilState } from "recoil";
import { pageState } from "../../state/pageState";
import "./MainMenu.scss";

const MainMenu: React.FC = ({}) => {
  const setPage = useSetRecoilState(pageState);

  const go = (to: string) => setPage({ name: to });

  const goHome = () => go("home");
  const goAddMeal = () => go("add-meal");
  const goHistory = () => go("hostory");
  const goMeals = () => go("meals");
  const goIngredients = () => go("ingredients");
  const goShoppingList = () => go("shopping-list");

  return (
    <div className="main-menu">
      <button className="button" onClick={goHome}>
        <img className="icon" src="src/assets/icons/outlined/home.png" />
      </button>
      <button className="button" onClick={goAddMeal}>
        <img className="icon" src="src/assets/icons/outlined/lightbulb.png" />
      </button>
      <button className="button" onClick={goHistory}>
        <img className="icon" src="src/assets/icons/outlined/history.png" />
      </button>
      <button className="button" onClick={goMeals}>
        <img className="icon" src="src/assets/icons/outlined/restaurant.png" />
      </button>
      <button className="button" onClick={goIngredients}>
        <img className="icon" src="src/assets/icons/outlined/extension.png" />
      </button>
      <button className="button" onClick={goShoppingList}>
        <img
          className="icon"
          src="src/assets/icons/outlined/shopping_cart.png"
        />
      </button>
    </div>
  );
};

export default MainMenu;
