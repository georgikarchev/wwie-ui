import { atom } from "recoil";

export const authState = atom<string | null>({
  key: "authState",
  default: localStorage.getItem("jwt"),
});
