import {
  GenericAlert,
  History,
  Settings,
  Transaction,
} from "../../types/types";

export type StoreEvents =
  | { type: "SET_PAGE"; payload: string }
  | { type: "TOGGLE_TRACKER" }
  | { type: "TOGGLE_NOTE_MODAL" }
  | { type: "SET_ACCESS_TOKEN"; payload: string }
  | { type: "SET_REFRESH_TOKEN"; payload: string }
  | { type: "TOGGLE_CATEGORY_MODAL" }
  | { type: "TOGGLE_TRANSACTION_ALERT"; payload: GenericAlert }
  | { type: "TOGGLE_BANK_ALERT"; payload: GenericAlert }
  | { type: "SET_TA"; payload: any }
  | { type: "RESET_TA" }
  | { type: "SET_CALC_STR"; payload: string }
  | { type: "SET_RESULT"; payload: string }
  | { type: "RESET" }
  | { type: "SHOW_TRANSACTION_ALERT" }
  | { type: "TOGGLE_ADD_MODAL" }
  | { type: "TOGGLE_ADD_BANK_PAGE" };

export interface IRootState {
  page: History;
  showTracker: boolean;
  showNoteModal: boolean;
  settings: Settings;
  showCategoryModal: boolean;
  showTransactionAlert: GenericAlert;
  transaction: Transaction;
  calc: Calc;
  showAddBankPage: boolean;
  showAddModal: boolean;
  showBankAlert: GenericAlert;
}

export interface Calc {
  result: string;
  calcStr: string;
}
