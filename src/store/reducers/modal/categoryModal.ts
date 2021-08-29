import { StoreEvents } from "store/types/types";

export function categoryModalReducer(
  state: boolean = false,
  action: StoreEvents
): boolean {
  switch (action.type) {
    case "TOGGLE_CATEGORY_MODAL":
      return !state;
    default:
      return state;
  }
}

export default categoryModalReducer;
