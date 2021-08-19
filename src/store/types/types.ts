import { History } from "../../types/types";

export enum Constants {
  SET_PAGE = "SET_PAGE",
  TOGGLE_TRACKER = "TOGGLE_TRACKER",
}

export interface IRootState {
  page: History;
  showTracker: boolean;
}
