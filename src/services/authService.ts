import { authState } from "../state/authState";
import { useSetRecoilState } from "recoil";

export const useAuth = () => {
  const setAuth = useSetRecoilState(authState);

  const login = async (email: string, password: string) => {
    const res = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");

    const { token } = await res.json();
    localStorage.setItem("jwt", token);
    setAuth(token);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setAuth(null);
  };

  return { login, logout };
};
