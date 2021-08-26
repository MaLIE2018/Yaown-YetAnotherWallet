import { StoreEvents } from "store/types/types";

export function trackerReducer(
  state: boolean = false,
  action: StoreEvents
): boolean {
  switch (action.type) {
    case "TOGGLE_TRACKER":
      return !state;
    default:
      return state;
  }
}

export default trackerReducer;
