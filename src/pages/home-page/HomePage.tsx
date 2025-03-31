import React from "react";
import { useSetRecoilState } from "recoil";
import LogoBig from "../../components/logo-big/LogoBig";
import { pageState } from "../../state/pageState";
import "./HomePage.scss";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  const setPage = useSetRecoilState(pageState);
  const go = (to: string) => setPage({ name: to });
  const goLogin = () => go("login");
  const goRegister = () => go("register");

  return (
    <div className="page page--home">
      <LogoBig />
      <section className="login-and-register-buttons">
        <button onClick={goLogin}>login</button> |{" "}
        <button onClick={goRegister}>register</button>
      </section>
    </div>
  );
};

export default Home;
