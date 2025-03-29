import { useRecoilValue } from "recoil";
import { authState } from "../state/authState";

export const useIsAuthenticated = (): boolean => {
  const token = useRecoilValue(authState);

  return token !== null;
};
