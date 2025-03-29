import React from "react";
import { useRecoilValue } from "recoil";
import Home from "../pages/home/Home";
import Ingredients from "../pages/ingredients/Ingredients";
import Meals from "../pages/meals/Meals";
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
    </>
  );
};

export default Router;
