import { StoreEvents } from "store/types/types";
import { Settings } from "../../types/types";

const Init = {
  accessToken: "",
  refreshToken: "",
  user: {},
  accounts: [],
  txnByCategory: [],
  txnByDate: [],
  statement: [{ incomes: 0, expenses: 0, _id: "id" }],
};

function settingsReducer(
  state: Settings = Init,
  action: StoreEvents
): Settings {
  switch (action.type) {
    case "SET_ACCESS_TOKEN":
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
    case "RESET_SETTINGS":
      return Init;
    default:
      return state;
  }
}

export default settingsReducer;
