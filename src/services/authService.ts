import { useSetRecoilState } from "recoil";
import { useApi } from "../hooks/useApi";
import { authState } from "../state/authState";

export const useAuth = () => {
  const setAuth = useSetRecoilState(authState);

  const api = useApi();

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });

    const token = res.data;

    localStorage.setItem("jwt", token);
    setAuth(token);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setAuth(null);
  };

  return { login, logout };
};
