import { StoreEvents } from "store/types/types";
import { Settings } from "../../types/types";

import produce from "immer";

const updateObject = (
  draft: any,
  payload: { id: string; newStatus: number }
) => {
  const { id, newStatus } = payload;
  draft.estimates[id] = newStatus;
};
const Init = {
  accessToken: "",
  refreshToken: "",
  user: {},
  currency: "EUR",
  lang: "de-DE",
  accounts: [],
  txnByCategory: [],
  txnByDate: [],
  statement: [{ incomes: 0, expenses: 0, _id: "id" }],
  estimates: {
    pension: 1200,
    age: 67,
    increaseSavingRate: 3,
    savingRate: 2400,
    investRate: 100,
    averageAnnualROI: 8,
    lifetime: 20,
    desiredPension: 2500,
    otherIncome: 500,
    cAge: 30,
  },

  assets: [],
};

const settingsReducer = produce(
  (state: Settings = Init, action: StoreEvents) => {
    switch (action.type) {
      case "SET_ACCESS_TOKEN":
        return { ...state, accessToken: action.payload };
      case "SET_ESTIMATES":
        return updateObject(state, action.payload);
      case "SET_REFRESH_TOKEN":
        return { ...state, refreshToken: action.payload };
      case "SET_USER":
        return { ...state, user: action.payload };
      case "SET_ACCOUNTS":
        return { ...state, accounts: [...action.payload] };
      case "SET_TXN_BY_CAT":
        return { ...state, txnByCategory: [...action.payload] };
      case "SET_TXN_BY_DATE":
        return { ...state, txnByDate: [...action.payload] };
      case "SET_STATEMENT":
        return { ...state, statement: [...action.payload] };
      case "SET_ASSETS":
        return { ...state, assets: [...action.payload] };
      case "RESET_SETTINGS":
        return Init;
      default:
        return state;
    }
  }
);

export default settingsReducer;
