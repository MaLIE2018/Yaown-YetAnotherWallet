import { StoreEvents } from "store/types/types";

export function addModalReducer(
  state: boolean = false,
  action: StoreEvents
): boolean {
  switch (action.type) {
    case "TOGGLE_ADD_MODAL":
      return !state;
    default:
      return state;
  }
}

export default addModalReducer;
