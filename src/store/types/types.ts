import { History } from "../../types/types";

export enum Constants {
  SET_PAGE = "SET_PAGE",
  TOGGLE_TRACKER = "TOGGLE_TRACKER",
  SHOW_MODAL = "SHOW_MODAL",
}

export interface IRootState {
  page: History;
  showTracker: boolean;
  showModal: boolean;
}
