import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useApi } from "../../hooks/useApi";
import { useAuth } from "../../services/authService";
import { pageState } from "../../state/pageState";
import { UserType } from "../../types/UserType";

interface Props {}

const ProfilePage: React.FC<Props> = ({}) => {
  const api = useApi();
  const { logout, updateProfile } = useAuth();
  const setPage = useSetRecoilState(pageState);
  const go = (to: string) => setPage({ name: to });
  const goHome = () => go("home");
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    goHome();
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log(`Update Profile handleSubmit`);
    e.preventDefault();
    updateProfile(user?.username, user?.email, user?.profilePictureLink);
  };

  const setUserProp = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.name) {
      return;
    }

    setUser((state) => ({
      ...state,
      [`${e.target.name}`]: e.target.value,
    }));
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
              <label>Username</label>
              <input
                name="username"
                type="text"
                value={user?.username || ""}
                onChange={setUserProp}
                required
              />
            </div>
            <div className="form-row">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={user?.email || ""}
                onChange={setUserProp}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-row">
                <label>Profile picture</label>
                <input
                  name="profilePictureLink"
                  type="text"
                  value={user?.profilePictureLink || ""}
                  onChange={setUserProp}
                  required
                />
              </div>
            </div>
            <button className="form-submit" type="submit">
              Save
            </button>
          </form>
        </section>
        <br />
        {user?.createdOn && <div>Created on: {user?.createdOn}</div>}
        <br />
        {user?.createdOn && <div>Updated on: {user?.updatedOn}</div>}
        <br />
        <button className="form-submit" onClick={handleLogout}>
          logout
        </button>
      </section>
    </div>
  );
};

export default ProfilePage;
