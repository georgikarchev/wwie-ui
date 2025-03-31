import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import MainMenu from "./components/main-menu/MainMenu";
import PhoneFrame from "./components/phone-frame/PhoneFrame";
import SecondaryMenu from "./components/secondary-menu/SecondaryMenu";
import { useIsAuthenticated } from "./hooks/useIsAuthenticated";
import Router from "./router/Router";
import { pageState } from "./state/pageState";

interface Props {}

const WhatWillIEat: React.FC<Props> = ({}) => {
  const isAuthenticated = useIsAuthenticated();
  const [page, setPage] = useRecoilState(pageState);

  useEffect(() => {
    if (isAuthenticated && (page?.name === "home" || page?.name === "login")) {
      setPage((state) => ({ ...state, name: "dashboard" }));
      console.log(`here`);
    }
  }, [isAuthenticated, page]);

  return (
    <div id="what-will-i-eat-app">
      <PhoneFrame>
        <Router />
        {isAuthenticated && <MainMenu />}
        {isAuthenticated && <SecondaryMenu />}
      </PhoneFrame>
    </div>
  );
};

export default WhatWillIEat;
