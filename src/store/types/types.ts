import { History } from "../../types/types";

export enum Constants {
  SET_PAGE = "SET_PAGE",
}

export interface IRootState {
  page: History;
}
