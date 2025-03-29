import React from "react";
import { useRecoilValue } from "recoil";
import Dasboard from "../pages/dashboard/Dashboard";
import Home from "../pages/home/Home";
import Ingredients from "../pages/ingredients/Ingredients";
import Login from "../pages/login/Login";
import Meals from "../pages/meals/Meals";
import Register from "../pages/register/Register";
import { pageState } from "../state/pageState";

// interface Props {
//   page: String;
// }

const Router: React.FC = ({}) => {
  const page = useRecoilValue(pageState);
  // if (!page) {
  //   // load default
  //   return <Home />;
  // }

  return (
    <>
      {page == "home" && <Home />}
      {page == "meals" && <Meals />}
      {page == "ingredients" && <Ingredients />}
      {page == "login" && <Login />}
      {page == "register" && <Register />}
      {page == "dashboard" && <Dasboard />}
    </>
  );
};

export default Router;
