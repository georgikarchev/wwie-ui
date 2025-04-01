import { atom } from "recoil";

export type QueryParamsType = {
  id: string;
};

export type BackStateType = {
  name: string;
  queryParams?: QueryParamsType;
};

export const backState = atom<BackStateType | null>({
  key: "backState",
  default: { name: "home" } as BackStateType,
});
