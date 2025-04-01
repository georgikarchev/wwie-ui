import React from "react";
import { useUsername } from "../../hooks/useUsername";

interface Props {}

const Dasboard: React.FC<Props> = ({}) => {
  const username = useUsername();

  return (
    <div className="page page--dashboard">
      <h1 className="page__title">
        Hello
        <br />
        {username}
      </h1>
      <section className="page__block">
        Just some friendly placeholder text for now.
      </section>
    </div>
  );
};

export default Dasboard;
