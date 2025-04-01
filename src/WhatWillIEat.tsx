import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import MainMenu from "./components/main-menu/MainMenu";
import PhoneFrame from "./components/phone-frame/PhoneFrame";
import SecondaryMenu from "./components/secondary-menu/SecondaryMenu";
import { useIsAuthenticated } from "./hooks/useIsAuthenticated";
import { useUser } from "./hooks/useUser";
import Router from "./router/Router";
import { pageState } from "./state/pageState";

interface Props {}

const WhatWillIEat: React.FC<Props> = ({}) => {
  const isAuthenticated = useIsAuthenticated();
  const [page, setPage] = useRecoilState(pageState);
  useUser(isAuthenticated); // make sure userState has a valid user if logged in

  useEffect(() => {
    if (
      isAuthenticated &&
      (page?.name === "home" ||
        page?.name === "login" ||
        page?.name === "register")
    ) {
      setPage((state) => ({ ...state, name: "dashboard" }));
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
