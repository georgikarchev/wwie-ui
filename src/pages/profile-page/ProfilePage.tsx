import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { UserType } from "../../types/UserType";

interface Props {}

const ProfilePage: React.FC<Props> = ({}) => {
  const api = useApi();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(user);
    // login(email, password);
  };

  const setEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const setPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`users/me`);
        setUser(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="page page--user">
      <h1 className="page__title">{user?.username}</h1>
      <section className="page__block">
        <section className="login-form">
          <form onSubmit={handleSubmit} className="login-form__form">
            <div className="form-row">
              <label>Email</label>
              <input
                type="email"
                value={user?.email}
                onChange={setEmail}
                required
              />
            </div>
            <div className="form-row">
              <label>Password</label>
              <input
                type="password"
                value={user?.password}
                onChange={setPassword}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </section>
      </section>
    </div>
  );
};

export default ProfilePage;
