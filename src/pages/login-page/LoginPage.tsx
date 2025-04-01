import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useAuth } from "../../services/authService";
import { pageState } from "../../state/pageState";
import "./LoginPage.scss";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const setPage = useSetRecoilState(pageState);
  const go = (to: string) => setPage({ name: to });
  const goHome = () => go("home");
  const goRegister = () => go("register");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    login(email, password);
  };

  return (
    <div className="page page--login">
      <section className="page__block">
        <section className="login-form">
          <form onSubmit={handleSubmit} className="login-form__form">
            <div className="form-row">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">login</button>
          </form>
        </section>
        <br />
        <br />
        <section className="login-and-register-buttons">
          <button onClick={goHome}>home</button> |{" "}
          <button onClick={goRegister}>register</button>
        </section>
      </section>
    </div>
  );
};

export default Login;
