import { History, Settings, Transaction } from "../../types/types";

export enum Constants {
  SET_PAGE = "SET_PAGE",
  TOGGLE_TRACKER = "TOGGLE_TRACKER",
  TOGGLE_NOTE_MODAL = "TOGGLE_NOTE_MODAL",
  SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN",
  TOGGLE_CATEGORY_MODAL = "TOGGLE_CATEGORY_MODAL",
  SET_TA = "SET_TA",
  RESET_TA = "RESET_TA",
}

export interface IRootState {
  page: History;
  showTracker: boolean;
  showNoteModal: boolean;
  settings: Settings;
  showCategoryModal: boolean;
  transaction: Transaction;
}
