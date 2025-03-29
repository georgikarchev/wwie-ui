import { atom } from "recoil";

export const pageState = atom<string | null>({
  key: "pageState",
  default: "home",
});
