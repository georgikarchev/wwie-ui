import React from "react";
import { useUser } from "../../hooks/useUser";

interface Props {}

const Dasboard: React.FC<Props> = ({}) => {
  const { user } = useUser();
  // const username = useUsername();

  if (!user || !user.id || !user.username) {
    return;
  }

  return (
    <div className="page page--dashboard">
      <h1 className="page__title">
        Hello
        <br />
        {user.username}
      </h1>
      <section className="page__block">
        Just some friendly placeholder text for now.
      </section>
    </div>
  );
};

export default Dasboard;
