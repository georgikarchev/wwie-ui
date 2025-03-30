import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import MainMenu from "./components/main-menu/MainMenu";
import PhoneFrame from "./components/phone-frame/PhoneFrame";
import SecondaryMenu from "./components/secondary-menu/SecondaryMenu";
import Router from "./router/Router";
import { authState } from "./state/authState";
import { pageState } from "./state/pageState";

interface Props {}

const WhatWillIEat: React.FC<Props> = ({}) => {
  const token = useRecoilValue(authState);
  const [page, setPage] = useRecoilState(pageState);

  useEffect(() => {
    if (token && (page?.name === "home" || page?.name === "login")) {
      setPage((state) => ({ ...state, name: "dashboard" }));
      console.log(`here`);
    }
  }, [token, page]);

  return (
    <div id="what-will-i-eat-app">
      <PhoneFrame>
        <Router />
        <MainMenu />
        <SecondaryMenu />
      </PhoneFrame>
    </div>
  );
};

export default WhatWillIEat;
