import { Calc, StoreEvents } from "../types/types";

const Init = {
  result: "0",
  calcStr: "",
};

function calculationReducer(state: Calc = Init, action: StoreEvents): Calc {
  switch (action.type) {
    case "SET_RESULT":
      return { ...state, result: action.payload };
    case "SET_CALC_STR":
      return { ...state, calcStr: action.payload };
    case "RESET_CALC":
      return { result: "0", calcStr: "" };
    default:
      return state;
  }
}

export default calculationReducer;
