import { StoreEvents } from "store/types/types";

export function addBankReducer(
  state: boolean = false,
  action: StoreEvents
): boolean {
  switch (action.type) {
    case "TOGGLE_ADD_BANK_PAGE":
      return !state;
    default:
      return state;
  }
}

export default addBankReducer;
