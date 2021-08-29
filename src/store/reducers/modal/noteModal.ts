import { StoreEvents } from "store/types/types";

export function noteModalReducer(
  state: boolean = false,
  action: StoreEvents
): boolean {
  switch (action.type) {
    case "TOGGLE_NOTE_MODAL":
      return !state;
    default:
      return state;
  }
}

export default noteModalReducer;
