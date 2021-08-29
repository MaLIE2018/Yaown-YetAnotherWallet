import { StoreEvents } from "store/types/types";
import { Booked } from "types/bankAccount";

const Init = {
  category: "",
  bookingDate: new Date().toISOString(),
  valueDate: new Date().toISOString(),
  transactionAmount: { currency: "EUR", amount: 0 },
  transactionId: "",
  debtorName: "",
  debtorAccount: { iban: "" },
  bankTransactionCode: "",
  remittanceInformationUnstructured: "",
};

function transactionReducer(state: Booked = Init, action: StoreEvents): Booked {
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
