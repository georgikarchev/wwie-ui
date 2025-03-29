import React from "react";
import { useSetRecoilState } from "recoil";
import { pageState } from "../../state/pageState";
import "./SecondaryMenu.scss";

const SecondaryMenu: React.FC = () => {
  const setPage = useSetRecoilState(pageState);
  const go = (to: string) => setPage(to);

  const goProfile = () => go("profile");

  return (
    <div className="secondary-menu">
      <button className="button" onClick={goProfile}>
        <img className="icon" src="src/assets/icons/outlined/person.png" />
      </button>
    </div>
  );
};

export default SecondaryMenu;
