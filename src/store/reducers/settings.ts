import { StoreEvents } from "store/types/types";
import { Settings, Estimates } from "../../types/types";

import produce from "immer";

const updateObject = (draft: any, payload: { id: string; value: string }) => {
  const { id, value } = payload;
  draft[id] = value;
};
const Init = {
  accessToken: "",
  refreshToken: "",
  user: {},
  accounts: [],
  txnByCategory: [],
  txnByDate: [],
  statement: [{ incomes: 0, expenses: 0, _id: "id" }],
  estimates: {
    pension: "1200",
    age: "67",
    increaseSavingRate: "3",
    savingRate: "2400",
    averageAnnualROI: "8",
    lifetime: "20",
    desiredPension: "2500",
    otherIncome: "500",
    cAge: "30",
  },

  assets: [],
};

const settingsReducer = (
  state: Settings = Init,
  action: StoreEvents
): Settings =>
  produce((state, draft) => {
    switch (action.type) {
      case "SET_ACCESS_TOKEN":
        return { ...state, accessToken: action.payload };
      case "SET_ESTIMATES":
        return { ...state, accessToken: action.payload };
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
  });

export default settingsReducer;
