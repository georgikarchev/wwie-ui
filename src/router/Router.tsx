import React from 'react';
import Home from '../pages/home/Home';
import Meals from '../pages/meals/Meals';
import Ingredients from '../pages/ingredients/Ingredients';

interface Props {page: String}

const Router: React.FC<Props> = ({page}) => {

  if(!page) {
    // load default
    return <Home/>
  }

  return (
    <>
      {(page == "home") && <Home /> }
      {(page == "meals") && <Meals /> }
      {(page == "ingredients") && <Ingredients /> }
    </>
  );
};

export default Router;