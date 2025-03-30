import { atom } from "recoil";

export type QueryParamsType = {
  id: string;
};

export type PageStateType = {
  name: string;
  queryParams?: QueryParamsType;
};

export const pageState = atom<PageStateType | null>({
  key: "pageState",
  default: { name: "home" } as PageStateType,
});
