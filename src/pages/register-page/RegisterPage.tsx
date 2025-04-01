import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useAuth } from "../../services/authService";
import { pageState } from "../../state/pageState";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();

  const setPage = useSetRecoilState(pageState);
  const go = (to: string) => setPage({ name: to });
  const goHome = () => go("home");
  const goLogin = () => go("login");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, email, password });
    register(username, email, password);
  };

  return (
    <div className="page page--login">
      <section className="page__block">
        <section className="login-form">
          <form onSubmit={handleSubmit} className="login-form__form">
            <div className="form-row">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
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
            <button type="submit">register</button>
          </form>
        </section>
        <br />
        <br />
        <section className="login-and-register-buttons">
          <button onClick={goHome}>home</button> |{" "}
          <button onClick={goLogin}>login</button>
        </section>
      </section>
    </div>
  );
};

export default Register;
