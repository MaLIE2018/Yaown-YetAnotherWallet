import { StoreEvents } from "store/types/types";
import { GenericMenu } from "types/types";

const Init = {
  open: false,
  selected: "Monthly",
  range: [],
};

export function timeMenuReducer(
  state: GenericMenu = Init,
  action: StoreEvents
): GenericMenu {
  switch (action.type) {
    case "TOGGLE_TIME_MENU":
      return { ...state, open: !state.open };
    case "SELECT_TIME":
      return { ...state, selected: action.payload };
    case "SET_RANGE":
      return { ...state, range: action.payload };
    default:
      return state;
  }
}

export default timeMenuReducer;
