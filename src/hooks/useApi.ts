import axios from "axios";
import { useRecoilValue } from "recoil";
import { authState } from "../state/authState";

export const useApi = () => {
  const token = useRecoilValue(authState);

  return axios.create({
    baseURL: "http://localhost:8085/api/v1/",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};
