import { Booked } from "types/bankAccount";
import {
  GenericAlert,
  GenericMenu,
  History,
  Settings,
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
  | { type: "SET_ACCOUNTS"; payload: any }
  | { type: "SET_TXN_BY_CAT"; payload: any }
  | { type: "SET_TXN_BY_DATE"; payload: any }
  | { type: "RESET_TA" }
  | { type: "SET_CALC_STR"; payload: string }
  | { type: "SET_RESULT"; payload: string }
  | { type: "SELECT_ACCOUNT"; payload: string }
  | { type: "SELECT_TIME"; payload: string }
  | { type: "SET_STATEMENT"; payload: [] }
  | { type: "RESET_CALC" }
  | { type: "TOGGLE_LOGIN_ALERT"; payload: GenericAlert }
  | { type: "TOGGLE_ADD_ASSET_MODAL" }
  | { type: "EXPENSE" }
  | { type: "INCOME" }
  | { type: "TOGGLE_ADD_BANK_PAGE" }
  | { type: "TOGGLE_ACCOUNT_MENU" }
  | { type: "TOGGLE_TIME_MENU" }
  | { type: "SET_RANGE"; payload: Date[] }
  | { type: "RESET_SETTINGS" }
  | { type: "SET_USER"; payload: {} };

export interface IRootState {
  page: History;
  showTracker: boolean;
  noteModal: boolean;
  settings: Settings;
  categoryModal: boolean;
  transactionAlert: GenericAlert;
  transaction: Booked;
  calc: Calc;
  user: {};
  bankPage: boolean;
  addAssetModal: boolean;
  bankAlert: GenericAlert;
  loginAlert: GenericAlert;
  expense: boolean;
  accountMenu: GenericMenu;
  timeMenu: GenericMenu;
}

export interface Calc {
  result: string;
  calcStr: string;
}
