import { StoreEvents } from "store/types/types";
import { GenericMenu } from "types/types";

const Init = {
  open: false,
  selected: "All",
};

export function accountMenuReducer(
  state: GenericMenu = Init,
  action: StoreEvents
): GenericMenu {
  switch (action.type) {
    case "TOGGLE_ACCOUNT_MENU":
      return { ...state, open: !state.open };
    case "SELECT_ACCOUNT":
      return { ...state, selected: action.payload };
    default:
      return state;
  }
}

export default accountMenuReducer;
