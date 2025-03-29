import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import MainMenu from "./components/main-menu/MainMenu";
import PhoneFrame from "./components/phone-frame/PhoneFrame";
import SecondaryMenu from "./components/secondary-menu/SecondaryMenu";
import Router from "./router/Router";
import { authState } from "./state/authState";

interface Props {}

const WhatWillIEat: React.FC<Props> = ({}) => {
  const token = useRecoilValue(authState);
  // const [page, setPage] = userRecoilState(pageState);
  const [currentPage, setCurrentPage] = useState(token ? "dashboard" : "home");

  useEffect(() => {
    if (token && (currentPage === "home" || currentPage === "login")) {
      setCurrentPage("dashboard");
      console.log(`here`);
    }
  }, [token, currentPage]);

  return (
    <div id="what-will-i-eat-app">
      <PhoneFrame>
        <Router page={currentPage} />
        <MainMenu setPage={setCurrentPage} />
        <SecondaryMenu setPage={setCurrentPage} />
      </PhoneFrame>
    </div>
  );
};

export default WhatWillIEat;
