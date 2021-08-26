import { StoreEvents } from "store/types/types";

export function expenseReducer(
  state: boolean = true,
  action: StoreEvents
): boolean {
  switch (action.type) {
    case "EXPENSE":
      return true;
    case "INCOME":
      return false;
    default:
      return state;
  }
}

export default expenseReducer;
