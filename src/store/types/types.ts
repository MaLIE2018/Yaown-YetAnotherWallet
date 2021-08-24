import {
  GenericAlert,
  History,
  Settings,
  Transaction,
} from "../../types/types";

export enum Constants {
  SET_PAGE = "SET_PAGE",
  TOGGLE_TRACKER = "TOGGLE_TRACKER",
  TOGGLE_NOTE_MODAL = "TOGGLE_NOTE_MODAL",
  SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN",
  TOGGLE_CATEGORY_MODAL = "TOGGLE_CATEGORY_MODAL",
  SET_TA = "SET_TA",
  RESET_TA = "RESET_TA",
  SET_CALC_STR = "SET_CALC_STR",
  SET_RESULT = "SET_RESULT",
  RESET = "RESET",
  SHOW_TRANSACTION_ALERT = "SHOW_TRANSACTION_ALERT",
}

export interface IRootState {
  page: History;
  showTracker: boolean;
  showNoteModal: boolean;
  settings: Settings;
  showCategoryModal: boolean;
  showTransactionAlert: GenericAlert;
  transaction: Transaction;
  calc: Calc;
}

export interface Calc {
  result: string;
  calcStr: string;
}
