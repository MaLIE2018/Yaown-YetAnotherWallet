import { Transaction } from "../../types/types";

const Init = {
  amount: "0",
  category: "",
  date: new Date(),
  time: "",
  account: "",
  note: "",
};

function transactionReducer(
  state: Transaction = Init,
  action: any
): Transaction {
  switch (action.type) {
    case "SET_TA":
      return {
        ...state,
        [Object.keys(action.payload)[0]]:
          action.payload[Object.keys(action.payload)[0]],
      };
    case "RESET_TA":
      return { ...state, ...Init };
    default:
      return state;
  }
}
export default transactionReducer;

// {
//   amount: 200
// }
