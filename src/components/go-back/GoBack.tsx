import React from "react";
import { useSetRecoilState } from "recoil";
import { pageState, PageStateType } from "../../state/pageState";
import "./GoBack.scss";

interface Props {
  to: PageStateType | null;
}

const GoBack: React.FC<Props> = ({ to }) => {
  const setPage = useSetRecoilState(pageState);
  const goTo = () => setPage(to);

  if (!to) {
    return null;
  }

  return (
    <button className="button button--go-back" onClick={goTo}>
      <img
        className="icon"
        src="src/assets/icons/outlined/arrow_back_ios.png"
      />
    </button>
  );
};

export default GoBack;
